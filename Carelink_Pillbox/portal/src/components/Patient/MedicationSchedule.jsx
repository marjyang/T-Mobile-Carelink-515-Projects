import WeeklyCalendar from "./WeeklyCalendar";
import { useWeeklyIntakeStatus } from "./hooks";
import Spinner from "./Spinner";

export default function MedicationSchedule() {
  const { intakeByWeekday, todayWeekday, loading } = useWeeklyIntakeStatus();
  const medications = [
    {
      id: 1,
      name: "Blood Pressure",
      dosage: "Once a day (10mg)",
      taken: false,
    },
    {
      id: 2,
      name: "Daily Multi",
      dosage: "Once a day (2 tablets)",
      taken: false,
    },
    {
      id: 3,
      name: "Blood Pressure",
      dosage: "Once a day (10mg)",
      taken: false,
    },
    {
      id: 4,
      name: "Calcium",
      dosage: "Once a day (1 tablet)",
      taken: false,
    },
    {
      id: 5,
      name: "Fish Oil",
      dosage: "Once a day (1 tablet)",
      taken: false,
    },
  ];

  const takenCount = Object.values(intakeByWeekday).filter(Boolean).length;
  const totalCount = 7;
  const progressPercentage = (takenCount / totalCount) * 100;
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="medication-schedule">
        <Spinner size={60} />
      </div>
    );
  }

  return (
    <div className="medication-schedule">
      {/* Header */}
      <div className="schedule-header">
        <div className="header-left">
          <h2>Medication Schedule</h2>
          <div className="schedule-date">
            <div className="current-date">{formattedDate}</div>
            <div className="status-message">
              {intakeByWeekday[todayWeekday]
                ? "You have taken all pills today."
                : "You haven't taken all pills today."}
            </div>
          </div>
        </div>
        <button className="customize-btn">Customize</button>
      </div>

      {/* Main Content - Horizontal Layout */}
      <div className="horizontal-layout">
        {/* Left: Progress Circle */}
        <div className="progress-column">
          <h3 className="column-title">Medication Intake</h3>
          <div className="circular-progress">
            <svg width="180" height="180" viewBox="0 0 180 180">
              {/* Background circle */}
              <circle
                cx="90"
                cy="90"
                r="70"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="15"
              />
              {/* Progress circle */}
              <circle
                cx="90"
                cy="90"
                r="70"
                fill="none"
                stroke="#e20074"
                strokeWidth="15"
                strokeDasharray={`${progressPercentage * 4.4} 440`}
                strokeDashoffset="0"
                className="progress-circle"
                transform="rotate(-90 90 90)"
              />
            </svg>
            <div className="progress-center">
              <div className="single-pill">💊</div>
            </div>
          </div>
        </div>

        {/* Middle: Medication List */}
        <div className="medication-column">
          <h3 className="column-title">Medication List</h3>
          <div className="medication-items">
            {medications.map((med) => (
              <div key={med.id} className="medication-row">
                <div className="med-info">
                  <div className="med-name">{med.name}</div>
                  <div className="med-dosage">{med.dosage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Weekly Calendar */}
        <div className="calendar-column">
          <h3 className="column-title">Medication Intake Calendar</h3>
          <WeeklyCalendar
            intakeByWeekday={intakeByWeekday}
            todayWeekday={todayWeekday}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
