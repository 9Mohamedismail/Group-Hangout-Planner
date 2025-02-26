import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GroupHangoutJoinPage from "./pages/GroupHangoutJoinPage";
import GroupHangoutSessionPage from "./pages/GroupHangoutSessionPage";
import CreateSessionField from "./components/CreateSessionField";
import NavBar from "../src/components/navbar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="join/:sessionId" element={<GroupHangoutJoinPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="session/:sessionId"
          element={<GroupHangoutSessionPage />}
        />
        <Route path="/create" element={<CreateSessionField />} />
      </Routes>
    </div>
  );
}

export default App;
