import React, { useState, useRef, useEffect } from "react";
import TopBar from "./TopBar";
import SensorDisplay from "./SensorDisplay";
import MotionDetector from "./MotionDetector";
import FeedbackPanel from "./FeedbackPanel";
import FirebaseDatasetFetcher from "./FirebaseDatasetFetcher";
import BLEDeviceConnector from "./BLEDeviceConnector";
import ReportUploader from "./ReportUploader";
import { db } from "../firebase";
import { doc, getDoc, getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import jsPDF from "jspdf";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useExerciseLogic } from "../hooks/useExerciseLogic.js";

// Constants for state machine
const ANGLE_IDLE = 180;
const ANGLE_IDLE_TOLERANCE = 5;
const TARGET_ANGLE = 60;
const TARGET_TOLERANCE = 10;
const HOLD_SECONDS = 5;
const RISE_THRESHOLD = 2;

const motionTypeOptions = [
  { label: "Hamstring Curl", value: "Hamstring Curl" },
  { label: "Heel Raise", value: "Heel Raise" },
  { label: "Hip Flexion", value: "Hip Flexion" },
];

const motionTypeToTargetPath = {
  "Hamstring Curl": ["parameters", "hamstringCurl", "targetAngle"],
};

const ExercisePage = () => {
  const {
    patientId, setPatientId,
    motionType, setMotionType,
    angle, setAngle,
    distance, setDistance,
    phase, setPhase,
    holdSeconds, setHoldSeconds,
    repCount, setRepCount,
    target, setTarget,
    minValues, setMinValues, allRepsValues,
    paused, setPaused,
    patientData, setPatientData,
    handleAngleUpdate, handleDistanceUpdate, handleSensorUpdate,
    fetchPatientData, exportAndUploadPDF, uploadReport
  } = useExerciseLogic("5678", "Hip Flexion"); // 你可以根据需要传初始值
  const minAngleRef = useRef(null);
  const holdStartRef = useRef(null);
  const recentAnglesRef = useRef([]);
  const holdTimerRef = useRef(null);
  const holdingCompleteRef = useRef(false);
  const prevPhaseRef = useRef("idle");
  const repPendingRef = useRef(false);
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

  const currentValue = motionType === "Hamstring Curl" ? angle : motionType === "Heel Raise" ? distance : angle;

  useEffect(() => {
    async function fetchPatientData() {
      if (!patientId) return;
      const reportsRef = collection(db, "patients", patientId, "reports");
      const q = query(reportsRef, orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latest = querySnapshot.docs[0].data();
        setPatientData(latest);
      }
    }
    fetchPatientData();
  }, [patientId]);

  let targetAngle = null;
  if (patientData) {
    if (motionType === "Hamstring Curl") {
      targetAngle = patientData.parameters?.hamstringCurl?.targetAngle ?? null;
    }
  }

  let overall = null;
  if (minValues.length > 0 && target) {
    const avg = minValues.reduce((a, b) => a + b, 0) / minValues.length;
    overall = `Avg: ${avg.toFixed(1)}, Target: ${target}, Diff: ${(avg - target).toFixed(1)}`;
  }

  async function exportAndUploadPDF_legacy() {
    const reports = await fetchAllReports_legacy();
    if (!reports.length) {
      window.alert("No report data found");
      return;
    }
    const latestReport = reports.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    let targetAngle = null;
    if (patientData) {
      if (motionType === "Hamstring Curl") {
        targetAngle = patientData.parameters?.hamstringCurl?.targetAngle ?? null;
      }
    }
    if (!targetAngle) {
      window.alert("No targetAngle found in patient data");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Patient Exercise Report (Latest)", 10, 10);
    let y = 20;
    doc.setFontSize(12);
    doc.text(`Date: ${latestReport.createdAt || ""}`, 10, y); y += 8;
    doc.text(`Repetitions: ${latestReport.repCount || latestReport.repetitions?.length || 0}`, 10, y); y += 8;
    doc.text(`Target Angle: ${targetAngle}`, 10, y); y += 8;
    let goodCount = 0;
    let total = latestReport.repetitions ? latestReport.repetitions.length : 0;
    if (latestReport.repetitions) {
      latestReport.repetitions.forEach((rep, i) => {
        const minValue = rep.minValue;
        const status = minValue > targetAngle ? "not good" : "good";
        if (status === "good") goodCount++;
        doc.text(`Rep ${i + 1}: minValue=${minValue}, status=${status}, values=[${rep.values.join(", ")}]`, 10, y);
        y += 8;
        if (y > 270) { doc.addPage(); y = 20; }
      });
    }
    let overall = "not good";
    if (total > 0 && goodCount / total > 0.6) overall = "good";
    y += 8;
    doc.setFontSize(14);
    doc.text(`Overall: ${overall} (${goodCount}/${total} good)`, 10, y);

    const pdfBlob = doc.output("blob");
    const fileName = `exercise_report_${Date.now()}.pdf`;
    const fileRef = ref(storage, `doctor/reports/${fileName}`);
    await uploadBytes(fileRef, pdfBlob);
    const url = await getDownloadURL(fileRef);
    window.alert("PDF uploaded! Download URL: " + url);
  }

  async function fetchAllReports_legacy() {
    const querySnapshot = await getDocs(collection(db, "patient_exercise_report"));
    return querySnapshot.docs.map(doc => doc.data());
  }

  console.log("patientData", patientData);

  // HIP FLEXION 处理逻辑
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

  const handleCheckReport = async () => {
    try {
      const reportsRef = collection(db, "patients", "5678", "reports");
      const q = query(reportsRef, orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latest = querySnapshot.docs[0].data();
        const hipFlexionTargetHeight = latest?.parameters?.hipFlexion?.targetHeight;
        setTargetHeight(
          hipFlexionTargetHeight !== undefined && hipFlexionTargetHeight !== null
            ? hipFlexionTargetHeight.toString()
            : "--"
        );
      } else {
        setTargetHeight("--");
      }
    } catch (err) {
      setTargetHeight("--");
      alert("Failed to fetch report");
    }
  };

  return (
    <div>
      <TopBar />
      <div style={{ margin: '16px 0' }}>
        <label style={{ fontWeight: 'bold', marginRight: 8 }}>Patient ID:</label>
        <input
          type="text"
          value={patientId}
          onChange={e => setPatientId(e.target.value)}
          style={{ marginRight: 16, padding: '4px 8px' }}
          placeholder="Enter patient id"
        />
        <label style={{ fontWeight: 'bold', marginRight: 8 }}>Motion Type:</label>
        <select value={motionType} onChange={e => setMotionType(e.target.value)}>
          {motionTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: '32px', margin: '24px 0' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1976d2' }}>Repetition
          <div style={{ fontSize: '2.5rem', color: '#222' }}>{repCount}</div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#388e3c' }}>Status
          <div style={{ fontSize: '2.5rem', color: '#222' }}>{phase}</div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d32f2f' }}>Time
          <div style={{ fontSize: '2.5rem', color: '#222' }}>{holdSeconds.toFixed(1)}</div>
        </div>
      </div>
      <SensorDisplay angle={angle} distance={distance} motionType={motionType} />
      <MotionDetector motionType={motionType} />
      <FeedbackPanel
        angle={angle}
        distance={distance}
        motionType={motionType}
        targetAngle={motionType === 'Hip Flexion' ? 175 : (patientData?.parameters?.hipFlexion?.targetAngle ?? 175)}
        targetDistance={patientData?.parameters?.hipFlexion?.targetHeight ?? '--'}
        target={target}
      />
      <FirebaseDatasetFetcher patientId={patientId} motionType={motionType} currentValue={currentValue} onTargetFetched={setTarget} />
      <BLEDeviceConnector
        motionType={motionType}
        onAngleUpdate={
          (motionType === "Hamstring Curl") ? handleSensorUpdate :
          (motionType === "Hip Flexion") ? handleAngleUpdate :
          undefined
        }
        onDistanceUpdate={
          (motionType === "Heel Raise") ? handleSensorUpdate :
          (motionType === "Hip Flexion") ? handleDistanceUpdate :
          undefined
        }
      />
      <ReportUploader patientId={patientId} angle={angle} distance={distance} motionType={motionType} repCount={repCount} minValues={minValues} overall={overall} allRepsValues={allRepsValues} />
      <button onClick={exportAndUploadPDF_legacy}>Export & Upload PDF</button>
    </div>
  );
};

export default ExercisePage;
