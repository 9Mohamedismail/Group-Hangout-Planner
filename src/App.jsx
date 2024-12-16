import { db } from "./config/firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
function App() {
  return (
    <div>
      <h1> Hello World</h1>
      <Routes>
        <Route path=":sessionId" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
