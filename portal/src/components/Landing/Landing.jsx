import { colors } from "./constants.ts";

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    position: "relative",
    zIndex: 1001,
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    color: colors.white,
  },
  title: {
    fontSize: "48px",
    fontWeight: "700",
    color: colors.white,
    margin: "0 0 8px 0",
    letterSpacing: "-1px",
    fontFamily: "inherit",
  },
  subtitle: {
    fontSize: "18px",
    color: "#FFFFFF90",
    margin: 0,
    fontWeight: "400",
    fontFamily: "inherit",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: "16px",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    padding: "40px",
    backdropFilter: "blur(20px)",
    position: "relative",
    zIndex: 1002,
    textAlign: "center",
  },
  welcome: {
    fontSize: "28px",
    fontWeight: "700",
    color: colors.magenta,
    margin: "0 0 32px 0",
    letterSpacing: "-0.5px",
    fontFamily: "inherit",
  },
  button: {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },
  signInBtn: {
    backgroundColor: colors.magenta,
    color: colors.white,
    border: "none",
    boxShadow: "0 4px 14px 0 rgba(226, 0, 116, 0.39)",
    marginBottom: "16px",
  },
  signUpBtn: {
    backgroundColor: colors.white,
    color: colors.magenta,
    border: `2px solid ${colors.magenta}`,
  },
  providerText: {
    color: colors.darkGray,
    margin: "0 0 12px 0",
    fontSize: "14px",
    fontFamily: "inherit",
  },
  doctorLink: {
    fontSize: "14px",
    fontWeight: "700",
    color: colors.magenta,
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },
};

export const Landing = ({
  resetState,
  setUserType,
  setCurrentStep,
  handleProgramSelection,
}) => {
  const handleStart = (step) => {
    resetState();
    setCurrentStep(step);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>T-Mobile CareLink</h1>
        <p style={styles.subtitle}>Connected Healthcare Platform</p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.welcome}>Welcome to CareLink</h2>

        <div style={{ marginBottom: "32px" }}>
          <button
            onClick={() => {
              setUserType("patient");
              handleStart("signin");
            }}
            style={{ ...styles.button, ...styles.signInBtn }}
          >
            SIGN IN
          </button>
          <button
            onClick={() => handleProgramSelection("hypertension")}
            style={{ ...styles.button, ...styles.signUpBtn }}
          >
            SIGN UP FOR NEW PROGRAM
          </button>
        </div>

        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <p style={styles.providerText}>Are you a healthcare provider?</p>
          <button
            type="button"
            onClick={() => {
              setUserType("doctor");
              setCurrentStep("signin");
            }}
            style={styles.doctorLink}
          >
            Doctor Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
