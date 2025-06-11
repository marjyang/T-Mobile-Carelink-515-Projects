#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_ADS1X15.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#define SERVICE_UUID        "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
#define CHARACTERISTIC_UUID "6e400003-b5a3-f393-e0a9-e50e24dcca9e"

#define RED_PIN     3
#define GREEN_PIN   5
#define BLUE_PIN    4

Adafruit_ADS1115 ads;
BLECharacteristic *pCharacteristic;
BLEServer* pServer;

#define ANGLE_INPUT_CHANNEL 0
#define SAMPLE_COUNT 10
float voltageBuffer[SAMPLE_COUNT];
int sampleIndex = 0;
unsigned long lastSampleTime = 0;
unsigned long lastUploadTime = 0;
float previousSmoothedVoltage = 0;

bool isConnected = false;
unsigned long startTime = 0;

void updateLED() {
  if (isConnected) {
    digitalWrite(RED_PIN, LOW);
    digitalWrite(GREEN_PIN, LOW);
    digitalWrite(BLUE_PIN, HIGH);  
  } else {
    unsigned long now = millis();
    if (now - startTime >= 15000) {
      digitalWrite(RED_PIN, HIGH);   
      digitalWrite(GREEN_PIN, LOW);
      digitalWrite(BLUE_PIN, LOW);
    } else {
      digitalWrite(RED_PIN, LOW);
      digitalWrite(GREEN_PIN, HIGH); 
      digitalWrite(BLUE_PIN, LOW);
    }
  }
}

// BLE 连接状态回调
class MyServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    isConnected = true;
    updateLED();
  }

  void onDisconnect(BLEServer* pServer) {
    isConnected = false;
    startTime = millis();
    updateLED();
  }
};

void setup() {
  Serial.begin(115200);
  Wire.begin(6, 7);

  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);

  startTime = millis();
  updateLED();

  if (!ads.begin()) {
    Serial.println("❌ ADS1115 initialized failed！");
    while (true);
  }
  ads.setGain(GAIN_TWOTHIRDS);
  Serial.println("✅ ADS1115 initialized successfully");

  
  BLEDevice::init("DeviceA_Angle");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
  );
  pCharacteristic->addDescriptor(new BLE2902());
  pService->start();
  BLEDevice::startAdvertising();
  Serial.println("BLE device started, advertising...");
}

void loop() {
  unsigned long now = millis();

  if (!isConnected) {
    updateLED();  
  }

  // 每 25ms 采样
  if (now - lastSampleTime >= 25 && sampleIndex < SAMPLE_COUNT) {
    lastSampleTime = now;
    int16_t raw = ads.readADC_SingleEnded(ANGLE_INPUT_CHANNEL);
    float voltage = raw * 0.1875 / 1000.0;
    voltageBuffer[sampleIndex++] = voltage;
  }


  if (sampleIndex >= SAMPLE_COUNT && now - lastUploadTime >= 250) {
    lastUploadTime = now;

    float sumVoltage = 0;
    for (int i = 0; i < SAMPLE_COUNT; i++) sumVoltage += voltageBuffer[i];
    float avgVoltage = sumVoltage / SAMPLE_COUNT;

    float smoothedVoltage = previousSmoothedVoltage * 0.2 + avgVoltage * 0.8;
    previousSmoothedVoltage = smoothedVoltage;

    float angle = smoothedVoltage * 360.0 / 5.0;
    angle = constrain(angle, 0, 360);

    int angleInt = round(angle);
    int adjustedAngle = 180 - angleInt;
    adjustedAngle = max(0, adjustedAngle);

    char buf[8];
    sprintf(buf, "%d", adjustedAngle);
    pCharacteristic->setValue((uint8_t*)buf, strlen(buf));
    pCharacteristic->notify();

    Serial.print("📤 BLE Adjusted Angle (180 - angle): ");
    Serial.println(adjustedAngle);

    sampleIndex = 0;
  }
}