# KneeHeal Setup Guide

This guide provides detailed instructions for setting up the KneeHeal ACL rehabilitation monitoring system.

## Hardware Requirements

### Sensors
- 2x MPU6050 accelerometer/gyroscope sensors
- Arduino Uno/ESP32 microcontroller
- Breadboard and jumper wires
- Power supply (battery pack or USB)
- Mounting straps/velcro for sensor attachment

### Connections
```
MPU6050 Sensor 1:
- VCC → 3.3V
- GND → Ground  
- SCL → A5 (Arduino) / GPIO22 (ESP32)
- SDA → A4 (Arduino) / GPIO21 (ESP32)
- AD0 → Ground (Address 0x68)

MPU6050 Sensor 2:
- VCC → 3.3V
- GND → Ground
- SCL → A5 (Arduino) / GPIO22 (ESP32) 
- SDA → A4 (Arduino) / GPIO21 (ESP32)
- AD0 → 3.3V (Address 0x69)
```

## Software Setup

### 1. Prerequisites Installation

**Node.js & npm:**
```bash
# Install Node.js (v14 or higher)
# Download from https://nodejs.org/
node --version
npm --version
```

**Python:**
```bash
# Install Python 3.8+
python --version
pip --version
```

**Arduino IDE:**
- Download from https://www.arduino.cc/en/software
- Install MPU6050 libraries

### 2. Project Setup

**Clone Repository:**
```bash
git clone https://github.com/marjyang/T-Mobile-Carelink-515-Projects.git
cd T-Mobile-Carelink-515-Projects/KneeHeal
```

**Install Dependencies:**
```bash
# Node.js dependencies
npm install

# Python dependencies  
pip install -r requirements.txt

# Or using virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Firebase Configuration

**Create Firebase Project:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "kneeheal-[yourname]"
3. Enable Realtime Database
4. Set database rules to allow read/write for testing:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**Generate Service Account Key:**
1. Project Settings → Service Accounts
2. Generate new private key
3. Download JSON file
4. Rename to `serviceAccountKey.json`
5. Place in project root directory

**Update Firebase Config:**
Edit `src/firebase.js` with your Firebase project details:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com/",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 4. Arduino Code Setup

**Install Required Libraries:**
1. Open Arduino IDE
2. Install libraries via Library Manager:
   - MPU6050 by Electronic Cats
   - Wire (built-in)
   - WiFi (for ESP32) or Ethernet (for Arduino)

**Upload Sensor Code:**
```cpp
// Basic sensor reading code structure
#include <MPU6050.h>
#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>

// Initialize sensors with different addresses
MPU6050 mpu1(0x68);
MPU6050 mpu2(0x69);

void setup() {
  // Initialize I2C communication
  Wire.begin();
  
  // Initialize sensors
  mpu1.initialize();
  mpu2.initialize();
  
  // WiFi connection setup
  WiFi.begin("your-wifi-ssid", "your-wifi-password");
}

void loop() {
  // Read sensor data
  // Send to Firebase
  // Delay between readings
}
```

## Running the Application

### 1. Start React Development Server
```bash
npm start
```
- Application runs on http://localhost:3000
- Auto-reloads on code changes

### 2. Start ML Prediction Service
```bash
# In a separate terminal
python firebase_read_predict.py
```
- Monitors Firebase for new sensor data
- Runs ML predictions on incoming data
- Updates Firebase with angle predictions

### 3. Hardware Data Collection
- Power on Arduino/ESP32 with sensors
- Attach sensors to patient's leg (one above knee, one below)
- Sensors will automatically start sending data to Firebase

## Testing Setup

### Verify Firebase Connection
1. Check Firebase Realtime Database console
2. Look for data under `/user_001/data/`
3. Verify sensor readings are being stored

### Test ML Predictions
1. Monitor console output from `firebase_read_predict.py`
2. Check for successful angle predictions
3. Verify suggestions are being generated

### Test React Application
1. Open http://localhost:3000
2. Navigate between patient and doctor views
3. Verify real-time data updates
4. Check charts and visualizations

## Troubleshooting

### Common Issues

**Firebase Connection:**
- Check serviceAccountKey.json file path
- Verify Firebase project settings
- Ensure database rules allow access

**Sensor Issues:**
- Check I2C connections
- Verify different addresses for dual sensors
- Test sensors individually first

**ML Model:**
- Ensure `mpu_angle_model.pkl` exists
- Check Python dependencies
- Verify data format matches training data

**React App:**
- Clear browser cache
- Check console for JavaScript errors
- Verify Firebase config in frontend

### Getting Help

For technical issues:
1. Check project README
2. Review console logs and error messages
3. Contact project contributors
4. Submit issues on GitHub repository

## Data Format

Expected Firebase data structure:
```json
{
  "user_001": {
    "data": {
      "1": {
        "timestamp": 1640995200000,
        "mpu1": {
          "acc_x": 0.12,
          "acc_y": 0.45,
          "acc_z": 9.81,
          "gyro_x": 0.01,
          "gyro_y": 0.02,
          "gyro_z": 0.03
        },
        "mpu2": {
          "acc_x": 0.15,
          "acc_y": 0.38,
          "acc_z": 9.78,
          "gyro_x": 0.02,
          "gyro_y": 0.01,
          "gyro_z": 0.04
        }
      }
    }
  }
}
```

After ML processing, data includes:
```json
{
  "flexionAngle": 45.2,
  "suggestions": ["Great range of motion! Keep it up."]
}
``` 