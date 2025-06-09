import { useNavigate } from "react-router-dom";
import "./HealthcareProgramSelector.css";
import logo from "../../assets/logo.svg";

const HealthcareProgramSelector = () => {
  const navigate = useNavigate();
  const healthcarePrograms = [
    {
      id: "acl-therapy",
      title: "ACL Therapy Exercise",
      description:
        "General exercise program for ACL recovery with basic rehabilitation training",
      url: "acl-therapy",
      icon: "🏃‍♂️",
      color: "#2196F3",
      features: [
        "Basic Exercise Training",
        "Recovery Plan Guidance",
        "Progress Tracking",
      ],
    },
    {
      id: "acl-rehab",
      title: "ACL Rehabilitation Monitor",
      description:
        "Real-time knee angle monitoring with AI guidance for professional rehabilitation",
      url: "internal-acl",
      icon: "🦵",
      color: "#4CAF50",
      features: [
        "Real-time Angle Monitoring",
        "AI Smart Guidance",
        "Personalized Rehabilitation Plans",
      ],
    },
    {
      id: "hypertension",
      title: "Hypertension Monitoring",
      description:
        "Blood pressure tracking and medication alerts for hypertension management",
      url: "hypertension",
      icon: "❤️",
      color: "#FF9800",
      features: [
        "Real-time BP Tracking",
        "Medication Reminders",
        "Health Data Analytics",
      ],
    },
  ];

  const handleProgramSelect = (url, title) => {
    if (url === "internal-acl") {
      window.open("https://preeminent-bubblegum-262a7d.netlify.app/", "_self");
    } else if (url === "hypertension") {
      navigate("/home");
    } else if (url === "acl-therapy") {
      window.open("https://papaya-crepe-ced3ac.netlify.app/", "_self");
    } else if (url.startsWith("http")) {
      window.open(url, "_self");
    } else {
      if (url.startsWith("#")) {
        alert(
          `${title} is currently under development. Please check back later.`
        );
      } else {
        window.location.href = url;
      }
    }
  };

  return (
    <div className="hp-selector">
      <div className="hp-header">
        <div className="hp-container">
          <div className="hp-logo">
            <span className="hp-logo-t">
              <img
                src={logo}
                alt="T-Mobile Logo"
                className="tmobile-logo-img"
                width={48}
                background="transparent"
              />
            </span>
            <span className="hp-logo-text">CareLink</span>
          </div>
          <div className="hp-tagline">Choose Your Healthcare Program</div>
        </div>
      </div>

      <div className="hp-hero">
        <div className="hp-container">
          <h1 className="hp-hero-title">
            Welcome to <span className="hp-highlight">T-Mobile CareLink</span>
          </h1>
          <p className="hp-hero-subtitle">
            Select the healthcare program that fits your needs and start your
            health management journey
          </p>
        </div>
      </div>

      <div className="hp-programs-section">
        <div className="hp-container">
          <div className="hp-section-title">
            <h2>Available Healthcare Programs</h2>
            <p>We provide the following professional healthcare services</p>
          </div>
          <div className="hp-programs-grid">
            {healthcarePrograms.map((program) => (
              <div
                key={program.id}
                className="hp-program-card"
                onClick={() => handleProgramSelect(program.url, program.title)}
                style={{ "--card-color": program.color }}
              >
                <div
                  className="hp-program-icon"
                  style={{ color: program.color }}
                >
                  {program.icon}
                </div>
                <h3 className="hp-program-title">{program.title}</h3>
                <p className="hp-program-description">{program.description}</p>
                <ul className="hp-program-features">
                  {program.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div
                  className="hp-program-button"
                  style={{ background: program.color }}
                >
                  Get Started
                  <span className="hp-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hp-footer">
        <div className="hp-container">
          <p>&copy; 2024 T-Mobile CareLink. All rights reserved.</p>
          <p>Powered by T-Mobile Healthcare Technology</p>
        </div>
      </div>
    </div>
  );
};

export default HealthcareProgramSelector;
