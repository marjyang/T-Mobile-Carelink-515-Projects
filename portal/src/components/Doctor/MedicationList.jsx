// src/components/MedicationList.jsx

export default function MedicationList() {
  const medications = [
    {
      name: "Valsartan (10mg)",
      brand: "Diovan",
      lastRefill: "Apr 27, 2025"
    },
    {
      name: "Valsartan (10mg)", 
      brand: "Diovan",
      lastRefill: "Apr 27, 2025"
    }
  ];

  return (
    <div className="medication-list-container">
      <h3 className="medication-title">Medication</h3>
      
      <div className="medication-cards">
        {medications.map((med, index) => (
          <div key={index} className="medication-card">
            <div className="medication-info">
              <div className="medication-header">
                <h4 className="medication-name">{med.name}</h4>
                <button className="medication-menu">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="1" fill="#666"/>
                    <circle cx="19" cy="12" r="1" fill="#666"/>
                    <circle cx="5" cy="12" r="1" fill="#666"/>
                  </svg>
                </button>
              </div>
              
              <div className="medication-details">
                <p className="brand-name">Brand name: {med.brand}</p>
                <p className="last-refill">Last Refill: {med.lastRefill}</p>
              </div>
            </div>
            
            <button className="send-refill-btn">Send Refill</button>
          </div>
        ))}
      </div>
    </div>
  );
}