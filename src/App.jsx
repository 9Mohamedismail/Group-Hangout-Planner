import { db } from "./config/firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "./pages/GroupHangoutPage";
import HomePage from "./pages/HomePage";
import GroupHangout from "./pages/GroupHangoutPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="join/:sessionId" element={<GroupHangout />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
