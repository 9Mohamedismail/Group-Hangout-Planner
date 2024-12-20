import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GetSessionData from "../components/GetSessionData";
import JoinField from "../components/JoinField";
import ErrorField from "../components/ErrorField";

function GroupHangout() {
  const { sessionId } = useParams(); // Get the sessionId from the URL
  const { sessionData, error, hasSession } = GetSessionData({ sessionId });

  const [hasJoined, setHasJoined] = useState(false);
  const [pastSessions, setPastSessions] = useState([]);

  useEffect(() => {
    const savedSessions =
      JSON.parse(localStorage.getItem("joinedSessions")) || [];
    setPastSessions(savedSessions);
    console.log(savedSessions);

    if (savedSessions.includes(sessionId)) {
      setHasJoined(true);
    }
    // if not, return the error from SessionData.
  }, [sessionId]);

  const handleJoin = () => {
    const sessions = [...pastSessions, sessionId];
    localStorage.setItem("joinedSessions", JSON.stringify(sessions));
    setHasJoined(true);
    setPastSessions(sessions);
  };

  return (
    <div>
      {!hasSession && error && <ErrorField error={error} />}

      {!hasJoined && hasSession && (
        <JoinField sessionData={sessionData} handleJoin={handleJoin} />
      )}

      {hasJoined && <p>Welcome back! You're already in this session.</p>}
    </div>
  );
}

export default GroupHangout;
