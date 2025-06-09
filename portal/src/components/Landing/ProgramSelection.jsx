import { colors, healthcarePrograms } from "./constants.ts";

const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
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
    fontWeight: "700",
    color: colors.magenta,
    margin: "0 0 16px 0",
    letterSpacing: "-0.5px",
    fontFamily: "inherit",
  },
  subtitle: {
    fontSize: "16px",
    color: colors.darkGray,
    margin: 0,
    fontFamily: "inherit",
  },
  programCard: {
    padding: "24px",
    border: `2px solid ${colors.lightGray}`,
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: colors.white,
    position: "relative",
  },
  programCardHover: {
    borderColor: colors.magenta,
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  },
  programHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  },
  programIcon: {
    fontSize: "24px",
    marginRight: "12px",
  },
  programName: {
    fontSize: "18px",
    fontWeight: "700",
    color: colors.black,
    margin: 0,
    fontFamily: "inherit",
  },
  programDescription: {
    fontSize: "14px",
    color: colors.darkGray,
    margin: 0,
    fontFamily: "inherit",
  },
  backBtnWrapper: {
    textAlign: "center",
    marginTop: "32px",
  },
  backBtn: {
    fontSize: "14px",
    color: colors.magenta,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "underline",
    fontFamily: "inherit",
  },
};

export const ProgramSelection = ({
  returnToLanding,
  handleProgramSelection,
}) => {
  const handleMouseEnter = (e) => {
    Object.assign(e.currentTarget.style, styles.programCardHover);
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.currentTarget.style, {
      borderColor: colors.lightGray,
      transform: "translateY(0)",
      boxShadow: "none",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Select Healthcare Program</h2>
          <p style={styles.subtitle}>
            Choose the program that best fits your healthcare needs
          </p>
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          {Object.entries(healthcarePrograms).map(([key, program]) => (
            <div
              key={key}
              onClick={() => handleProgramSelection(program.id)}
              style={styles.programCard}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div style={styles.programHeader}>
                <span style={styles.programIcon}>{program.icon}</span>
                <h3 style={styles.programName}>{program.name}</h3>
              </div>
              <p style={styles.programDescription}>{program.description}</p>
            </div>
          ))}
        </div>

        <div style={styles.backBtnWrapper}>
          <button onClick={returnToLanding} style={styles.backBtn}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
