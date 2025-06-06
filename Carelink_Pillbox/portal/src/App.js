// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import CareLink from "./components/Landing";
import DoctorPortal from "./DoctorPortal";
import PatientPortal from "./PatientPortal";
import { UserProvider, useUser } from "./UserContext";
import { useEffect } from "react";
import HealthcareProgramSelector from "./components/Nav/HealthcareProgramSelector";

function AppWrapper() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  // Restore user from localStorage and navigate if needed
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, [navigate, setUser]);

  // Handle login from CareLink
  const handleSignIn = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));

    if (user.userType === "doctor") {
      navigate("/doctor");
    } else if (user.userType === "patient") {
      navigate("/patient");
    }
  };

  return <CareLink onSignIn={handleSignIn} />;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HealthcareProgramSelector />} />
          <Route path="/home" element={<AppWrapper />} />
          <Route path="/doctor/*" element={<DoctorPortal />} />
          <Route path="/patient/*" element={<PatientPortal />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
