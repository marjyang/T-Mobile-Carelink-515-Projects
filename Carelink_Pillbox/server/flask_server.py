import cv2
import numpy as np
from flask import Flask, request, jsonify
from datetime import datetime
from scipy.signal import savgol_filter, find_peaks

import mediapipe as mp
import threading
import time
import firebase_admin
from firebase_admin import credentials, firestore

# ------------------------------------ SETUP ------------------------------------

app = Flask(__name__)
cred = credentials.Certificate("XXXXXXXXXXXXXXXXXX.json") # replace with Firebase credentials file name
firebase_admin.initialize_app(cred)
db = firestore.client()

USER_ID = "EJzmOQHujIhd6rTj38sSvCjluqN2" # random user ID - reflects onto Firebase

frame_buffer = []
landmarks_buffer = []
poses_detected = []
processing_in_progress = False
last_detection_time = 0
latest_session_timestamp = None  # Store the current session timestamp

# Pose model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=False, model_complexity=0)

# ------------------------------------ HELPERS ------------------------------------

def get_session_id_from_time(timestamp):
    dt = datetime.fromtimestamp(timestamp)
    return dt.strftime("%Y-%m-%d_%I:%M%p")  # Example: 2025-06-02_08:30AM

def log_gesture(user_id, timestamp, gesture_count, person_in_frame, session_valid):
    session_id = get_session_id_from_time(timestamp)
    doc_ref = db.collection("users").document(user_id).collection("sessions").document(session_id)
    doc_ref.set({
        "last_updated": firestore.SERVER_TIMESTAMP,
        "gesture_timestamp": timestamp,
        "gesture_detected": gesture_count > 0,
        "gesture_count": gesture_count,
        "person_in_frame": person_in_frame,
        "session_valid": session_valid        
    }, merge=True)

def log_ldr(user_id, timestamp, pills_removed, removed_slots):
    session_id = get_session_id_from_time(timestamp)
    doc_ref = db.collection("users").document(user_id).collection("sessions").document(session_id)
    
    doc_ref.set({
        # "pills_present": pills_present,
        "pills_removed": pills_removed,
        "removed_slots": removed_slots,
        "ldr_timestamp": timestamp
    }, merge=True)

def clear_buffers():
    frame_buffer.clear()
    landmarks_buffer.clear()
    poses_detected.clear()
    if hasattr(receive_image, 'burst_start_time'):
        receive_image.burst_start_time = datetime.now()

def analyze_gestures(landmarks_buffer):
    landmarks = np.array(landmarks_buffer)
    distances = []

    for frame in landmarks:
        hand = np.mean([frame[15][:2], frame[16][:2]], axis=0)
        nose = frame[0][:2]
        distances.append(np.linalg.norm(hand - nose))

    L = len(distances)
    window = min(11, L if L % 2 == 1 else L - 1)
    smoothed = savgol_filter(distances, window, 2) if window >= 3 else distances
    inverted = -np.array(smoothed)
    peaks, _ = find_peaks(inverted, height=-0.7, distance=10, prominence=0.1)

    return len(peaks)

# ------------------------------------ ENDPOINTS ------------------------------------

@app.route('/cam', methods=['POST'])
def receive_image():
    global latest_session_timestamp, frame_buffer, landmarks_buffer, poses_detected

    timestamp = int(request.args.get("ts", time.time()))  # 🆕 Get timestamp from ESP32
    latest_session_timestamp = timestamp  # 🆕 Store for sync

    if not hasattr(receive_image, 'burst_start_time'):
        receive_image.burst_start_time = datetime.now()

    if len(frame_buffer) == 0:
        receive_image.burst_start_time = datetime.now()

    img_data = np.frombuffer(request.data, np.uint8)
    frame = cv2.imdecode(img_data, cv2.IMREAD_COLOR)

    if frame is not None:
        frame_buffer.append(frame)
        image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(image_rgb)
        receive_image.last_frame_time = datetime.now()

        if results.pose_landmarks:
            poses_detected.append(True)
            landmarks_buffer.append([[lm.x, lm.y, lm.z] for lm in results.pose_landmarks.landmark])
            print("✅ Pose detected.")
        else:
            poses_detected.append(False)
            print("❌ Pose NOT detected.")
    else:
        print("⚠️ Failed to decode frame")

    return "OK", 200

