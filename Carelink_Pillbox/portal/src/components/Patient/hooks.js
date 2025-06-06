import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from "../../UserContext";

export function useWeeklyIntakeStatus() {
  const { user } = useUser();
  const [intakeByWeekday, setIntakeByWeekday] = useState({});
  const [todayWeekday, setTodayWeekday] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (!user?.uid) return;

    const fetchIntakeStatus = async () => {
      setLoading(true); // Begin loading
      const sessionsRef = collection(db, "users", user.uid, "sessions");
      const snapshot = await getDocs(sessionsRef);

      const temp = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.intake_status === "Taken") {
          const sessionId = doc.id;
          const dateStr = sessionId.split("_")[0]; // e.g. "2023-06-02"

          const [year, month, day] = dateStr.split("-").map(Number);
          const date = new Date(year, month - 1, day);
          const weekday = (date.getDay() + 6) % 7; // Monday = 0

          temp[weekday] = true;
        }
      });

      setIntakeByWeekday(temp);
      setTodayWeekday((new Date().getDay() + 6) % 7);
      setLoading(false); // Done loading
    };

    fetchIntakeStatus();
  }, [user?.uid]);

  return { intakeByWeekday, todayWeekday, loading };
}
