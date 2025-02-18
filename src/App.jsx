import { db } from "./config/firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GroupHangoutJoinPage from "./pages/GroupHangoutJoinPage";
import GroupHangoutSessionPage from "./pages/GroupHangoutSessionPage";

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
      </Routes>
    </div>
  );
}

export default App;
