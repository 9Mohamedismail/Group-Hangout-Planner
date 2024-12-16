import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

function UserPage() {
  const { sessionId } = useParams(); // Get the sessionId from the URL
  const [sessionData, setSessionData] = useState(null); // State to store session data
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    const getSessionData = async () => {
      try {
        // Reference the document by its ID
        const docRef = doc(db, "sessions", "Zwns8qfJzKTsh7ejZvjo"); // Replace with your actual document ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Access the specific field (sessionId) dynamically
          const data = docSnap.data()[sessionId];

          if (data) {
            setSessionData(data); // Save data in state
          } else {
            setError("No such sessionId in the document!");
          }
        } else {
          setError("No such document!");
        }
      } catch (err) {
        console.error("Error fetching session data:", err);
        setError("Failed to fetch session data");
      }
    };

    getSessionData();
  }, [sessionId]); // Add sessionId as a dependency

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <>
      <h1>Session ID: {sessionId}</h1>
      {sessionData ? (
        <h2>Title: {sessionData.title}</h2>
      ) : (
        <p>Loading session data...</p>
      )}
    </>
  );
}

export default UserPage;
