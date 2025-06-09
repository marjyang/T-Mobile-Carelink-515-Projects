import Sidebar from "./components/Doctor/Sidebar";
import Header from "./components/Doctor/Header";
import BPChart from "./components/Doctor/BPChart";
import MedicationList from "./components/Doctor/MedicationList";
import MedicationCalendar from "./components/Doctor/MedicationCalendar";
import NotesSection from "./components/Doctor/NotesSection";
import FilesSection from "./components/Doctor/FilesSection";
import "./Doctor.css";
import { useUser } from "./UserContext";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import Spinner from "./components/Patient/Spinner";

export default function DoctorPortal() {
  const { user } = useUser();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientIndex, setPatientIndex] = useState(0);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchPatients = async () => {
      setLoading(true); // start loading
      try {
        const patientsRef = collection(db, "users", user.uid, "patients");
        const snapshot = await getDocs(patientsRef);

        const patientList = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const patientId = docSnap.id;
            const patientDoc = await getDoc(doc(db, "users", patientId));
            return patientDoc.exists()
              ? { id: patientId, ...patientDoc.data() }
              : null;
          })
        );

        setPatients(patientList.filter(Boolean));
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false); // done loading
      }
    };

    fetchPatients();
  }, [user?.uid]);

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        {loading ? (
          <Spinner />
        ) : (
          <Header
            patients={patients}
            patientIndex={patientIndex}
            setPatientIndex={setPatientIndex}
          />
        )}
        <div className="content-area">
          <div className="left-panel">
            {/* Current Conditions - Top Section */}
            <div className="current-conditions">
              <BPChart patient={patients[patientIndex]} />
            </div>

            {/* Bottom Section - Medication List and Calendar */}
            <div className="medication-section">
              <div className="medication-left">
                <MedicationList />
              </div>
              <div className="medication-right">
                <MedicationCalendar patientId={patients[patientIndex]?.id} />
              </div>
            </div>
          </div>

          {/* Right Panel - Only Notes and Files */}
          <div className="right-panel">
            <NotesSection />
            <FilesSection />
          </div>
        </div>
      </div>
    </div>
  );
}
