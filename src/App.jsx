import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GroupHangoutJoinPage from "./pages/GroupHangoutJoinPage";
import GroupHangoutSessionPage from "./pages/GroupHangoutSessionPage";
import CreateSessionField from "./components/CreateSessionField";

function App() {
  return (
    <div>
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
