const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function WeeklyCalendar({ intakeByWeekday, todayWeekday }) {
  return (
    <div className="weekly-calendar">
      <div className="calendar-grid">
        {weekDays.map((day, index) => {
          const completed = intakeByWeekday[index] || false;

          return (
            <div key={index} className="calendar-day">
              <div className="day-label">{day}</div>
              <div
                className={`day-indicator ${
                  completed ? "completed" : "pending"
                }`}
              >
                {completed ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : index === todayWeekday ? (
                  <div className="exclamation">!</div>
                ) : (
                  <div className="pending-circle" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
