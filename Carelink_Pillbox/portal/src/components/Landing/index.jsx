import { useState } from "react";

import { Landing } from "./Landing";
import { ProgramSelection } from "./ProgramSelection";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { healthcarePrograms, colors } from "./constants.ts";
import { auth, db } from "../../firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";

const containerStyle = {
  background: "linear-gradient(135deg, #E20074 0%, #B8005A 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  overflowY: "auto",
};

const CareLink = ({ onSignIn }) => {
  const [currentStep, setCurrentStep] = useState("landing");
  const [userType, setUserType] = useState("patient");

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [signUpData, setSignUpData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    selectedProgram: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    signIn: "",
    signUp: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setCredentials({ username: "", password: "", showPassword: false });
    setSignUpData({
      username: "",
      password: "",
      confirmPassword: "",
      age: "",
      gender: "",
      selectedProgram: "",
      name: "",
    });
    setErrors({ signIn: "", signUp: "" });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((prev) => ({ ...prev, signIn: "" }));

    try {
      let emailToSignIn = credentials.username;

      // 🔍 Check if the input is an email or username
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.username);

      if (!isEmail) {
        // Lookup Firestore for email by username
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("username", "==", credentials.username)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error("No user found with that username.");
        }

        // Assuming usernames are unique — take first match
        const userDoc = querySnapshot.docs[0];
        emailToSignIn = userDoc.data().email;
      }

      // ✅ Sign in with resolved email
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailToSignIn,
        credentials.password
      );

      const user = userCredential.user;

      // 🔍 Fetch user profile from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        if (userData.userType !== userType) {
          setErrors((prev) => ({
            ...prev,
            signIn:
              userData.userType === "doctor"
                ? "Please sign in as a doctor."
                : "Please sign in as a patient.",
          }));
        } else {
          const fullUser = {
            uid: user.uid,
            email: user.email,
            ...userData,
          };

          if (fullUser.program === "hypertension") {
            onSignIn(fullUser);
          } else if (fullUser.program === "acl-rehab") {
            window.open(
              "https://preeminent-bubblegum-262a7d.netlify.app/",
              "_self"
            );
          } else {
            setErrors((prev) => ({
              ...prev,
              signIn: "This program is not available yet.",
            }));
          }
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          signIn: "User profile not found.",
        }));
      }
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        signIn: error.message || "Invalid email or password",
      }));
    }

    setIsLoading(false);
  };

  const handleSignUp = async () => {
    const {
      email,
      username,
      password,
      confirmPassword,
      age,
      gender,
      selectedProgram,
      name,
    } = signUpData;

    if (password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, signUp: "Passwords do not match" }));
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save full profile to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        name,
        age: parseInt(age, 10),
        gender,
        program: selectedProgram,
        userType,
        createdAt: new Date().toISOString(),
      });

      // auto-login
      const fullUser = {
        uid: user.uid,
        email: user.email,
        username,
        age,
        gender,
        program: selectedProgram,
        userType,
        name,
      };

      onSignIn(fullUser, userType);
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({ ...prev, signUp: error.message }));
    }
  };

  const handleProgramSelection = (programId) => {
    setSignUpData((prev) => ({ ...prev, selectedProgram: programId }));
    setCurrentStep("signup");
  };

  const returnToLanding = () => {
    resetState();
    setCurrentStep("landing");
  };

  const renderContent = () => {
    switch (currentStep) {
      case "landing":
        return (
          <div style={containerStyle}>
            <Landing
              resetState={resetState}
              setCurrentStep={setCurrentStep}
              setUserType={setUserType}
              switchUserType={setUserType}
              handleProgramSelection={handleProgramSelection}
            />
          </div>
        );

      case "program-selection":
        return (
          <div style={containerStyle}>
            <ProgramSelection
              returnToLanding={returnToLanding}
              handleProgramSelection={handleProgramSelection}
            />
          </div>
        );

      case "signin":
        return (
          <div style={containerStyle}>
            <SignIn
              userType={userType}
              handleSignIn={handleSignIn}
              username={credentials.username}
              setUsername={(val) =>
                setCredentials((prev) => ({ ...prev, username: val }))
              }
              password={credentials.password}
              setPassword={(val) =>
                setCredentials((prev) => ({ ...prev, password: val }))
              }
              showPassword={credentials.showPassword}
              setShowPassword={(val) =>
                setCredentials((prev) => ({ ...prev, showPassword: val }))
              }
              error={errors.signIn}
              isLoading={isLoading}
              returnToLanding={returnToLanding}
            />
          </div>
        );

      case "signup":
        return (
          <div style={containerStyle}>
            <SignUp
              signUpData={signUpData}
              setSignUpData={setSignUpData}
              showPassword={credentials.showPassword}
              setShowPassword={(val) =>
                setCredentials((prev) => ({ ...prev, showPassword: val }))
              }
              setSignUpError={(msg) =>
                setErrors((prev) => ({ ...prev, signUp: msg }))
              }
              signUpError={errors.signUp}
              setCurrentStep={setCurrentStep}
              onSignUp={handleSignUp}
              returnToLanding={returnToLanding}
            />
          </div>
        );

      default:
        return (
          <div>
            <h2>Healthcare Programs</h2>
            <ul>
              {Object.values(healthcarePrograms).map((program) => (
                <li
                  key={program.id}
                  style={{ color: program.color, marginBottom: 12 }}
                >
                  <span style={{ fontSize: 24 }}>{program.icon}</span>
                  <strong style={{ marginLeft: 8 }}>{program.name}</strong>
                  <div style={{ fontSize: 14 }}>{program.description}</div>
                  {program.isOurProduct && (
                    <span style={{ color: colors.magenta, marginLeft: 8 }}>
                      (Our Product)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return renderContent();
};

export default CareLink;
