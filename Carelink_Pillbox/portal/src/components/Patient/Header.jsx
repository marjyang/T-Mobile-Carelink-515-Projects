export default function Header({ pillMissedToday, onNotificationClick }) {
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="m21 21-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="header-actions">
          <button className="add-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="12"
                y1="8"
                x2="12"
                y2="16"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="8"
                y1="12"
                x2="16"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>

          <div className="notification-wrapper">
            <button
              className="notification-btn"
              onClick={onNotificationClick}
              aria-label="Show notifications"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M13.73 21a2 2 0 0 1-3.46 0"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {pillMissedToday && <span className="notification-badge">1</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
