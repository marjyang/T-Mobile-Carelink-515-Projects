// src/PatientPortal.jsx
import Dashboard from "./components/Patient/Dashboard";
import "./Patient.css"; // 创建 Patient 专用的 CSS 文件

export default function PatientPortal() {
  return (
    <div className="patient-app">
      <Dashboard />
    </div>
  );
}
