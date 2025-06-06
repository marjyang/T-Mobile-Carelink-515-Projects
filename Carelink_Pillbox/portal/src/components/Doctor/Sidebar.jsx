import logo from "../../assets/logo.svg";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      {/* T-Mobile Logo */}
      <div
        className="logo-section"
        onClick={() => {
          navigate("/home");
          localStorage.removeItem("user");
        }}
      >
        <div className="tmobile-logo">
          <div className="tmobile-logo">
            <img
              src={logo}
              alt="T-Mobile Logo"
              className="tmobile-logo-img"
              width={48}
            />
          </div>
        </div>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        <h3 className="doctor-name">{user?.name ?? "Dr. Phillips"}</h3>
        <p className="doctor-email">{user?.email ?? "Phillips@hospital.com"}</p>
      </div>

      {/* Divider Line */}
      <hr className="divider" />

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <ul className="nav-links">
          <li className="nav-item">
            <button className="nav-button active">Patient List</button>
          </li>
          <li className="nav-item">
            <button className="nav-button">Analytics</button>
          </li>
          <li className="nav-item">
            <button className="nav-button">Reports</button>
          </li>
          <li className="nav-item">
            <button className="nav-button">Messages</button>
          </li>
          <li className="nav-item">
            <button className="nav-button">Medicine Management</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
