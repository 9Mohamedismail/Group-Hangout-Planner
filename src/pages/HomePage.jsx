import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center">
        PLAN TOGETHER <br></br>STAY ORGANIZED
      </h1>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
        onClick={() => navigate("/create")}
      >
        CREATE EVENT
      </button>
    </div>
  );
}

export default HomePage;
