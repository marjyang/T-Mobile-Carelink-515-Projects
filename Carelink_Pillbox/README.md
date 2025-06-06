# Carelink Pill Box
A project to develop a system that allows doctors to remotely verify patient adherence to hypertension medication.
In this final milestone, we focused on integrating both photoresistor and camera subsystems into a unified medication tracking platform, supporting real-time doctor-patient interactions. 

## Full System Integration
We deployed two complementary sensing modalities:
- Photoresistors (LDRs) detect physical removal of pills from each compartment.
- Camera Module captures and verifies pill-taking gestures via MediaPipe (hand-to-nose movement).
  
Data from both sensors are timestamped and sent to a cloud-based FastAPI/Flask backend. If both LDR and gesture detection occur within a defined time window, the system confidently marks the pill as “taken.” Otherwise, it flags the action as “Not Taken” on both patient and doctor portal, and the LED light on the pill box will flash red to notify. If either the photoresistor or the camera fails to detect correctly, the system marks the status as “Uncertain,” which there is a chance to allow the patinet/caregive to manually confirm medication intake status on the patient portal. After a 7-day period, the LED on the pillbox will blink white to remind the patient/caregiver to refill the pillbox.

## Deployment
- All components are housed in a custom PCB and a 3D-printed enclosure, powered via battery.
- The system (The camera and the photo resistors) is automatically activated when the pillbox is opened, triggered by an embedded switch mechanism placed inside the bottom left part of the pill box.
- The device connects to the cloud through T-Mobile’s 5G network, which supports real-time data upload and remote monitoring without depending on local Wi-Fi.
- Backend supports real-time Firebase integration, enabling potential EHR sync in the future.

## Frontend Visualization
We interated on and finalized the UI design for both patient and doctor dashboards and implemented responsive dashboards using React, HTML, CSS, and JavaScript within the Cursor development environment to visualize and receiving real-time data collection from the pillbox. We also integrated our portals with two other teams sponsored by the T-Mobile CareLink+ project, allowing both patients and doctors to sign in through one unified platform.

#### Key features include:
##### Daily Pill Intake Tracking:
- Displays pill status by time and compartment using a simple, color-coded calendar view.
##### Weekly Adherence Summaries:
- Visualizes weekly medication patterns using backend-generated data and intuitive charts.
##### Blood Pressure Summary:
- Provides a quick overview of the patient’s recent blood pressure readings for contextual health insights.
##### Medication Adherence Reminders:
- Automatically sends reminders to patients based on missed doses or irregular intake patterns.
##### Doctor-to-Patient Messaging:
- Allows doctors to send personalized notes or feedback directly to patients, which can be reviewed in their individual portal.


## Hardware -> Firebase
For hardware, ensure you connect the two components from Milestone 2 so that the LDR component is connected to the button as well. Additionally, power the two components with a shared 3.7 / 2000 mAh battery and switch. To get this running with Firebase:
#### Server Side Steps
1. Go to your Firebase, and download the credentials.
2. Navigate to `server` folder from terminal.
3. Add the credentials JSON file to the `server` folder.
4. Make sure you are replacing the file path for the credentials in the `flask_server.py` code.
5. Set up a virtual environment with the following sequence (note - please ensure python 3.10 has been installed - this is necessary for some packages required)
   ```terminal
   rm -rf venv
   python3.10 -m venv venv
   source venv/bin/activate
   pip install --no-deps --no-cache-dir -r requirements.txt
   ```
6. Run `flask_server.py`
7. Turn on the switch and open the lid when the red light turns on!
