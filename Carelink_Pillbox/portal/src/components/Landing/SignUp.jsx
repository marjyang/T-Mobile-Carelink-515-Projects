import {
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Calendar,
  Users,
  Mail,
} from "lucide-react";
import { healthcarePrograms, colors } from "./constants.ts";
import { useState } from "react";

export const SignUp = ({
  signUpData,
  setSignUpData,
  showPassword,
  setShowPassword,
  setSignUpError,
  signUpError,
  // setCurrentStep,
  returnToLanding,
  onSignUp,
}) => {
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  const selectedProgram = Object.values(healthcarePrograms).find(
    (program) => program.id === signUpData.selectedProgram
  );

  const handleSignUpDataChange = (field, value) => {
    setSignUpData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSignUpLoading(true);
    setSignUpError("");

    const {
      username,
      password,
      email,
      confirmPassword,
      age,
      gender,
      selectedProgram,
      name,
    } = signUpData;

    if (password !== confirmPassword) {
      setSignUpError("Passwords do not match");
      setIsSignUpLoading(false);
      return;
    }

    if (!name || !age || !gender || !username || !email) {
      setSignUpError("Please fill in all required fields");
      setIsSignUpLoading(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser = {
      username,
      password,
      name,
      age: parseInt(age, 10),
      gender,
      program: selectedProgram,
      email,
    };

    onSignUp(newUser);
    setIsSignUpLoading(false);
  };

  const inputStyles = {
    width: "100%",
    padding: "14px 16px",
    border: `2px solid ${colors.lightGray}`,
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.2s ease",
    fontWeight: "500",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "480px",
        position: "relative",
        zIndex: 1001,
      }}
    >
      <div
        style={{
          backgroundColor: colors.white,
          borderRadius: "16px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          padding: "40px",
          backdropFilter: "blur(20px)",
          zIndex: 1002,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: colors.magenta,
              marginBottom: "16px",
            }}
          >
            PATIENT SIGN UP
          </h2>
          {selectedProgram && (
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#F0F9FF",
                borderRadius: "8px",
                border: `1px solid ${selectedProgram.color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ marginRight: "8px" }}>{selectedProgram.icon}</span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: colors.black,
                }}
              >
                {selectedProgram.name}
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleSignUp} style={{ textAlign: "left" }}>
          {/* Full Name */}
          <InputField
            label="Full Name"
            value={signUpData.name}
            onChange={(val) => handleSignUpDataChange("name", val)}
            placeholder="Enter your full name"
            icon={<User size={20} color={colors.darkGray} />}
          />
          {/* Username */}
          <InputField
            label="Username"
            value={signUpData.username}
            onChange={(val) => handleSignUpDataChange("username", val)}
            placeholder="Choose a username"
            icon={<User size={20} color={colors.darkGray} />}
          />

          {/* Email */}
          <InputField
            label="Email"
            value={signUpData.email}
            onChange={(val) => handleSignUpDataChange("email", val)}
            placeholder="Enter your email"
            icon={<Mail size={20} color={colors.darkGray} />}
          />

          {/* Password */}
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={signUpData.password}
            onChange={(val) => handleSignUpDataChange("password", val)}
            placeholder="Create a password"
            icon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <EyeOff size={20} color={colors.darkGray} />
                ) : (
                  <Eye size={20} color={colors.darkGray} />
                )}
              </button>
            }
          />

          {/* Confirm Password */}
          <InputField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={signUpData.confirmPassword}
            onChange={(val) => handleSignUpDataChange("confirmPassword", val)}
            placeholder="Confirm your password"
          />

          {/* Age */}
          <InputField
            label="Age"
            type="number"
            value={signUpData.age}
            onChange={(val) => handleSignUpDataChange("age", val)}
            placeholder="Enter your age"
            icon={<Calendar size={20} color={colors.darkGray} />}
          />

          {/* Gender */}
          <div style={{ marginBottom: "32px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Gender
            </label>
            <div style={{ position: "relative" }}>
              <select
                value={signUpData.gender}
                onChange={(e) =>
                  handleSignUpDataChange("gender", e.target.value)
                }
                style={{
                  ...inputStyles,
                  appearance: "none",
                  backgroundColor: colors.white,
                }}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              <Users
                size={20}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                color={colors.darkGray}
              />
            </div>
          </div>

          {signUpError && (
            <div
              style={{
                marginBottom: "24px",
                padding: "16px",
                borderRadius: "12px",
                backgroundColor: "#FEF2F2",
                color: "#DC2626",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AlertCircle size={20} style={{ marginRight: "12px" }} />
              <span>{signUpError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={
              isSignUpLoading ||
              !signUpData.username ||
              !signUpData.password ||
              !signUpData.confirmPassword ||
              !signUpData.age ||
              !signUpData.gender
            }
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "700",
              border: "none",
              cursor: isSignUpLoading ? "not-allowed" : "pointer",
              backgroundColor:
                isSignUpLoading ||
                !signUpData.username ||
                !signUpData.password ||
                !signUpData.confirmPassword ||
                !signUpData.age ||
                !signUpData.gender
                  ? colors.lightGray
                  : colors.magenta,
              color: colors.white,
              boxShadow:
                isSignUpLoading ||
                !signUpData.username ||
                !signUpData.password ||
                !signUpData.confirmPassword ||
                !signUpData.age ||
                !signUpData.gender
                  ? "none"
                  : "0 4px 14px 0 rgba(226, 0, 116, 0.39)",
              transform: isSignUpLoading ? "scale(0.98)" : "scale(1)",
            }}
          >
            {isSignUpLoading ? "CREATING ACCOUNT..." : "SIGN UP"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button
            onClick={returnToLanding}
            style={{
              fontSize: "14px",
              color: colors.magenta,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              textDecoration: "underline",
            }}
          >
            {/* ← Change Program */}← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
}) => (
  <div style={{ marginBottom: "24px" }}>
    <label
      style={{
        display: "block",
        fontSize: "14px",
        fontWeight: "600",
        marginBottom: "8px",
      }}
    >
      {label}
    </label>
    <div style={{ position: "relative" }}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "14px 16px",
          paddingRight: icon ? "50px" : "16px",
          border: `2px solid ${colors.lightGray}`,
          borderRadius: "12px",
          fontSize: "16px",
          outline: "none",
          transition: "all 0.2s ease",
          fontWeight: "500",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.target.style.borderColor = colors.magenta)}
        onBlur={(e) => (e.target.style.borderColor = colors.lightGray)}
      />
      {icon && (
        <div
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {icon}
        </div>
      )}
    </div>
  </div>
);
