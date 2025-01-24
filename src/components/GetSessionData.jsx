import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

function GetSessionData({ sessionId }) {
  const [sessionData, setSessionData] = useState(null); // State to store session data
  const [error, setError] = useState(null); // State to store errors
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    const fetchSessionData = async () => {
      try {
        const docRef = doc(db, "sessions", sessionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data()[sessionId];

          if (data) {
            setSessionData(data);
            setHasSession(true);
          } else {
            setError("No such sessionId in the document.");
            setHasSession(false);
          }
        } else {
          setError("No such document!");
        }
      } catch (err) {
        console.error("Error fetching session data:", err);
        setError("Failed to fetch session data");
      }
    };

    fetchSessionData();
  }, [sessionId]);

  return { sessionId, sessionData, error, hasSession };
}

export default GetSessionData;
