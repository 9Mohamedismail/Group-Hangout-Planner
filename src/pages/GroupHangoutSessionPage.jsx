import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GetSessionData from "../components/GetSessionData";
import SessionField from "../components/SessionField";

function GroupHangoutSessionPage() {
  const { sessionId } = useParams(); // Get the sessionId from the URL
  const { sessionData, error, hasSession } = GetSessionData({ sessionId });
  const navigate = useNavigate();

  useEffect(() => {
    const savedSessions =
      JSON.parse(localStorage.getItem("joinedSessions")) || [];

    if (!savedSessions.includes(sessionId)) {
      navigate(`/join/${sessionId}`);
    }
  }, [sessionId, navigate]);

  if (error) {
    return <div>Error loading session data</div>;
  }

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return <SessionField sessionData={sessionData} />;
}

export default GroupHangoutSessionPage;
