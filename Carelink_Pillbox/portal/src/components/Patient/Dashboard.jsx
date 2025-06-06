import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MedicationSchedule from "./MedicationSchedule";
import BloodPressure from "./BloodPressure";
import SuggestionsPanel from "./SuggestionPanel";
import PrescriptionDetails from "./PrescriptionDetails";
import { useWeeklyIntakeStatus } from "./hooks";

export default function Dashboard() {
  const { intakeByWeekday, todayWeekday } = useWeeklyIntakeStatus();
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const pillMissedToday =
    intakeByWeekday && todayWeekday && !intakeByWeekday[todayWeekday];

  useEffect(() => {
    if (pillMissedToday) {
      setShowModal(true);
    }
  }, [pillMissedToday]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header
          pillMissedToday={pillMissedToday}
          onNotificationClick={() => setShowDrawer(true)}
        />
        <div className="dashboard-content">
          <MedicationSchedule />
          <div className="bottom-section">
            <BloodPressure />
            <div className="right-panel">
              <SuggestionsPanel />
              <PrescriptionDetails />
            </div>
          </div>
        </div>
      </div>

      {/* Modal alert */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">💊 Pill Reminder</h2>
            <p className="modal-message">
              You haven't taken your medication today. Please stay on track.
            </p>
            <button
              className="modal-button"
              onClick={() => setShowModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Notification drawer */}
      {showDrawer && (
        <div className="notification-drawer">
          <div className="drawer-header">
            <h3>Notifications</h3>
            <button onClick={() => setShowDrawer(false)}>✕</button>
          </div>
          <div className="drawer-content">
            {pillMissedToday ? (
              <div className="notification-item">
                <span role="img" aria-label="pill">
                  💊
                </span>{" "}
                You haven’t taken your medication today.
              </div>
            ) : (
              <div className="notification-item empty">
                No new notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
