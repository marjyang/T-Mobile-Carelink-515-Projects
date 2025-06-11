#include <Wire.h>
#include <Adafruit_VL53L0X.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// -----------------------------
// GPIO Pin Definitions
// -----------------------------
#define RED_LED_PIN     44
#define GREEN_LED_PIN   7
#define BLUE_LED_PIN    8

// -----------------------------
// VL53L0X Setup
// -----------------------------
Adafruit_VL53L0X lox = Adafruit_VL53L0X();

int baseline = 0;
int lift = 0;
const int interval = 200;  // Sampling interval in ms

#define FILTER_SIZE 5
int distanceBuffer[FILTER_SIZE];
int bufferIndex = 0;

// -----------------------------
// BLE Setup
// -----------------------------
#define SERVICE_UUID_B        "12345678-1234-5678-1234-56789abcdef0"
#define LIFT_CHAR_UUID_B      "abcdefab-cdef-1234-5678-abcdefabcdef"

BLECharacteristic *liftCharacteristic;
bool deviceConnected = false;
unsigned long startupTime;
bool redShown = false;  // 标志位防止反复设置红灯

// -----------------------------
// LED 控制函数
// -----------------------------
void setLEDState(bool red, bool green, bool blue) {
  digitalWrite(RED_LED_PIN, red ? HIGH : LOW);
  digitalWrite(GREEN_LED_PIN, green ? HIGH : LOW);
  digitalWrite(BLUE_LED_PIN, blue ? HIGH : LOW);
}

// -----------------------------
// BLE 连接回调
// -----------------------------
class MyServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
    Serial.println("✅ Device B connected!");
    setLEDState(false, false, true);  // 蓝灯亮
    redShown = false;                 // 清除红灯标记
  }

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
    Serial.println("❌ Device B disconnected, waiting for reconnect...");
    BLEDevice::startAdvertising();
    startupTime = millis();          // 重置连接计时
    setLEDState(false, true, false); // 回到绿灯
    redShown = false;
  }
};

// -----------------------------
// Setup
// -----------------------------
void setup() {
  // 提前亮灯
  pinMode(RED_LED_PIN, OUTPUT);
  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(BLUE_LED_PIN, OUTPUT);
  setLEDState(false, true, false); // 上电默认绿灯

  delay(10);  // 稳定信号
  startupTime = millis();

  Serial.begin(115200);
  Wire.begin();

  // 初始化 VL53L0X
  if (!lox.begin()) {
    Serial.println("❌ Failed to initialize VL53L0X! Check wiring.");
    while (1);
  }
  Serial.println("✅ VL53L0X Initialized.");
  delay(500);

  baseline = calibrateBaseline(50);
  Serial.print("📏 Calibrated baseline: ");
  Serial.print(baseline);
  Serial.println(" mm");

  // 初始化 BLE
  BLEDevice::init("DeviceB");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID_B);
  liftCharacteristic = pService->createCharacteristic(
                          LIFT_CHAR_UUID_B,
                          BLECharacteristic::PROPERTY_NOTIFY
                      );
  liftCharacteristic->addDescriptor(new BLE2902());

  pService->start();
  BLEDevice::startAdvertising();
  Serial.println("🔗 BLE advertising started, waiting for device B...");
}

// -----------------------------
// Loop
// -----------------------------
void loop() {
  unsigned long now = millis();

  // 超过15秒未连接 → 红灯亮
  if (!deviceConnected && (now - startupTime > 15000) && !redShown) {
    setLEDState(true, false, false); // 红灯亮
    redShown = true;
  }

  int rawDistance = readDistance();
  int filteredDistance = getFilteredDistance(rawDistance);
  lift = filteredDistance - baseline;

  String liftString = String(lift / 10.0, 1);  
  Serial.print("Sending cm value: ");
  Serial.println(liftString);

  if (deviceConnected) {
    liftCharacteristic->setValue(liftString.c_str());
    liftCharacteristic->notify();
  }

  delay(interval);
}

// -----------------------------
// Read Distance
// -----------------------------
int readDistance() {
  VL53L0X_RangingMeasurementData_t measure;
  lox.rangingTest(&measure, false);
  if (measure.RangeStatus != 4) {
    return measure.RangeMilliMeter;
  } else {
    return -1;
  }
}

// -----------------------------
// Moving Average Filter
// -----------------------------
int getFilteredDistance(int newValue) {
  distanceBuffer[bufferIndex] = newValue;
  bufferIndex = (bufferIndex + 1) % FILTER_SIZE;

  int sum = 0, valid = 0;
  for (int i = 0; i < FILTER_SIZE; i++) {
    if (distanceBuffer[i] != -1) {
      sum += distanceBuffer[i];
      valid++;
    }
  }
  return (valid > 0) ? sum / valid : baseline;
}

// -----------------------------
// Calibrate Baseline
// -----------------------------
int calibrateBaseline(int count) {
  int total = 0, valid = 0;
  for (int i = 0; i < count; i++) {
    int d = readDistance();
    if (d != -1) {
      total += d;
      valid++;
    }
    delay(30);
  }
  return (valid > 0) ? total / valid : 0;
}