import { useState } from "react";
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete from "./PlacesAutoComplete";

function CreateSessionField() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    suggested_place: "",
  });

  const [error, setError] = useState(null); // State for errors

  const handleChange = (e, maxLength) => {
    const { name, value } = e.target;
    if (value.length <= maxLength) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  /*const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission
    setError(null);

    try {
      const sessionId = Date.now().toString(); // Generate a unique ID for the session
      const sessionRef = doc(db, "sessions", sessionId); // Reference for the new document

      const sessionData = {
        [sessionId]: {
          ...formData,
          //fileName: file ? file.name : null, // Optionally include the file name
          createdAt: new Date(),
        },
      };

      // Create the new document in Firestore
      await setDoc(sessionRef, sessionData);

      alert("Session created successfully!");
      setFormData({ title: "", description: "" }); // Reset form data
      //setFile(null); // Reset file
      navigate(`/join/${sessionId}`);
    } catch (err) {
      console.error("Error creating session:", err);
      setError("Failed to create session. Please try again.");
    }
  };

  return (
    <form
      className="max-w-md mx-auto py-24 sm:px-6 sm:py-32 lg:px-8"
      onSubmit={handleSubmit}
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="title"
          id="title"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={formData.title}
          required
          onChange={(e) => handleChange(e, 50)}
        />
        <label
          htmlFor="title"
          className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Session Title
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <textarea
          type="text"
          name="description"
          id="description"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 resize-none bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={formData.description}
          required
          onChange={(e) => handleChange(e, 200)}
          rows={4}
        />
        <label
          htmlFor="description"
          className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Session Description
        </label>
      </div>

      <PlacesAutocomplete
        onSelect={(place) =>
          setFormData({
            ...formData,
            suggested_place: place,
          })
        }
      />

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="file"
          name="title"
          id="title"
          accept=".jpg,.png"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="title"
          className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Session Image
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
}

export default CreateSessionField;
