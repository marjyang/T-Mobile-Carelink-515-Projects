// #include <Wire.h>
// #include <Adafruit_Sensor.h>
// #include <Adafruit_MPU6050.h>
// #include <WiFi.h>
// #include <Firebase_ESP_Client.h>

// // ======== WiFi & Firebase Configuration ========
// #define WIFI_SSID "UW MPSK"
// #define WIFI_PASSWORD "HvipCY(9sK"
// #define API_KEY "AIzaSyBGKFS6W04apJF_TChrOJpcswZTReHsbV8"
// #define DATABASE_URL "https://kneeheal-320a8-default-rtdb.firebaseio.com/"

// // Firebase setup
// FirebaseData fbdo;
// FirebaseAuth auth;
// FirebaseConfig config;

// // MPU6050 instances
// Adafruit_MPU6050 mpu1;  // I2C 0x68
// Adafruit_MPU6050 mpu2;  // I2C 0x69

// // Calibration offsets
// float acc_offset1[3], gyro_offset1[3];
// float acc_offset2[3], gyro_offset2[3];

// void calibrateMPU(Adafruit_MPU6050 &mpu, float *acc_offset, float *gyro_offset, String label) {
//   const int samples = 100;
//   float sum_acc[3] = {0}, sum_gyro[3] = {0};

//   Serial.println("Calibrating " + label + "... Please keep the device still.");

//   for (int i = 0; i < samples; i++) {
//     sensors_event_t a, g, t;
//     mpu.getEvent(&a, &g, &t);
//     sum_acc[0] += a.acceleration.x;
//     sum_acc[1] += a.acceleration.y;
//     sum_acc[2] += a.acceleration.z - 9.81; // remove gravity
//     sum_gyro[0] += g.gyro.x;
//     sum_gyro[1] += g.gyro.y;
//     sum_gyro[2] += g.gyro.z;
//     delay(50);
//   }

//   for (int i = 0; i < 3; i++) {
//     acc_offset[i] = sum_acc[i] / samples;
//     gyro_offset[i] = sum_gyro[i] / samples;
//   }

//   Serial.println(label + " calibration done.");
// }

// void setup() {
//   Serial.begin(115200);
//   delay(3000);

//   Wire.begin();
//   delay(100);

//   if (!mpu1.begin(0x68)) {
//     Serial.println("Failed to initialize MPU6050-1!");
//     while (1);
//   }
//   delay(100);

//   if (!mpu2.begin(0x69)) {
//     Serial.println("Failed to initialize MPU6050-2!");
//     while (1);
//   }
//   Serial.println("Both MPU6050 sensors initialized successfully");

//   WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
//   Serial.print("Connecting to WiFi");
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println("\nWiFi connected");

//   config.api_key = API_KEY;
//   config.database_url = DATABASE_URL;
//   Firebase.begin(&config, &auth);
//   Firebase.reconnectWiFi(true);

//   if (Firebase.signUp(&config, &auth, "", "")) {
//     Serial.println("Anonymous sign-in successful");
//   } else {
//     Serial.printf("Anonymous sign-in failed: %s\n", config.signer.signupError.message.c_str());
//   }

//   Serial.println("Firebase initialized");

//   // ====== Calibration Step ======
//   calibrateMPU(mpu1, acc_offset1, gyro_offset1, "MPU1");
//   calibrateMPU(mpu2, acc_offset2, gyro_offset2, "MPU2");
// }

// void loop() {
//   sensors_event_t a1, g1, t1;
//   sensors_event_t a2, g2, t2;

//   mpu1.getEvent(&a1, &g1, &t1);
//   mpu2.getEvent(&a2, &g2, &t2);

//   // Apply calibration offsets
//   float acc1_x = a1.acceleration.x - acc_offset1[0];
//   float acc1_y = a1.acceleration.y - acc_offset1[1];
//   float acc1_z = a1.acceleration.z - acc_offset1[2];

//   float gyro1_x = g1.gyro.x - gyro_offset1[0];
//   float gyro1_y = g1.gyro.y - gyro_offset1[1];
//   float gyro1_z = g1.gyro.z - gyro_offset1[2];

//   float acc2_x = a2.acceleration.x - acc_offset2[0];
//   float acc2_y = a2.acceleration.y - acc_offset2[1];
//   float acc2_z = a2.acceleration.z - acc_offset2[2];

//   float gyro2_x = g2.gyro.x - gyro_offset2[0];
//   float gyro2_y = g2.gyro.y - gyro_offset2[1];
//   float gyro2_z = g2.gyro.z - gyro_offset2[2];

