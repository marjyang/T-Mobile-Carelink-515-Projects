# Carelink Pill Box
A remote monitoring solution that provides doctors with adherence data and empowers patients with greater visibility into their hypertension medication habits. [--> Project Presentation
](https://docs.google.com/presentation/d/1LSaqBJPW_dTAX-sO0YWhZtEC9UaZZX-oVO5Y69zrGgA/edit?usp=sharing

![pillbox](https://github.com/user-attachments/assets/7dc9f785-0ac4-4b5c-8cc2-9723f4adeae2)

## User Flow
![image](https://github.com/user-attachments/assets/2e47837d-cab3-49e7-9ff1-ba3d073bdde5)

## Full System Integration
We deployed two complementary sensing modalities:
- Photoresistors (LDRs) detect physical removal of pills from each compartment.
- Camera Module captures and verifies pill-taking gestures via MediaPipe (hand-to-nose movement).
  
Data from both types of sensors are timestamped and sent to a cloud-based FastAPI/Flask backend. If both LDR and gesture detection occur within a defined time window, the system confidently marks the pill as “taken.” Otherwise, it flags the action as “Not Taken” on both patient and doctor portal, and the LED light on the pill box will continue to light up red to notify patients. If either the photoresistor or the camera fails to detect correctly, the system marks the status as “Uncertain,” which there is a chance to allow the patient/caregiver to manually confirm medication intake status on the patient portal. After a 7-day period, the LED on the pill box will blink white to remind the patient/caregiver to refill the pillbox.

**For the demo**, the pill box will light up red every minute, representing each day of the week. Once the week is over - after 7 rounds - a white light will flash to indicate time to refill the pill box.

## Deployment
- All components are housed in a custom PCB and a 3D-printed enclosure, powered via battery.
- The system (The camera and the photo resistors) is automatically activated when the pillbox is opened, triggered by an embedded switch mechanism placed inside the bottom left part of the pill box.
- The device connects to the cloud through T-Mobile’s 5G network, which supports real-time data upload and remote monitoring without depending on local Wi-Fi.
- Backend supports real-time Firebase integration, enabling potential EHR sync in the future.

## Data Pipeline
![image](https://github.com/user-attachments/assets/34722ea2-b128-43f9-bd06-f3546cbb7c8a)

## Frontend Visualization
We integrated on and finalized the UI design for both patient and doctor dashboards and implemented responsive dashboards using React, HTML, CSS, and JavaScript within the Cursor development environment to visualize and receiving real-time data collection from the pillbox. We also integrated our portals with two other teams sponsored by the T-Mobile CareLink+ project, allowing both patients and doctors to sign in through one unified platform. 

You can find this code in the `portal` directory.

#### Key features include:
1. **Daily Pill Intake Tracking:** Displays pill status by time and compartment using a simple, color-coded calendar view.
2. **Weekly Adherence Summaries:** Visualizes weekly medication patterns using backend-generated data and intuitive charts.
3. **Blood Pressure Summary:** Provides a quick overview of the patient’s recent blood pressure readings for contextual health insights.
4. **Medication Adherence Reminders:** Automatically sends reminders to patients based on missed doses or irregular intake patterns.
5. **Doctor-to-Patient Messaging:** Allows doctors to send personalized notes or feedback directly to patients, which can be reviewed in their individual portal.

## Setup Instructions
### Prerequisites
- VSCode with PlatformIO extension or PlatformIO IDE
- Carelink Pill Box
- USB-C cable to connect to pill box ESP32S3s
- *Before uploading code to ESP32S3s, ensure the switch is OFF.*

### A) Upload Steps - LDR ESP32-S3
1. Create a new project in PlatformIO, selecting "Seeed Studio XIAO ESP32S3" as your board and "Arduino" as the framework
2. Copy `ldr-esp32s3/main.cpp` into your own project
3. In the `platform.ini` file of the project, paste the following inside the [env:your_board] section to add the necessary library:
   ```ini
   lib_deps = bblanchon/ArduinoJson@^7.4.1
   ```
5. Set your **Wi-Fi credentials** and replace serverURL:
   ```cpp
   const char* WIFI_SSID = "YOUR_SSID";
   const char* WIFI_PASSWORD = "YOUR_PASSWORD";
   const char* SERVER_URL = "http://XXX.XXX.XX.XXX:8000/ldr-data"; // make sure to keep the ':8000/ldr-data'
   ```
6. Open pill box bottom layer and plug in ESP32S3 to your computer.
7. Upload the code and open the Serial Monitor to verify connectivity.

### B) Upload Steps - CAM ESP32-S3
1. Create a new project in PlatformIO, selecting "Seeed Studio XIAO ESP32S3" as your board and "Arduino" as the framework
2. Copy `cam-esp32s3/main.cpp` into your own project
3. In the `platform.ini` file of the project, paste the following inside the [env:your_board] section to enable PSRAM (required for camera and AI applications):
   ```ini
   board_build.arduino.psram = enabled
   ```
5. Set your **Wi-Fi credentials** and replace serverURL:
   ```cpp
   const char* WIFI_SSID = "YOUR_SSID";
   const char* WIFI_PASSWORD = "YOUR_PASSWORD";
   const char* SERVER_URL = "http://XXX.XXX.XX.XXX:8000/cam"; // make sure to keep the ':8000/cam'
   ```
6. Open the pill box and detach the layer covering the camera. Pull the ESP32S3 with camera attachment out slightly and plug in the ESP32S3 to your computer.
7. Upload the code and open the Serial Monitor to verify connectivity.

### C) Server Side Setup
1. Go to your Firebase, and download the credentials file (JSON file).
2. Navigate to `server` folder.
3. Add the credentials JSON file to the `server` folder.
4. Make sure you are replacing the file path for the credentials in the `flask_server.py` code.
   ```python
   cred = credentials.Certificate("XXXXXXXX.json")
   ```
5. To change the user you want to record data for, edit the `USER_ID` variable.
6. Set up a virtual environment with the following sequence (note - please ensure python 3.10 has been installed - this is necessary for some packages required)
   ```terminal
   rm -rf venv
   python3.10 -m venv venv
   source venv/bin/activate
   pip install --no-deps --no-cache-dir -r requirements.txt
   ```
7. Run `flask_server.py`
8. Turn on the switch on the back of the pill box, wait for connection and open the lid once the LED turns red!

### D) Frontend Setup (futher details in `portal`)
1. Clone the repository and navigate to `portal` in `carelink-pillbox-project branch`.
2. Install dependencies.
3. Set up Firebase environment variables.
4. Run the appplication.

## BOM
| Item    | Component | Description | Quantity | Notes |
| -------- | ------- | -------- | ------- | ------ |
| 1 | ESP32-S3 Dev Board | XIAO ESP32-S3 or equivalent | 2 | One for pill detection (photoresistors), one for gesture detection (camera) |
| 2 | OV2640 Camera Module | 24-pin FPC camera module compatible with ESP32-S3 | 1 | For gesture detection ESP32-S3 |
| 3 | Photoresistors (LDRs) | GL5528 or similar | 7 | Connected to pill detection ESP32-S3 |
| 4 | 10kΩ Resistors | For voltage divider with LDRs | 7 | One per photoresistor |
| 5 | White S LED | Indicate need for refill | 1 | Ensure these are size S |
| 6 | Red S LED | Indicate need to take medication | 1 | Ensure these are size S |
| 7 | 220Ω Resistors | For safe use of LEDs | 2 | One per LED |
| 8 | Push Button | SPDT PUSH switch | 1 | Triggers data capture when lid is opened |
| 9 | Power Switch | SPDT toggle switch | 1 | On/off switch for battery |
| 10 | Shared Battery (3.7V LiPo) | Rechargeable, 2000mAh | 1 | Powers both ESP32-S3 boards |
| 11 | Custom PCB | Final design base attached as .ZIP file | 1 | Connects above components |
| 12 | 3D Printed Enclosure | Custom pill box casing with slots and mounting | 1 | STL files provided in /enclosure/ - ensure wires from camera threads through the middle of the top layer, connecting to the bottom layer |
| 13 | Small screw | Thread between top and middle enclosure layers | 2 | Ensure length is not too short to thread through the dedicated area |
| 14 | Mirror | Part of the enclosure to help users see positioning of camera | 1 | 2"x2", ensure width is shallow enough for lid to close |
| 15 | Breadboard | Circuit prototyping | 1-2 | For testing purposes |
| 16 | Jumper Wires | Circuit prototyping | Varies | For testing purposes |




