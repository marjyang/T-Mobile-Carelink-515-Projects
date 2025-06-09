import { useMedicationCalendarData } from "./hooks";

export default function MedicationCalendar({ patientId }) {
  const { calendarData, loading } = useMedicationCalendarData(patientId);
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  if (loading) {
    return <div className="calendar-loading">Loading...</div>;
  }
  const today = new Date();

  return (
    <div className="medication-calendar">
      <div className="calendar-header-section">
        <h3>Medication Intake</h3>
        <div className="medication-adherence"></div>
      </div>

      <div className="calendar-container">
        <div className="calendar-month">
          <h4>
            {today.toLocaleString("default", { month: "long" })}{" "}
            {today.getFullYear()}
          </h4>
        </div>

        <div className="calendar-header">
          {days.map((day, index) => (
            <div key={index} className="day-header">
              {day}
            </div>
          ))}
        </div>

        <div className="doctor-calendar-grid">
          {calendarData.map((item, index) => (
            <div key={index} className={`calendar-cell ${item.status}`}>
              <span className="date-number">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="missing-intake">
        <span className="days-count">
          {
            calendarData.filter((d) => {
              const entryDate = new Date(d.date);
              const isBeforeToday =
                entryDate < new Date(new Date().setHours(0, 0, 0, 0));
              return d.status === "missing" && isBeforeToday;
            }).length
          }{" "}
          DAYS
        </span>
        <span className="missing-text">Missing Medication Intake</span>
        <button className="send-reminder">Send Reminder</button>
      </div>
    </div>
  );
}
