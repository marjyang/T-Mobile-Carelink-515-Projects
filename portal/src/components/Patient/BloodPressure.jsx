import Papa from "papaparse";
import { useEffect, useState } from "react";
import { useUser } from "../../UserContext";

export default function BloodPressure({ patient }) {
  const [data, setData] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const loadCSV = (filename) => {
      fetch(filename)
        .then((res) => res.text())
        .then((csvText) => {
          const parsed = Papa.parse(csvText, { header: true });
          setData(parsed.data);
        })
        .catch((err) => console.error("Error loading CSV:", err));
    };

    const identifier =
      patient?.email || patient?.usererame || user?.email || user?.username;

    if (!identifier) {
      loadCSV("./data/patient0_data.csv");
      return;
    }

    const hash = [...identifier].reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const patientIndex = hash % 4;
    const filename = `./data/patient${patientIndex}_data.csv`;

    loadCSV(filename);
  }, [patient, user]);

  // Constants for SVG scaling
  const chartWidth = 500;
  const chartHeight = 200;
  const leftPadding = 50;
  const topPadding = 20;
  const bottomPadding = 20;

  const maxBP = 160;
  const minBP = 60;
  const bpRange = maxBP - minBP;

  const scaleX = (i) =>
    leftPadding + (i * (chartWidth - leftPadding - 20)) / (data.length - 1);
  const scaleY = (bp) =>
    chartHeight -
    bottomPadding -
    ((bp - minBP) / bpRange) * (chartHeight - topPadding - bottomPadding);

  const systolicPoints = data
    .map((d, i) => `${scaleX(i)},${scaleY(+d.sysBP)}`)
    .join(" ");
  const diastolicPoints = data
    .map((d, i) => `${scaleX(i)},${scaleY(+d.diaBP)}`)
    .join(" ");

  return (
    <div className="blood-pressure-container">
      <h3 className="section-title">Blood Pressure Measurements</h3>

      <div className="consistency-status">
        <div className="status-header">
          <span className="status-label">Medication Consistency: Okay</span>
          <button className="trend-btn">Trend ▼</button>
        </div>
        <p className="status-description">
          {patient ? (
            <>
              {patient.name} has missed{" "}
              {patient.gender === "male"
                ? "his"
                : patient.gender === "female"
                ? "her"
                : "their"}{" "}
              pills once this week.
            </>
          ) : (
            "You've missed your pills once this week."
          )}
        </p>
      </div>

      <div className="chart-container">
        <div className="chart-placeholder">
          <svg
            width="100%"
            height="300"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            {/* Chart background */}
            <rect
              width={chartWidth}
              height={chartHeight}
              fill="#f8f9fa"
              rx="10"
            />

            {/* Grid lines */}
            <defs>
              <pattern
                id="grid"
                width="50"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 20"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Dynamic data lines */}
            {data.length > 0 && (
              <>
                <polyline
                  fill="none"
                  stroke="#ff6b6b"
                  strokeWidth="2"
                  points={systolicPoints}
                />
                <polyline
                  fill="none"
                  stroke="#4ecdc4"
                  strokeWidth="2"
                  points={diastolicPoints}
                />
              </>
            )}

            {/* Y-axis labels */}
            {[140, 120, 100, 80].map((val, i) => (
              <text key={i} x="10" y={scaleY(val)} fontSize="12" fill="#666">
                {val}
              </text>
            ))}

            {/* Optional: X-axis labels every 7 days */}
            {data.length > 0 &&
              data.map((d, i) => {
                if (i % 7 !== 0) return null;
                const date = new Date(d["Measurement Date"]);
                const label = date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
                return (
                  <text
                    key={i}
                    x={scaleX(i)}
                    y={chartHeight - 5}
                    fontSize="10"
                    fill="#666"
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                );
              })}
          </svg>
        </div>

        <div className="chart-legend">
          <div className="legend-item">
            <div
              className="legend-color systolic"
              style={{ backgroundColor: "#ff6b6b" }}
            ></div>
            <span>Systolic</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color diastolic"
              style={{ backgroundColor: "#4ecdc4" }}
            ></div>
            <span>Diastolic</span>
          </div>
        </div>
      </div>
    </div>
  );
}
