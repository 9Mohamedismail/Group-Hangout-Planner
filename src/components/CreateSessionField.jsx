import { useState } from "react";
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete from "./PlacesAutoComplete";
import ImagePickerField from "./ImagePickerField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faGamepad,
  faTree,
  faLaptopCode,
  faFilm,
  faBasketballBall,
  faUtensils,
  faPalette,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

function CreateSessionField() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    suggested_place: "",
    session_icon: "",
  });

  const [error, setError] = useState(null); // State for errors
  const [useGoogleAPI, setUseGoogleAPI] = useState(null);
  const [isImagePickerOpen, setImagePickerOpen] = useState(false);

  const handleChange = (e, maxLength) => {
    const { name, value } = e.target;
    if (value.length <= maxLength) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const iconMap = {
    "Casual Hangout": faUsers,
    "Gaming Night": faGamepad,
    "Outdoor Activity": faTree,
    "Study/Work Group": faLaptopCode,
    "Movie Night": faFilm,
    "Sports Meetup": faBasketballBall,
    "Food Gathering": faUtensils,
    "Arts & Creativity": faPalette,
    "Karaoke / Music Night": faMicrophone,
  };

  const handleImageSelect = (iconLabel) => {
    setFormData({ ...formData, session_icon: iconLabel });
    setImagePickerOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission
    setError(null);

    try {
      const sessionId = Date.now().toString(); // Generate a unique ID for the session
      const sessionRef = doc(db, "sessions", sessionId); // Reference for the new document

      let suggestedPlace = formData.suggested_place;

      // Extract only `location` and convert to plain object
      let location = suggestedPlace?.geometry?.location;
      let locationData = null;

      if (location) {
        locationData = {
          lat:
            typeof location.lat === "function" ? location.lat() : location.lat,
          lng:
            typeof location.lng === "function" ? location.lng() : location.lng,
        };
      }

      const sessionData = {
        [sessionId]: {
          ...formData,
          suggested_place: {
            name: suggestedPlace?.name || "",
            formatted_address: suggestedPlace?.formatted_address || "",
            location: locationData,
          },
          createdAt: new Date(),
          totalMembers: 0,
        },
      };

      // Create the new document in Firestore
      await setDoc(sessionRef, sessionData);

      alert("Session created successfully!");
      setFormData({ title: "", description: "", suggested_place: "" }); // Reset form data
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
      <div className="flex items-center mb-5">
        <label
          htmlFor="inline-radio"
          className="font-medium text-sm text-gray-500 dark:text-gray-400 mr-4"
        >
          Suggest a Physical Location?
        </label>

        {/* Yes Option */}
        <div className="flex items-center me-4">
          <input
            id="inline-radio"
            type="radio"
            name="inline-radio-group"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 peer"
            checked={useGoogleAPI === true}
            onChange={() => setUseGoogleAPI(true)}
          />
          <label
            htmlFor="inline-radio"
            className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400 peer-checked:text-blue-600 peer-focus:text-blue-600 cursor-pointer"
          >
            Yes
          </label>
        </div>

        {/* No Option */}
        <div className="flex items-center">
          <input
            id="inline-2-radio"
            type="radio"
            name="inline-radio-group"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 peer"
            checked={useGoogleAPI === false}
            onChange={() => setUseGoogleAPI(false)}
          />
          <label
            htmlFor="inline-2-radio"
            className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400 peer-checked:text-blue-600 peer-focus:text-blue-600 cursor-pointer"
          >
            No
          </label>
        </div>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        {/* Text Input for Non-Google API Selection */}
        <div style={{ display: useGoogleAPI ? "none" : "block" }}>
          <input
            type="text"
            name="suggested_place"
            id="suggested_place"
            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            value={formData.suggested_place}
            required
            onChange={(e) => handleChange(e, 200)}
          />
          <label
            htmlFor="suggested_place"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter a place (e.g., 'Discord' or 'Mike’s House')
          </label>
        </div>

        {/* Google Places Autocomplete Component */}
        <div style={{ display: useGoogleAPI ? "block" : "none" }}>
          <PlacesAutocomplete
            onSelect={(place) =>
              setFormData({
                ...formData,
                suggested_place: place,
              })
            }
          />
        </div>
      </div>

      {/* Image Picker Button */}
      <div className="relative z-0 w-full mb-5 group">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setImagePickerOpen(true)}
        >
          Choose Session Image
        </button>

        {/* Display Selected Icon */}
        {formData.session_icon && (
          <div className="mt-4 flex justify-center">
            <FontAwesomeIcon
              icon={iconMap[formData.session_icon]}
              className="text-5xl text-blue-700"
            />
          </div>
        )}
      </div>

      {/* Render Image Picker Modal */}
      {isImagePickerOpen && (
        <ImagePickerField
          onClose={() => setImagePickerOpen(false)}
          onSelect={handleImageSelect}
        />
      )}
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
