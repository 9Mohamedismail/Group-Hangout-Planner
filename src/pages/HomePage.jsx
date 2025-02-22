import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/create")}>Open Create Session</button>
    </div>
  );
}

export default HomePage;