//   String userID = "user_001";
//   unsigned long timestamp = millis();
//   String basePath = "/" + userID + "/data/" + String(timestamp);
//   String path1 = basePath + "/mpu1";
//   String path2 = basePath + "/mpu2";

//   Serial.println("Upload path: " + basePath);

//   // Upload calibrated MPU1 data
//   Firebase.RTDB.setFloat(&fbdo, path1 + "/acc_x", acc1_x);
//   Firebase.RTDB.setFloat(&fbdo, path1 + "/acc_y", acc1_y);
//   Firebase.RTDB.setFloat(&fbdo, path1 + "/acc_z", acc1_z);
//   Firebase.RTDB.setFloat(&fbdo, path1 + "/gyro_x", gyro1_x);
//   Firebase.RTDB.setFloat(&fbdo, path1 + "/gyro_y", gyro1_y);
//   Firebase.RTDB.setFloat(&fbdo, path1 + "/gyro_z", gyro1_z);

//   // Upload calibrated MPU2 data
//   Firebase.RTDB.setFloat(&fbdo, path2 + "/acc_x", acc2_x);
//   Firebase.RTDB.setFloat(&fbdo, path2 + "/acc_y", acc2_y);
//   Firebase.RTDB.setFloat(&fbdo, path2 + "/acc_z", acc2_z);
//   Firebase.RTDB.setFloat(&fbdo, path2 + "/gyro_x", gyro2_x);
//   Firebase.RTDB.setFloat(&fbdo, path2 + "/gyro_y", gyro2_y);
//   Firebase.RTDB.setFloat(&fbdo, path2 + "/gyro_z", gyro2_z);

//   Serial.println("Upload completed ✅\n");

//   delay(2000);  // 每 5 秒采样一次
// }



// Complete Instructions to Get and Change ESP MAC Address: https://RandomNerdTutorials.com/get-change-esp32-esp8266-mac-address-arduino/
// #include <Arduino.h>
// #include <WiFi.h>

// void setup(){
//   Serial.begin(115200);
//   while(!Serial);
//   delay(1000);
//   WiFi.begin();
//   Serial.println();
//   Serial.print("ESP Board MAC Address:  ");
//   Serial.println(WiFi.macAddress());
// }
 
// void loop(){
// 	Serial.println(WiFi.macAddress());
// 	delay(1000);
// }


// #include <Wire.h>
// #include <Adafruit_Sensor.h>
// #include <Adafruit_MPU6050.h>
// #include <WiFi.h>
// #include <Firebase_ESP_Client.h>

// // ======== WiFi & Firebase Configuration ========
// #define WIFI_SSID "UW MPSK"
// #define WIFI_PASSWORD "HvipCY(9sK"
// #define API_KEY "AIzaSyBGKFS6W04apJF_TChrOJpcswZTReHsbV8"
// #define DATABASE_URL "https://kneeheal-320a8-default-rtdb.firebaseio.com/"

// // Firebase setup
// FirebaseData fbdo;
// FirebaseAuth auth;
// FirebaseConfig config;

// // MPU6050 instances
// Adafruit_MPU6050 mpu1;  // I2C 0x68
// Adafruit_MPU6050 mpu2;  // I2C 0x69

// // Calibration offsets
// float acc_offset1[3], gyro_offset1[3];
// float acc_offset2[3], gyro_offset2[3];

// void calibrateMPU(Adafruit_MPU6050 &mpu, float *acc_offset, float *gyro_offset, String label) {
//   const int samples = 100;
//   float sum_acc[3] = {0}, sum_gyro[3] = {0};

//   Serial.println("Calibrating " + label + "... Please keep the device still.");

//   for (int i = 0; i < samples; i++) {
//     sensors_event_t a, g, t;
//     mpu.getEvent(&a, &g, &t);
//     sum_acc[0] += a.acceleration.x;
//     sum_acc[1] += a.acceleration.y;
//     sum_acc[2] += a.acceleration.z - 9.81; // remove gravity
//     sum_gyro[0] += g.gyro.x;
//     sum_gyro[1] += g.gyro.y;
//     sum_gyro[2] += g.gyro.z;
//     delay(50);
//   }

//   for (int i = 0; i < 3; i++) {
//     acc_offset[i] = sum_acc[i] / samples;
//     gyro_offset[i] = sum_gyro[i] / samples;
//   }

//   Serial.println(label + " calibration done.");
// }

// void setup() {
//   Serial.begin(115200);
//   delay(3000);

