import logo from "../../assets/logo.svg";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user } = useUser();
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
          <img
            src={logo}
            alt="T-Mobile Logo"
            className="tmobile-logo-img"
            width={48}
          />
        </div>
      </div>

      {/* T-CareTrack Badge */}
      <div className="app-badge-section">
        <div className="app-badge">T-CareTrack</div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <ul className="nav-links">
          <li className="nav-item">
            <button className="nav-button">Profile</button>
          </li>
          <li className="nav-item">
            <button className="nav-button">Settings</button>
          </li>
        </ul>
      </nav>

      {/* User Info Section - Bottom */}
      <div className="user-info-section">
        <div className="user-info">
          <h3 className="user-name">{user?.name ?? "Mary Walker"}</h3>
          <p className="user-email">{user?.email ?? "MaryWalker@gmail.com"}</p>
        </div>

        {/* Bottom Actions */}
        <div className="bottom-actions">
          <button className="settings-icon-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>

          <button className="menu-icon-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="3"
                y1="12"
                x2="21"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="3"
                y1="18"
                x2="21"
                y2="18"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              navigate("/home");
              localStorage.removeItem("user");
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}
