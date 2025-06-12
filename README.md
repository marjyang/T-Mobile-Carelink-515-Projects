# Project X - ACL Rehabilitation Exercise Monitoring

Next-gen ACL rehab monitoring solution using dual BLE sensors (ToF and angle) for straight leg raise exercises, combining precise measurement, real-time tracking, and Firebase-integrated feedback.

## User Flow
![User Flow](https://github.com/marjyang/T-Mobile-Carelink-515-Projects/raw/Xheal-project/assets/userflow.png)

## Key Features

- **Dual BLE Sensor Integration**  
  Uses a ToF (VL53L0X) sensor for height and a SEN0221 sensor for leg angle.

- **Real-time Hip Flexion Detection**  
  Detects motion start, 5-second hold at target height, and full return to baseline for repetition count.

- **Firebase Sync**  
  Live data upload and rep tracking in Firebase Firestore.

- **Automated Report Generation**  
  Auto-generates PDF reports for each session, summarizing motion performance.

- **React Frontend UI**  
  Provides live feedback on current angle, height, status, and completed reps.

- **Doctor-Patient Portal Integration**  
  Supports data visualization and centralized login with other Carelink+ projects.


## Technology Stack

- **Hardware**:  
  Seeed Studio XIAO ESP32-C3 (SEN0221) + ESP32-S3 (ToF VL53L0X)

- **Frontend**:  
  React.js, HTML, Tailwind CSS, JavaScript

- **Backend**:  
  Firebase Firestore, Firebase Storage

- **Report Export**:  
  `pdfmake` for session PDF generation

- **Connectivity**:  
  Bluetooth Low Energy (BLE) for real-time data streaming


## System Overview

![User Flow](https://github.com/marjyang/T-Mobile-Carelink-515-Projects/raw/Xheal-project/assets/datapipeline.png)

Project X is a multi-exercise ACL rehabilitation monitoring system supporting Hip Flexion, Hamstring Curl, and Heel Raise, each with custom sensor logic tailored to clinical movement standards.

- **Sensors**: Dual BLE (ESP32-C3/S3)  
- **Measurements**:  
  - Joint angle via SEN0221 IMU  
  - Vertical displacement via ToF sensor  
- **Realtime feedback and Firebase sync**  

### Hip Flexion  
- Valid leg angle: 175–180°  
- Hold triggered after 5 consecutive readings above 85% threshold  
- Rep counted after 5-sec hold and return to baseline (<0.5 cm)

### Hamstring Curl  
- Detects stable angle range with significant curl (min < 175°)  
- Hold phase begins after 5 stable readings  
- Rep counted after 5-sec hold and full extension

### Heel Raise  
- Vertical displacement above 2 cm triggers hold  
- Lowering to <0.5 cm after 5 seconds confirms rep

All data is synced in real-time to Firebase and visualized via React dashboard.


## Setup Instructions

### A) Upload Sensor Firmware

#### 1. Angle Sensor (ESP32-C3)
- Use PlatformIO  
- Board: `Seeed Studio XIAO ESP32C3`  
- Upload: `angleSensor.ino`  
- Set Bluetooth name: `AngleSensor`  
- Match BLE UUIDs with frontend

#### 2. Height Sensor (ESP32-S3, ToF)
- Use PlatformIO  
- Board: `Seeed Studio XIAO ESP32S3`  
- Upload: `heightSensor.ino`  
- Set Bluetooth name: `HeightSensor`  


### B) React Frontend Setup

```bash
git clone https://github.com/marjyang/T-Mobile-Carelink-515-Projects.git
cd T-Mobile-Carelink-515-Projects
npm install
npm start