//   Wire.begin();
//   delay(100);

//   if (!mpu1.begin(0x68)) {
//     Serial.println("Failed to initialize MPU6050-1!");
//     while (1);
//   }

//   delay(100);

//   if (!mpu2.begin(0x69)) {
//     Serial.println("Failed to initialize MPU6050-2!");
//     while (1);
//   }

//   Serial.println("Both MPU6050 sensors initialized successfully");

//   WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
//   Serial.print("Connecting to WiFi");
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println("\nWiFi connected");

//   config.api_key = API_KEY;
//   config.database_url = DATABASE_URL;
//   Firebase.begin(&config, &auth);
//   Firebase.reconnectWiFi(true);

//   if (Firebase.signUp(&config, &auth, "", "")) {
//     Serial.println("Anonymous sign-in successful");
//   } else {
//     Serial.printf("Anonymous sign-in failed: %s\n", config.signer.signupError.message.c_str());
//   }

//   Serial.println("Firebase initialized");

//   // ====== Calibration Step ======
//   calibrateMPU(mpu1, acc_offset1, gyro_offset1, "MPU1");
//   calibrateMPU(mpu2, acc_offset2, gyro_offset2, "MPU2");
// }

// void loop() {
//   sensors_event_t a1, g1, t1;
//   sensors_event_t a2, g2, t2;

//   mpu1.getEvent(&a1, &g1, &t1);
//   mpu2.getEvent(&a2, &g2, &t2);

//   float acc1_x = a1.acceleration.x - acc_offset1[0];
//   float acc1_y = a1.acceleration.y - acc_offset1[1];
//   float acc1_z = a1.acceleration.z - acc_offset1[2];

//   float gyro1_x = g1.gyro.x - gyro_offset1[0];
//   float gyro1_y = g1.gyro.y - gyro_offset1[1];
//   float gyro1_z = g1.gyro.z - gyro_offset1[2];

//   float acc2_x = a2.acceleration.x - acc_offset2[0];
//   float acc2_y = a2.acceleration.y - acc_offset2[1];
//   float acc2_z = a2.acceleration.z - acc_offset2[2];

//   float gyro2_x = g2.gyro.x - gyro_offset2[0];
//   float gyro2_y = g2.gyro.y - gyro_offset2[1];
//   float gyro2_z = g2.gyro.z - gyro_offset2[2];

//   String userID = "user_001";
//   unsigned long timestamp = millis();
//   String basePath = "/" + userID + "/data/" + String(timestamp);
//   String path1 = basePath + "/mpu1";
//   String path2 = basePath + "/mpu2";

//   Serial.println("Upload path: " + basePath);

//   // ====== Upload with error checking ======
//   bool success = true;

//   success &= Firebase.RTDB.setFloat(&fbdo, path1 + "/acc_x", acc1_x);
//   success &= Firebase.RTDB.setFloat(&fbdo, path1 + "/acc_y", acc1_y);
//   success &= Firebase.RTDB.setFloat(&fbdo, path1 + "/acc_z", acc1_z);
//   success &= Firebase.RTDB.setFloat(&fbdo, path1 + "/gyro_x", gyro1_x);
//   success &= Firebase.RTDB.setFloat(&fbdo, path1 + "/gyro_y", gyro1_y);
//   success &= Firebase.RTDB.setFloat(&fbdo, path1 + "/gyro_z", gyro1_z);

//   success &= Firebase.RTDB.setFloat(&fbdo, path2 + "/acc_x", acc2_x);
//   success &= Firebase.RTDB.setFloat(&fbdo, path2 + "/acc_y", acc2_y);
//   success &= Firebase.RTDB.setFloat(&fbdo, path2 + "/acc_z", acc2_z);
//   success &= Firebase.RTDB.setFloat(&fbdo, path2 + "/gyro_x", gyro2_x);
//   success &= Firebase.RTDB.setFloat(&fbdo, path2 + "/gyro_y", gyro2_y);
//   success &= Firebase.RTDB.setFloat(&fbdo, path2 + "/gyro_z", gyro2_z);

//   if (success) {
//     Serial.println("Upload completed ✅\n");
//   } else {
//     Serial.print("Upload failed ❌: ");
//     Serial.println(fbdo.errorReason());
//   }

//   delay(2000);  // 2-second interval
// }

#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_MPU6050.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>

// ✅ 修改为你的热点信息
#define WIFI_SSID "MyESP32Hotspot"
#define WIFI_PASSWORD "dingyuqiao"

