import { colors } from "./constants.ts";
import { User, Eye, EyeOff, AlertCircle } from "lucide-react";

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "440px",
    position: "relative",
    zIndex: 1001,
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
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    color: colors.magenta,
    margin: 0,
    letterSpacing: "-0.5px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: 600,
    color: colors.black,
    marginBottom: "8px",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    paddingRight: "50px",
    border: `2px solid ${colors.lightGray}`,
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.2s ease",
    fontWeight: 500,
    boxSizing: "border-box",
  },
  icon: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: colors.darkGray,
  },
  toggleButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  errorBox: {
    marginBottom: "24px",
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "#FEF2F2",
    color: "#DC2626",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: 500,
  },
  submitButton: (disabled) => ({
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: 700,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    backgroundColor: disabled ? colors.lightGray : colors.magenta,
    color: colors.white,
    transition: "all 0.2s ease",
    boxShadow: disabled ? "none" : "0 4px 14px 0 rgba(226, 0, 116, 0.39)",
    transform: disabled ? "scale(0.98)" : "scale(1)",
  }),
  linkButton: {
    fontSize: "14px",
    color: colors.magenta,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    textDecoration: "underline",
    transition: "all 0.2s ease",
  },
};

export const SignIn = ({
  userType,
  handleSignIn,
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  error,
  isLoading,
  returnToLanding,
}) => {
  const fillDemoCredentials = () => {
    if (userType === "patient") {
      setUsername("hx2313");
      setPassword("hx2313");
    } else {
      setUsername("TestDoctor");
      setPassword("thisisatest");
    }
  };

  const isDisabled = isLoading || !username || !password;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            {userType === "patient" ? "PATIENT" : "DOCTOR"} SIGN IN
          </h2>
        </div>

        <form onSubmit={handleSignIn} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "24px" }}>
            <label style={styles.label}>Username or Email</label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username or email"
                onFocus={(e) => (e.target.style.borderColor = colors.magenta)}
                onBlur={(e) => (e.target.style.borderColor = colors.lightGray)}
                style={styles.input}
              />
              <User size={20} style={styles.icon} />
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                onFocus={(e) => (e.target.style.borderColor = colors.magenta)}
                onBlur={(e) => (e.target.style.borderColor = colors.lightGray)}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
              >
                {showPassword ? (
                  <EyeOff size={20} style={{ color: colors.darkGray }} />
                ) : (
                  <Eye size={20} style={{ color: colors.darkGray }} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <AlertCircle size={20} style={{ marginRight: "12px" }} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            style={styles.submitButton(isDisabled)}
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <button
            type="button"
            onClick={fillDemoCredentials}
            style={styles.linkButton}
          >
            Use Demo Credentials
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button onClick={returnToLanding} style={styles.linkButton}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
