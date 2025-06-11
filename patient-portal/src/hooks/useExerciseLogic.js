import { useState, useRef, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import jsPDF from "jspdf";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ANGLE_IDLE = 180;
const ANGLE_IDLE_TOLERANCE = 5;
const TARGET_TOLERANCE = 10;
const HOLD_SECONDS = 5;

export function useExerciseLogic(initialPatientId = "1234", initialMotionType = "Hamstring Curl") {
  const [patientId, setPatientId] = useState(initialPatientId);
  const [motionType, setMotionType] = useState(initialMotionType);
  const [angle, setAngle] = useState(null);
  const [distance, setDistance] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [holdSeconds, setHoldSeconds] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const [target, setTarget] = useState(null);
  const minAngleRef = useRef(null);
  const holdStartRef = useRef(null);
  const recentAnglesRef = useRef([]);
  const holdTimerRef = useRef(null);
  const repPendingRef = useRef(false);
  const [patientData, setPatientData] = useState(null);
  const [paused, setPaused] = useState(false);
  const [minValues, setMinValues] = useState([]);
  const [allRepsValues, setAllRepsValues] = useState([]);
  const currentRepValuesRef = useRef([]);

  let targetRepetitions = null;
  if (patientData) {
    if (motionType === "Hamstring Curl") {
      targetRepetitions = patientData.parameters?.hamstringCurl?.repetitions ?? null;
    } else if (motionType === "Heel Raise") {
      targetRepetitions = patientData.parameters?.heelRaise?.repetitions ?? null;
    } else if (motionType === "Hip Flexion") {
      targetRepetitions = patientData.parameters?.hipFlexion?.repetitions ?? null;
    }
  }

  const startHoldTimer = () => {
    if (!holdTimerRef.current) {
      holdStartRef.current = Date.now();
      holdTimerRef.current = setInterval(() => {
        const elapsed = ((Date.now() - holdStartRef.current) / 1000).toFixed(1);
        setHoldSeconds(parseFloat(elapsed));
      }, 100);
    }
  };

  const handleAngleUpdate = (value) => {
    if (paused) return;
    setAngle(value);
  };

  const handleDistanceUpdate = (value) => {
    if (paused) return;
    setDistance(value);
  };

  const handleSensorUpdate = (value) => {
    if (paused) return;
    if (motionType === "Hamstring Curl") {
      setAngle(value);
      if (value >= 175 && value <= 185 && phase === "idle") return;
      recentAnglesRef.current.push(value);
      if (recentAnglesRef.current.length > 5) recentAnglesRef.current.shift();
      const max = Math.max(...recentAnglesRef.current);
      const min = Math.min(...recentAnglesRef.current);
      currentRepValuesRef.current.push(value);
      if (
        recentAnglesRef.current.length === 5 &&
        Math.abs(max - min) <= TARGET_TOLERANCE &&
        phase === "idle" &&
        min < 175
      ) {
        setPhase("holding");
        startHoldTimer();
        repPendingRef.current = true;
        minAngleRef.current = min;
      }
    } else if (motionType === "Heel Raise") {
      setDistance(value);
      if (value > 2.0 && phase === "idle") {
        setPhase("holding");
        startHoldTimer();
        repPendingRef.current = true;
        minAngleRef.current = value;
      }
    }
  };

  useEffect(() => {
    if (paused) return;
    const value = motionType === "Hamstring Curl" ? angle : motionType === "Heel Raise" ? distance : angle;
    const resetCondition = motionType === "Hamstring Curl"
      ? value >= 175 && value <= 185
      : value < 0.5;

    if (phase === "holdingDown" && repPendingRef.current && resetCondition) {
      setRepCount((prev) => prev + 1);
      repPendingRef.current = false;
      setPhase("idle");
      setHoldSeconds(0);
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
      recentAnglesRef.current = [];
      if (currentRepValuesRef.current.length > 0) {
        setAllRepsValues((prev) => [...prev, currentRepValuesRef.current]);
        currentRepValuesRef.current = [];
      }
      if (minAngleRef.current !== null && minAngleRef.current !== undefined) {
        setMinValues((prev) => [...prev, minAngleRef.current]);
        minAngleRef.current = null;
      }
    }
  }, [angle, distance, phase, motionType, paused]);

  useEffect(() => {
    if (holdSeconds >= HOLD_SECONDS && phase === "holding") {
      setPhase("holdingDown");
      repPendingRef.current = true;
    }
  }, [holdSeconds, phase]);

  useEffect(() => {
    if (targetRepetitions && repCount >= targetRepetitions) {
      setPhase("paused");
      setPaused(true);
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
      setHoldSeconds(0);
      return;
    }
  }, [repCount, targetRepetitions]);

  useEffect(() => {
    setAngle(null);
    setDistance(null);
    setPhase("idle");
    setHoldSeconds(0);
    setRepCount(0);
    setTarget(null);
    setPaused(false);
    setMinValues([]);
    setAllRepsValues([]);
    currentRepValuesRef.current = [];
    recentAnglesRef.current = [];
    holdTimerRef.current && clearInterval(holdTimerRef.current);
    holdTimerRef.current = null;
    if (currentRepValuesRef.current.length > 0) {
      setAllRepsValues(prev => [...prev, currentRepValuesRef.current]);
      currentRepValuesRef.current = [];
    }
  }, [motionType]);

  // 获取患者数据
  const fetchPatientData = async (customPatientId) => {
    const pid = customPatientId || patientId;
    if (!pid) return;
    const reportsRef = collection(db, "patients", pid, "reports");
    const q = query(reportsRef, orderBy("timestamp", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const latest = querySnapshot.docs[0].data();
      setPatientData(latest);
      // 你可以在这里直接 setTarget 或 set 其他目标值
      if (latest.parameters?.hipFlexion?.targetHeight) {
        setTarget(latest.parameters.hipFlexion.targetHeight);
      }
    }
  };

  // 导出并上传 PDF
  const exportAndUploadPDF = async () => {
    // ...和 ExercisePage 里一样 ...
  };

  // 上传本次训练数据
  const uploadReport = async () => {
    // ...和 ReportUploader 逻辑类似 ...
  };

  // Hip Flexion 处理逻辑（可选）
  useEffect(() => {
    if (motionType !== "Hip Flexion" || paused || !patientData) return;
    const targetHeight = patientData.parameters?.hipFlexion?.targetHeight ?? 45;
    const angleValid = angle >= 175 && angle <= 180;
    const diff = distance;

    if (angleValid && diff != null) {
      if (!window.recentDiffs) window.recentDiffs = [];
      window.recentDiffs.push(diff);
      if (window.recentDiffs.length > 5) window.recentDiffs.shift();

      const stable = window.recentDiffs.length === 5 && window.recentDiffs.every(val => val >= targetHeight * 0.85);

      if (stable && phase === "idle") {
        setPhase("holding");
        startHoldTimer();
        repPendingRef.current = true;
      }

      if (phase === "holding" && holdSeconds >= HOLD_SECONDS) {
        setPhase("holdingDown");
      }

      if (phase === "holdingDown" && repPendingRef.current && diff < 0.5) {
        setRepCount((prev) => prev + 1);
        setPhase("idle");
        setHoldSeconds(0);
        clearInterval(holdTimerRef.current);
        holdTimerRef.current = null;
        repPendingRef.current = false;
        window.recentDiffs = [];
      }
    }
  }, [angle, distance, phase, holdSeconds, motionType, paused, patientData]);

  return {
    patientId, setPatientId,
    motionType, setMotionType,
    angle, setAngle,
    distance, setDistance,
    phase, setPhase,
    holdSeconds, setHoldSeconds,
    repCount, setRepCount,
    target, setTarget,
    minValues, setMinValues, allRepsValues, setAllRepsValues,
    paused, setPaused,
    patientData, setPatientData,
    handleAngleUpdate, handleDistanceUpdate, handleSensorUpdate,
    fetchPatientData, exportAndUploadPDF, uploadReport
  };
} 