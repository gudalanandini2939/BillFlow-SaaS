import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <nav className="navbar">
      <Link to={token ? "/dashboard" : "/login"} className="logo">
        💳 <span>BillFlow</span>
      </Link>

      <div className="nav-buttons">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/pricing">Pricing</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;