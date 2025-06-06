# KneeHeal - ACL Rehabilitation Application

KneeHeal is an innovative IoT-enabled ACL rehabilitation system developed as part of the T-Mobile Carelink Projects by GIX Cohort 8. This project uses MPU sensors and machine learning to track knee flexion angles during rehabilitation exercises, providing real-time feedback to patients and healthcare providers.

## Project Overview

This system combines hardware sensors with a React-based web application and Firebase backend to create a comprehensive rehabilitation monitoring solution. The application provides:

- Real-time knee flexion angle monitoring using dual MPU sensors
- Machine learning-based angle prediction and analysis
- Patient dashboard with exercise tracking and progress visualization
- Doctor interface for monitoring patient progress
- Firebase integration for real-time data synchronization

## Features

- **Sensor Integration**: Dual MPU6050 sensors for comprehensive movement tracking
- **Real-time Analytics**: Live monitoring of knee flexion angles during exercises
- **Progress Tracking**: Historical data visualization and progress reports
- **User Management**: Separate interfaces for patients and healthcare providers
- **Cloud Sync**: Firebase real-time database integration
- **ML Predictions**: Machine learning model for accurate angle prediction

## Technology Stack

- **Frontend**: React.js with modern UI components
- **Backend**: Firebase Realtime Database
- **Machine Learning**: Python with scikit-learn (joblib)
- **Hardware**: MPU6050 sensors with Arduino/ESP32
- **Styling**: CSS with responsive design
- **Charts**: Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- Firebase account and project setup
- Arduino IDE (for hardware setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/marjyang/T-Mobile-Carelink-515-Projects.git
   cd T-Mobile-Carelink-515-Projects/KneeHeal
   ```

2. **Install dependencies**
   ```bash
   npm install
   pip install -r requirements.txt
   ```

3. **Firebase Setup**
   - Create a Firebase project
   - Enable Realtime Database
   - Download the service account key and save as `serviceAccountKey.json`
   - Update Firebase configuration in `src/firebase.js`

4. **Start the applications**
   ```bash
   # Start React development server
   npm start
   
   # In a separate terminal, start the ML prediction service
   python firebase_read_predict.py
   ```

### Hardware Setup

1. Connect dual MPU6050 sensors to your microcontroller
2. Upload the sensor reading code to collect accelerometer and gyroscope data
3. Configure the sensors to send data to Firebase in the expected format

## Usage

1. **Patient Interface**: Access the main dashboard to view real-time knee angle data and exercise progress
2. **Doctor Interface**: Monitor multiple patients and review rehabilitation progress
3. **Data Collection**: The system automatically collects sensor data and provides ML-based angle predictions

## Project Structure

```
KneeHeal/
├── src/
│   ├── ACLRehabilitationApp.js    # Main patient dashboard
│   ├── DoctorPage.jsx             # Healthcare provider interface
│   ├── SignInPage.jsx             # Authentication and user management
│   ├── firebase.js                # Firebase configuration
│   └── ...
├── firebase_read_predict.py       # ML prediction service
├── mpu_angle_model.pkl           # Trained ML model
├── requirements.txt              # Python dependencies
└── package.json                  # Node.js dependencies
```

## Machine Learning Model

The system uses a trained scikit-learn model (`mpu_angle_model.pkl`) that:
- Takes 12-dimensional input (accelerometer + gyroscope data from 2 sensors)
- Predicts knee flexion angles with high accuracy
- Provides real-time feedback and exercise suggestions

## Demo

Visit the integrated demo at: [https://adorable-brigadeiros-c2240e.netlify.app/](https://adorable-brigadeiros-c2240e.netlify.app/)

## Contributors

- **Kelly Peng** - Project Lead & Full-Stack Development
- **Diana Ding** - Hardware Integration & Sensor Setup
- **Yourong Xu** - Machine Learning & Data Analysis
- **Jialu Huang** - Frontend Development & UI/UX

## Advisors

- **Candice Boyd** - T-Mobile
- **Justin Ho** - T-Mobile  
- **Quasheery Ahmed** - T-Mobile
- **John Raiti** - GIX
- **Luyao Niu** - GIX

## Part of T-Mobile Carelink Projects

This project is part of the larger T-Mobile Carelink initiative, which includes:
1. **KneeHeal** (this project) - ACL rehabilitation monitoring
2. **Carelink Hypertension IoT Pill Box** - Medication adherence tracking
3. **X** - Additional healthcare monitoring solution

For more information about the complete Carelink project collection, visit: [T-Mobile Carelink Projects Repository](https://github.com/marjyang/T-Mobile-Carelink-515-Projects)

## License

This project was developed as part of TECHIN 515 (Hardware Software Lab II) at the Global Innovation Exchange (GIX), University of Washington.

## Contact

For inquiries about this project, please contact the contributors or reach out to marjyang@uw.edu
