# KneeHeal - ACL Rehabilitation Monitoring System

**Innovative IoT Healthcare Solution for ACL Rehabilitation**

KneeHeal is an advanced ACL rehabilitation monitoring system that uses dual MPU6050 sensors and machine learning to track knee flexion angles during physical therapy exercises. This project is part of T-Mobile's remote healthcare data collection system initiative.

> **ℹ️ For detailed setup instructions, please see [SETUP.md](./SETUP.md).**

## Key Features

- Real-time knee angle monitoring with dual sensors
- Machine learning prediction model for accurate angle calculation
- React-based patient and doctor dashboards
- Firebase real-time data synchronization
- Progress tracking and exercise recommendations

## Technology Stack

- **Frontend**: React.js
- **Backend**: Firebase
- **Machine Learning**: Python
- **Hardware**: MPU6050 sensors, Arduino/ESP32

## Quick Start Guide

```bash
# Install dependencies
npm install
pip install -r requirements.txt

# Start applications
npm start                          # React app (localhost:3000)
python firebase_read_predict.py    # ML prediction service
```

## Project Structure

```
kneeheal-project/
├── src/                     # React application
├── firebase_read_predict.py # ML prediction service
├── mpu_angle_model.pkl     # Trained ML model
├── SETUP.md               # Detailed setup guide
└── ...
```

## Technical Innovation

- **Dual Sensor Fusion**: Advanced MPU6050 sensor integration for accurate movement tracking
- **Real-time ML Predictions**: Edge computing for immediate feedback during exercises
- **Intuitive UI/UX**: Patient-friendly interfaces for rehabilitation guidance
- **Clinical Integration**: Healthcare provider dashboards for patient monitoring

## Team Members

- **Kelly Peng** - Project Lead & Full-Stack Development
- **Diana Ding** - Hardware Integration & Sensor Systems
- **Yourong Xu** - Machine Learning & Data Analytics
- **Jialu Huang** - Frontend Development & UI/UX Design

## Impact & Applications

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

## Contact & Support

For technical issues or questions:
1. Check the project documentation in `SETUP.md`
2. Contact project team members directly
3. Submit issues through GitHub Issues

## License & Attribution

This project was developed as part of TECHIN 515 coursework at the Global Innovation Exchange (GIX), University of Washington, in partnership with T-Mobile.

**Academic Year**: 2024-2025  
**Course**: TECHIN 515 - Hardware Software Lab II  
**Institution**: Global Innovation Exchange (GIX)  
**Industry Partner**: T-Mobile

---

**Star this repository if this healthcare IoT solution inspires your work!**