#define API_KEY "AIzaSyBGKFS6W04apJF_TChrOJpcswZTReHsbV8"
#define DATABASE_URL "https://kneeheal-320a8-default-rtdb.firebaseio.com/"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

Adafruit_MPU6050 mpu1;  // 0x68
Adafruit_MPU6050 mpu2;  // 0x69

float acc_offset1[3], gyro_offset1[3];
float acc_offset2[3], gyro_offset2[3];

void calibrateMPU(Adafruit_MPU6050 &mpu, float *acc_offset, float *gyro_offset, String label) {
  const int samples = 100;
  float sum_acc[3] = {0}, sum_gyro[3] = {0};

  Serial.println("Calibrating " + label + "... Please keep the device still.");
  for (int i = 0; i < samples; i++) {
    sensors_event_t a, g, t;
    mpu.getEvent(&a, &g, &t);
    sum_acc[0] += a.acceleration.x;
    sum_acc[1] += a.acceleration.y;
    sum_acc[2] += a.acceleration.z - 9.81;
    sum_gyro[0] += g.gyro.x;
    sum_gyro[1] += g.gyro.y;
    sum_gyro[2] += g.gyro.z;
    delay(50);
  }

  for (int i = 0; i < 3; i++) {
    acc_offset[i] = sum_acc[i] / samples;
    gyro_offset[i] = sum_gyro[i] / samples;
  }

  Serial.println(label + " calibration done.");
}

void setup() {
  Serial.begin(115200);
  delay(3000);

  Wire.begin();
  delay(100);

  if (!mpu1.begin(0x68)) {
    Serial.println("Failed to initialize MPU6050-1!");
    while (1);
  }
  delay(100);
  if (!mpu2.begin(0x69)) {
    Serial.println("Failed to initialize MPU6050-2!");
    while (1);
  }
  Serial.println("Both MPU6050 sensors initialized successfully");

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ WiFi connected");

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("✅ Anonymous sign-in successful");
  } else {
    Serial.printf("❌ Sign-in failed: %s\n", config.signer.signupError.message.c_str());
  }

  Serial.println("Firebase initialized");

  calibrateMPU(mpu1, acc_offset1, gyro_offset1, "MPU1");
  calibrateMPU(mpu2, acc_offset2, gyro_offset2, "MPU2");
}

void loop() {
  sensors_event_t a1, g1, t1;
  sensors_event_t a2, g2, t2;

  mpu1.getEvent(&a1, &g1, &t1);
  mpu2.getEvent(&a2, &g2, &t2);

  float acc1_x = a1.acceleration.x - acc_offset1[0];
  float acc1_y = a1.acceleration.y - acc_offset1[1];
  float acc1_z = a1.acceleration.z - acc_offset1[2];

  float gyro1_x = g1.gyro.x - gyro_offset1[0];
  float gyro1_y = g1.gyro.y - gyro_offset1[1];
  float gyro1_z = g1.gyro.z - gyro_offset1[2];

  float acc2_x = a2.acceleration.x - acc_offset2[0];
  float acc2_y = a2.acceleration.y - acc_offset2[1];
  float acc2_z = a2.acceleration.z - acc_offset2[2];

  float gyro2_x = g2.gyro.x - gyro_offset2[0];
  float gyro2_y = g2.gyro.y - gyro_offset2[1];
  float gyro2_z = g2.gyro.z - gyro_offset2[2];

  String userID = "user_001";
  unsigned long timestamp = millis();
  String basePath = "/" + userID + "/data/" + String(timestamp);
  Serial.println("Upload path: " + basePath);

  FirebaseJson json;
  json.set("mpu1/acc_x", acc1_x);
  json.set("mpu1/acc_y", acc1_y);
  json.set("mpu1/acc_z", acc1_z);
  json.set("mpu1/gyro_x", gyro1_x);
  json.set("mpu1/gyro_y", gyro1_y);
  json.set("mpu1/gyro_z", gyro1_z);

  json.set("mpu2/acc_x", acc2_x);
  json.set("mpu2/acc_y", acc2_y);
  json.set("mpu2/acc_z", acc2_z);
  json.set("mpu2/gyro_x", gyro2_x);
  json.set("mpu2/gyro_y", gyro2_y);
  json.set("mpu2/gyro_z", gyro2_z);

  bool success = Firebase.RTDB.setJSON(&fbdo, basePath, &json);

  if (success) {
    Serial.println("✅ Upload completed");
  } else {
    Serial.print("❌ Upload failed: ");
    Serial.println(fbdo.errorReason());
  }

  delay(2000); // 每 2 秒上传一次
}
