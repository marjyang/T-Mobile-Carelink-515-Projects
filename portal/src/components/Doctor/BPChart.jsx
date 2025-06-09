import BloodPressure from "../Patient/BloodPressure";
export default function BPChart({ patient }) {
  return (
    <div className="chart-box">
      <h2>Current Conditions</h2>
      <div className="tabs">
        <button className="tab active">Blood Pressure</button>
        <button className="tab">Other Monitoring Data</button>
      </div>

      <BloodPressure patient={patient} />
    </div>
  );
}
