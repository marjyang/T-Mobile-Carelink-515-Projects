import React, { useState } from "react";
import TopBar from "../../components/TopBar.jsx";
import FirebaseDatasetFetcher from "../../components/FirebaseDatasetFetcher.jsx";
import BLEDeviceConnector from "../../components/BLEDeviceConnector.jsx";
import FeedbackPanel from "../../components/FeedbackPanel.jsx";
import ReportUploader from "../../components/ReportUploader.jsx";
import SensorDisplay from "../../components/SensorDisplay.jsx";

const motionTypes = [
  "Hamstring Curl",
  "Heel Raise",
  "Hip Flexion"
] as const;
type MotionType = typeof motionTypes[number];

const NewPage: React.FC = () => {
  const [patientId, setPatientId] = useState<string>("1234");
  const [motionType, setMotionType] = useState<MotionType>("Hamstring Curl");
  const [angle, setAngle] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [repCount, setRepCount] = useState<number>(0);
  const [minValues, setMinValues] = useState<number[]>([]);
  const [allRepsValues, setAllRepsValues] = useState<number[][]>([]);
  const [overall, setOverall] = useState<string>("");

  return (
    <div>
      <TopBar />
      <div style={{ margin: '16px 0' }}>
        <label style={{ fontWeight: 'bold', marginRight: 8 }}>Patient ID:</label>
        <input
          type="text"
          value={patientId}
          onChange={e => setPatientId(e.target.value)}
          style={{ marginRight: 16, padding: '4px 8px' }}
          placeholder="Enter patient id"
        />
        <label style={{ fontWeight: 'bold', marginRight: 8 }}>Motion Type:</label>
        <select value={motionType} onChange={e => setMotionType(e.target.value as MotionType)}>
          {motionTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <FirebaseDatasetFetcher patientId={patientId} motionType={motionType} onTargetFetched={setTarget} />
      <BLEDeviceConnector
        motionType={motionType}
        onAngleUpdate={setAngle}
        onDistanceUpdate={setDistance}
      />
      <FeedbackPanel
        angle={angle}
        distance={distance}
        motionType={motionType}
        target={target}
      />
      <SensorDisplay angle={angle} distance={distance} motionType={motionType} />
      <ReportUploader
        patientId={patientId}
        angle={angle}
        distance={distance}
        motionType={motionType}
        repCount={repCount}
        minValues={minValues}
        overall={overall}
        allRepsValues={allRepsValues}
      />
    </div>
  );
};

export default NewPage; 