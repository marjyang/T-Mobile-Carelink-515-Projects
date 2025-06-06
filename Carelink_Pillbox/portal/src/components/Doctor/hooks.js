import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export function useMedicationCalendarData(patientId) {
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;

    const fetchCalendarData = async () => {
      setLoading(true);

      const now = new Date();
      const currentMonth = now.getMonth(); // 0-indexed
      const currentYear = now.getFullYear();

      // Step 1: Create a default day map for all days in the month
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const calendarMap = new Map();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        calendarMap.set(day, {
          date,
          day,
          status: "missing", // default
        });
      }

      // Step 2: Fetch data
      const sessionsRef = collection(db, "users", patientId, "sessions");
      const snapshot = await getDocs(sessionsRef);

      snapshot.forEach((doc) => {
        const sessionId = doc.id;
        const data = doc.data();

        const dateStr = sessionId.split("_")[0]; // e.g. "2025-06-02"
        const [year, month, day] = dateStr.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        if (!isNaN(date)) {
          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();

          if (month === currentMonth && year === currentYear) {
            const status = data.intake_status?.toLowerCase();
            const existing = calendarMap.get(day);

            // Prioritize "taken" over anything else
            if (status === "taken") {
              calendarMap.set(day, { date, day, status: "taken" });
            } else if (
              existing.status !== "taken" &&
              (status === "uncertain" || status === "missing")
            ) {
              calendarMap.set(day, { date, day, status });
            }
          }
        }
      });

      const sortedData = Array.from(calendarMap.values()).sort(
        (a, b) => a.day - b.day
      );
      setCalendarData(sortedData);
      setLoading(false);
    };

    fetchCalendarData();
  }, [patientId]);

  return { calendarData, loading };
}
