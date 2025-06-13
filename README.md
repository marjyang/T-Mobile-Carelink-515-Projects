# T-Mobile Carelink Projects

**Innovative IoT Healthcare Solutions - TECHIN 515 (Hardware Software Lab II)**
![Frame 5](https://github.com/user-attachments/assets/91382c38-37bc-45ce-a08d-417775063870)

This repository contains three cutting-edge healthcare monitoring projects developed by GIX Cohort 8 as part of T-Mobile's remote healthcare data collection system initiative. Each project addresses critical healthcare challenges through IoT sensors, machine learning, and real-time data analytics.

## 🏥 Project Collection

### 1. **KneeHeal** - ACL Rehabilitation Monitoring
**📂 Branch: [`kneeheal-project`](https://github.com/marjyang/T-Mobile-Carelink-515-Projects/tree/kneeheal-project)**

Advanced ACL rehabilitation system using dual MPU6050 sensors and machine learning to track knee flexion angles during physical therapy exercises.

**Key Features:**
- Real-time knee angle monitoring with dual sensors
- Machine learning prediction model for accurate angle calculation
- React-based patient and doctor dashboards
- Firebase real-time data synchronization
- Progress tracking and exercise recommendations

**Technology Stack:** React.js, Firebase, Python ML, MPU6050 sensors, Arduino/ESP32

**Contributors:** Kelly Peng, Diana Ding, Yourong Xu, Jialu Huang

---

### 2. **Carelink Hypertension IoT Pill Box**
**📂 Branch: [`carelink-pillbox-project`](https://github.com/marjyang/T-Mobile-Carelink-515-Projects/tree/carelink-pillbox-project)**

Smart IoT-enabled pill tracking system for managing hypertension, combining sensor data and gesture detection to verify medication intake.

**Key Features:**
- Pill presence detection using photoresistor values
- ESP32-CAM captures image frames and sends them to a Flask server
- MediaPipe Pose runs on the server to detect pill-taking gestures
- Gesture signal is smoothed using a Savitzky–Golay low-pass filter to reduce noise
- Real-time data logging to Firebase Firestore for cloud storage
- React-based dashboard for patients and caregivers
- Notifications for missed doses and inconsistent behavior
- Designed for remote monitoring and healthcare provider integration

**Technology Stack:** React.js, Firebase, Flask, MediaPipe, Photoresistors, ESP32S3 Camera Module

**Contributors:** Yishuai Zheng, Hannah Xiao, Chang Li, Marjorie Yang

---

### 3. **X Heal** - ACL Rehabilitation Exercise Monitoring
**📂 Branch: [`Xheal-project`](https://github.com/marjyang/T-Mobile-Carelink-515-Projects/tree/Xheal-project)**

Intelligent ACL rehab tracker using TOF and SEN0221 sensors to detect and validate straight leg raise motions with real-time feedback and Firebase integration.

**Key features**
- Dual-sensor system using TOF (VL53L0X) for height and SEN0221 for angle
- Real-time motion tracking for straight leg raise
- Automatic repetition counting based on height thresholds and posture validity
- BLE data transmission from both sensors to React-based interface
- Firebase integration for cloud-based data storage and progress monitoring
- Patient-therapist dashboard with intuitive feedback
  
**Technology Stack:** React.js, Firebase (Firestore & Storage), ESP32-C3, ESP32-S3, VL53L0X (TOF), SEN0221, JavaScript, PDFMake, BLE

**Contributors:** Auria Zhang, Jazmyn Zhang, Yunqing Zhao, Shangming Zhuo

---

## 🚀 Live Demo

**Visit the integrated demo website:**  
**🔗 [https://adorable-brigadeiros-c2240e.netlify.app/](https://adorable-brigadeiros-c2240e.netlify.app/)**

Navigate between projects to replicate live demonstrations of each healthcare solution.

## 🛠️ Quick Start Guide

### For KneeHeal Project:
```bash
# Clone repository and switch to KneeHeal branch
git clone https://github.com/marjyang/T-Mobile-Carelink-515-Projects.git
cd T-Mobile-Carelink-515-Projects
git checkout kneeheal-project

# Install dependencies
npm install
pip install -r requirements.txt

# Start applications
npm start                          # React app (localhost:3000)
python firebase_read_predict.py    # ML prediction service
```

### For Carelink Pill Box:
```bash
# 1. Clone the repository and switch to the Pill Box branch
git clone https://github.com/marjyang/T-Mobile-Carelink-515-Projects.git
cd T-Mobile-Carelink-515-Projects
git checkout carelink-pillbox-project

# 2. Upload ESP32 code
# (Use Arduino IDE or PlatformIO to flash code in /esp32/ after editing Wi-Fi SSID and password)

# 3. Run the React frontend (patient/caregiver portal)
cd portal
npm install
npm start

# 4. Run the Flask server (gesture recognition)
cd ../flask_server
python flask_server.py
```

### For X Heal Project:
```bash
# Clone repository and navigate to Xheal branch
git clone https://github.com/marjyang/T-Mobile-Carelink-515-Projects.git
cd T-Mobile-Carelink-515-Projects
git checkout Xheal-project
cd patient-portal                   # or doctor-portal
npm install
npm start
```

## 📊 Project Overview

| Project | Technology | Status | Branch/Folder |
|---------|------------|--------|---------------|
| **KneeHeal** | React, Firebase, Python ML, MPU6050 | ✅ Complete | [`kneeheal-project`](https://github.com/marjyang/T-Mobile-Carelink-515-Projects/tree/kneeheal-project) |
| **Pill Box** | React, Firebase, Cloud Backend (Flask), OV2640, GL5528 or similar | ✅ Complete | [`Carelink_Pillbox`](https://github.com/marjyang/T-Mobile-Carelink-515-Projects/tree/main/Carelink_Pillbox) |
| **X Heal** | React, Firebase, Signal Processing, VL53L0X, SEN0221  | ✅ Complete | [`Xheal-project`](https://github.com/marjyang/T-Mobile-Carelink-515-Projects/tree/Xheal-project) |

## 🏗️ Repository Structure

```
T-Mobile-Carelink-515-Projects/
├── main branch (this README)
├── kneeheal-project branch/
│   ├── src/                     # React application
│   ├── firebase_read_predict.py # ML prediction service
│   ├── mpu_angle_model.pkl      # Trained ML model
│   ├── SETUP.md                 # Detailed setup guide
│   └── ...
├── carelink-pillbox-project branch/ 
│   └── cam-esp32s3/             # Camera ESP script
│   └── ldr-esp32s3/             # Photoresistors ESP script
│   └── server/                  # Flask server script
│   └── portal/                  # React application
│       └── src/
│       └── ...
│   └── ...
├── Xheal-project branch/
│   ├── Arduino-code/           # ESP32 firmware for angle and height sensors
│   ├── assets/                 # Device photos, schematics, and assembly diagrams
│   ├── doctor-portal/          # Doctor-facing React dashboard
│   ├── patient-portal/         # Patient-facing React dashboard
│   └── README.md               # Project README with setup, flow, and description
└── src/                        # Shared components
    └── ...

```

## 🎯 Project Goals

These projects advance T-Mobile's healthcare initiative by:

- **Improving Patient Outcomes**: Real-time monitoring and feedback systems
- **Enhancing Care Delivery**: Tools for healthcare providers to monitor patients remotely
- **Reducing Healthcare Costs**: Preventive care through continuous monitoring
- **Advancing IoT in Healthcare**: Practical applications of connected medical devices
- **Data-Driven Insights**: Machine learning for predictive healthcare analytics

## 🔬 Technical Innovation

### KneeHeal Innovations:
- **Dual Sensor Fusion**: Advanced MPU6050 sensor integration for accurate movement tracking
- **Real-time ML Predictions**: Edge computing for immediate feedback during exercises
- **Intuitive UI/UX**: Patient-friendly interfaces for rehabilitation guidance
- **Clinical Integration**: Healthcare provider dashboards for patient monitoring

### Carelink Pill Box Innovations:
- **Smart Dispensing**: Automated medication management with IoT sensors
- **Adherence Tracking**: Real-time monitoring of medication compliance
- **Alert Systems**: Multi-channel notifications for patients and caregivers

## 👥 Contributors & Teams

### KneeHeal Team
- **Kelly Peng** - Full-Stack Development &Machine Learning 
- **Diana Ding** - Enclosure Design & UI/UX Design 
- **Yourong Xu** -  System Architecture
- **Jialu Huang** -  Hardware Integration & Sensor Systems

### Carelink Pill Box Team
- **Yishuai Zheng** - UI/UX Design & IoT Development
- **Hannah Xiao** - Industrial Design & Software Development
- **Chang Li** - Design & Frontend Development
- **Marjorie Yang** - System Integration & Project Management

### X Heal Team
- **Auria Zhang** - Full-Stack Development & Project Management
- **Yunqing Zhao** - Software Development & System Integration
- **Jazmyn Zhang** - Hardware Integration (Heel Device) & UI/UX Design (Doctor Portal) 
- **Shangming Zhuo** - Hardware Integration (Knee Device)& UI/UX Design (Patient Portal) 

## 🎓 Academic & Industry Partnership

### Academic Institution
**Global Innovation Exchange (GIX) - University of Washington**
- **Course**: TECHIN 515 (Hardware Software Lab II)
- **Program**: Technology Innovation Master's Program
- **Cohort**: GIX Cohort 8

### Industry Partner
**T-Mobile**
- **Initiative**: Remote Healthcare Data Collection System
- **Focus**: Expanding healthcare accessibility through technology

### Project Advisors
- **Candice Boyd** - T-Mobile Healthcare Innovation
- **Justin Ho** - T-Mobile Technical Leadership
- **Quasheery Ahmed** - T-Mobile Project Management
- **John Raiti** - GIX Faculty Advisor
- **Luyao Niu** - GIX Technical Advisor

## 📈 Impact & Applications

### Healthcare Impact
- **Patient Engagement**: Interactive systems that motivate patient participation
- **Clinical Efficiency**: Streamlined monitoring reduces healthcare provider workload
- **Data Collection**: Rich datasets for healthcare research and improvement
- **Accessibility**: Remote monitoring solutions for underserved populations

### Technical Applications
- **IoT in Healthcare**: Practical implementations of connected medical devices
- **Edge Computing**: Real-time processing for immediate patient feedback
- **ML in Medicine**: Applied machine learning for predictive healthcare
- **User-Centered Design**: Healthcare interfaces designed for diverse user needs

## 🔗 External Resources

- **Live Demo**: [https://adorable-brigadeiros-c2240e.netlify.app/](https://adorable-brigadeiros-c2240e.netlify.app/)
- **GIX Program**: [University of Washington Global Innovation Exchange](https://gix.uw.edu/)
- **T-Mobile Healthcare**: [T-Mobile Health Solutions](https://www.t-mobile.com/)

## 📞 Contact & Support

### Project Inquiries
**Primary Contact**: marjyang@uw.edu  
**Repository Maintainer**: Marjorie Yang

### Technical Support
For technical issues or questions about specific projects:
1. Check the project-specific documentation in respective branches/folders
2. Review setup guides (`SETUP.md` files)
3. Contact project team members directly
4. Submit issues through GitHub Issues

### Collaboration Opportunities
We welcome collaboration from:
- Healthcare professionals interested in IoT applications
- Developers working on similar healthcare solutions
- Researchers in medical technology and patient monitoring
- Industry partners exploring connected health solutions

---

## 📄 License & Attribution

This project collection was developed as part of TECHIN 515 coursework at the Global Innovation Exchange (GIX), University of Washington, in partnership with T-Mobile.

**Academic Year**: 2024-2025  
**Course**: TECHIN 515 - Hardware Software Lab II  
**Institution**: Global Innovation Exchange (GIX)  
**Industry Partner**: T-Mobile

For detailed licensing information, see individual project folders.

---

**⭐ Star this repository if these healthcare IoT solutions inspire your work!**
