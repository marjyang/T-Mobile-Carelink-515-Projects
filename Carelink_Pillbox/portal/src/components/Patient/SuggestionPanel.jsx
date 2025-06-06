// src/components/Patient/SuggestionsPanel.jsx

export default function SuggestionsPanel() {
  const suggestions = [
    {
      id: 1,
      title: "Medication Timing",
      content: "Take blood pressure medication in the morning with breakfast for better absorption.",
      doctor: "Dr. Smith",
      date: "May 5, 2025"
    },
    {
      id: 2,
      title: "Diet Recommendations",
      content: "Reduce sodium intake to less than 2300mg daily to help manage blood pressure.",
      doctor: "Dr. Johnson",
      date: "May 3, 2025"
    },
    {
      id: 3,
      title: "Exercise Guidelines",
      content: "Aim for 30 minutes of moderate exercise 5 days per week to improve cardiovascular health.",
      doctor: "Dr. Smith",
      date: "May 1, 2025"
    }
  ];

  return (
    <div className="suggestions-panel">
      <h3 className="panel-title">Suggestions from Doctors</h3>
      
      <div className="suggestions-list">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="suggestion-item">
            <div className="suggestion-header">
              <h4 className="suggestion-title">{suggestion.title}</h4>
              <span className="suggestion-date">{suggestion.date}</span>
            </div>
            <p className="suggestion-content">{suggestion.content}</p>
            <div className="suggestion-footer">
              <span className="suggestion-doctor">{suggestion.doctor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}