@app.route('/cam-done', methods=['GET'])
def camera_done():
    global processing_in_progress

    print("📩 Camera burst complete signal received.")
    if processing_in_progress:
        print("⚠️ Detection already in progress, skipping...")
        return "Already processing", 200

    if len(landmarks_buffer) < 5:
        print("⚠️ Not enough data to process gesture")
        clear_buffers()
        return "Not enough data", 200

    processing_in_progress = True

    count = analyze_gestures(landmarks_buffer)
    valid_pose_frames = sum(1 for x in poses_detected if x)
    person_in_frame = (valid_pose_frames / len(frame_buffer)) >= 0.7
    session_valid = person_in_frame and (count > 0)

    print(f"🤚 DETECTED {count} PILL GESTURES | {valid_pose_frames}/{len(frame_buffer)} pose frames")

    try:
        if latest_session_timestamp:
            # Retrieve LDR data
            session_id = get_session_id_from_time(latest_session_timestamp)
            doc_ref = db.collection("users").document(USER_ID).collection("sessions").document(session_id)
            doc = doc_ref.get()
            if doc.exists:
                data = doc.to_dict()
                pills_removed = data.get("pills_removed", None)

                # Compute intake status
                if pills_removed is None:
                    intake_status = "Not enough data"
                    confidence = "Low"

                elif pills_removed > 0:
                    intake_status = "Taken"
                    confidence = "High"

                elif pills_removed == 0 and session_valid:
                    intake_status = "Uncertain"
                    confidence = "Medium"

                elif pills_removed == 0 and not session_valid:
                    intake_status = "Not Taken"
                    confidence = "High"

                else:
                    intake_status = "Unknown"
                    confidence = "Low"

                doc_ref.set({
                    "intake_status": intake_status,
                    "confidence": confidence
                }, merge=True)
                print(f"✅ Intake status set: {intake_status} ({confidence})")
            else:
                print("⚠️ No session document found.")
            
            # Log gesture details
            log_gesture(USER_ID, latest_session_timestamp, count, person_in_frame, session_valid)
        else:
            print("⚠️ No session timestamp available. Gesture log skipped.")
    except Exception as e:
        print(f"❌ Firestore logging error: {e}")

    clear_buffers()
    processing_in_progress = False
    return "Processed", 200

@app.route('/ldr-data', methods=['POST'])
def receive_ldr_data():
    try:
        data = request.get_json()
        print("📥 LDR Data Received:", data)

        timestamp = data.get("timestamp", int(time.time()))
        pills_removed = data.get("pills_removed")
        
        # NEW: Get removed_slots (if sent as a string like "2,4")
        removed_slots_raw = data.get("removed_slots", "")
        if isinstance(removed_slots_raw, str):
            removed_slots = [int(x) for x in removed_slots_raw.split(",") if x.strip().isdigit()]
        else:
            removed_slots = removed_slots_raw  # fallback if it's already a list

        # NEW: Include removed_slots in your log or processing
        log_ldr(USER_ID, timestamp, pills_removed, removed_slots)
        # log_ldr(USER_ID, timestamp, pills_present, pills_removed, removed_slots)


        return jsonify({
            "status": "success",
            "assigned_timestamp": timestamp
        }), 200

    except Exception as e:
        print(f"❌ Error handling LDR data: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

# ------------------------------------ BACKGROUND TASK ------------------------------------

def timeout_watcher():
    global last_detection_time, processing_in_progress, latest_session_timestamp

    while True:
        time.sleep(1)

        if not processing_in_progress and len(landmarks_buffer) > 0:
            time_since_last = (datetime.now() - receive_image.last_frame_time).total_seconds()
            time_since_start = (datetime.now() - receive_image.burst_start_time).total_seconds()

            if time_since_last > 2.5 or time_since_start > 8:
                processing_in_progress = True

                if time.time() - last_detection_time < 10:
                    print("⏱️ Skipped: too soon after last detection.")
                    clear_buffers()
                    processing_in_progress = False
                    continue

                last_detection_time = time.time()

                if len(frame_buffer) < 5:
                    print("⚠️ Not enough frames")
                    clear_buffers()
                    processing_in_progress = False
                    continue

                count = analyze_gestures(landmarks_buffer)
                valid_pose_frames = sum(1 for x in poses_detected if x)
                person_in_frame = (valid_pose_frames / len(frame_buffer)) >= 0.7
                session_valid = person_in_frame and (count > 0)

                print(f"🤚 DETECTED {count} PILL GESTURES | {valid_pose_frames}/{len(frame_buffer)} pose frames")

                try:
                    if latest_session_timestamp:
                        log_gesture(USER_ID, latest_session_timestamp, count, person_in_frame, session_valid)
                    else:
                        print("⚠️ No session timestamp available. Gesture log skipped.")
                except Exception as e:
                    print(f"❌ Firestore logging error: {e}")

                clear_buffers()
                processing_in_progress = False

# ------------------------------------ MAIN ------------------------------------

if __name__ == "__main__":
    print("🚀 Starting Flask server...")
    app.run(host="0.0.0.0", port=8000)
