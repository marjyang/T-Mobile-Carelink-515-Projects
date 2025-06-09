// src/components/Patient/PrescriptionDetails.jsx

export default function PrescriptionDetails() {
    return (
      <div className="prescription-details">
        <h3 className="details-title">Prescription Details</h3>
        
        <div className="details-actions">
          <button className="action-btn amount-changes">
            Amount Changes
          </button>
          
          <button className="action-btn refill-notification">
            Refill Notification
          </button>
        </div>
      </div>
    );
  }