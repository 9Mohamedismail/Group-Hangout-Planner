import { Link } from "react-router-dom";
import "../index.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Raid Planner
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default NavBar;
