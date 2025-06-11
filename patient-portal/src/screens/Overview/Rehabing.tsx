import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { HomeIcon, ClockIcon, UserCircleIcon, HelpCircleIcon } from "lucide-react";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Rehabing = (): JSX.Element => {
  // Navigation menu items data
  const navItems = [
    {
      icon: "/house-chimney-1-streamline-ultimate-regular.svg",
      label: "Overview",
      active: false,
    },
    {
      icon: "/medical-specialty-rehabilitation-streamline-ultimate-regular.svg",
      label: "Rehabing",
      active: true,
    },
    {
      icon: "/time-clock-file-1-streamline-ultimate-regular.svg",
      label: "Rehab Records",
      active: false,
    },
    {
      icon: "/single-neutral-circle-streamline-ultimate-regular.svg",
      label: "Profile",
      active: false,
    },
  ];

  // Additional app options
  const appOptions = [
    { label: "ACL Rehab Monitor", active: false },
    { label: "Hypertension Monitor", active: false },
  ];

  // 蓝牙连接状态
  const [statusA, setStatusA] = useState("IDLE");
  const [angle, setAngle] = useState("--");
  const [targetAngle, setTargetAngle] = useState("--");

  // 新增Device B相关状态
  const [statusB, setStatusB] = useState("IDLE");
  const [distance, setDistance] = useState("--");
  const [targetHeight, setTargetHeight] = useState("--");

  // 直接集成 connectDeviceA 逻辑
  const SERVICE_UUID_A = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  const CHARACTERISTIC_UUID_A = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

  // Device B的UUID
  const SERVICE_UUID_B = "12345678-1234-5678-1234-56789abcdef0";
  const CHARACTERISTIC_UUID_B = "abcdefab-cdef-1234-5678-abcdefabcdef";

  const connectDeviceA = async () => {
    try {
      setStatusA("Connecting...");
      let device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ namePrefix: "DeviceA" }],
        optionalServices: [SERVICE_UUID_A]
      });
      let server = await device.gatt.connect();
      let service = await server.getPrimaryService(SERVICE_UUID_A);
      let characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID_A);
      await characteristic.startNotifications();
      characteristic.addEventListener("characteristicvaluechanged", (event: any) => {
        const value = event.target.value;
        const angleValue = parseInt(new TextDecoder().decode(value));
        setAngle(isNaN(angleValue) ? "--" : angleValue.toString());
      });
      setStatusA("Connected to Device A");
    } catch (e: any) {
      setStatusA("Connection failed: " + e.message);
    }
  };

  // 连接Device B并写入distance
  const connectDeviceB = async () => {
    try {
      setStatusB("Connecting...");
      let device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ namePrefix: "DeviceB" }],
        optionalServices: [SERVICE_UUID_B]
      });
      let server = await device.gatt.connect();
      let service = await server.getPrimaryService(SERVICE_UUID_B);
      let characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID_B);
      await characteristic.startNotifications();
      characteristic.addEventListener("characteristicvaluechanged", (event: any) => {
        const value = event.target.value;
        const distanceValue = parseInt(new TextDecoder().decode(value));
        setDistance(isNaN(distanceValue) ? "--" : distanceValue.toString());
      });
      setStatusB("Connected to Device B");
    } catch (e: any) {
      setStatusB("Connection failed: " + e.message);
    }
  };

  const handleCheckReport = async () => {
    try {
      const reportsRef = collection(db, "patients", "5678", "reports");
      const q = query(reportsRef, orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latest = querySnapshot.docs[0].data();
        const hipFlexionTargetHeight = latest?.parameters?.hipFlexion?.targetHeight;
        setTargetHeight(
          hipFlexionTargetHeight !== undefined && hipFlexionTargetHeight !== null
            ? hipFlexionTargetHeight.toString()
            : "--"
        );
      } else {
        setTargetHeight("--");
      }
    } catch (err) {
      setTargetHeight("--");
      alert("Failed to fetch report");
    }
  };

  const pageOptions = [
    { label: "Exercise 1", path: "/rehabing" },
    { label: "Exercise 2", path: "/exercise2" },
    { label: "Exercise 3", path: "/exercise3" },
  ];
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const handleUploadData = async () => {
    window.alert("Exercise report uploaded successfully.");
  };

  const handleOpenExerciseReport = () => {
    // Implementation of handleOpenExerciseReport
  };

  // 计数相关state
  const [repCount, setRepCount] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [holdSeconds, setHoldSeconds] = useState(0);
  const holdTimerRef = useRef(null);
  const repPendingRef = useRef(false);
  const recentDiffsRef = useRef([]);

  // Hip Flexion计数核心逻辑
  useEffect(() => {
    // 只在Hip Flexion下计数
    // 角度区间判定
    const angleNum = parseFloat(angle);
    const distanceNum = parseFloat(distance);
    const targetHeightNum = parseFloat(targetHeight);
    const angleValid = angleNum >= 175 && angleNum <= 180;
    if (phase === "paused" || isNaN(angleNum) || isNaN(distanceNum) || isNaN(targetHeightNum)) return;
    // 收集最近5帧distance
    if (angleValid && distanceNum) {
      recentDiffsRef.current.push(distanceNum);
      if (recentDiffsRef.current.length > 5) recentDiffsRef.current.shift();
      const stable = recentDiffsRef.current.length === 5 && recentDiffsRef.current.every(val => val >= targetHeightNum * 0.85);
      if (stable && phase === "idle") {
        setPhase("holding");
        setHoldSeconds(0);
        if (!holdTimerRef.current) {
          holdTimerRef.current = setInterval(() => {
            setHoldSeconds(sec => sec + 0.1);
          }, 100);
        }
        repPendingRef.current = true;
      }
      if (phase === "holding" && holdSeconds >= 5) {
        setPhase("holdingDown");
      }
      if (phase === "holdingDown" && repPendingRef.current && distanceNum < 0.5) {
        setRepCount(prev => prev + 1);
        setPhase("idle");
        setHoldSeconds(0);
        if (holdTimerRef.current) { clearInterval(holdTimerRef.current); holdTimerRef.current = null; }
        repPendingRef.current = false;
        recentDiffsRef.current = [];
      }
    }
  }, [angle, distance, phase, holdSeconds, targetHeight]);

  // 组件卸载清理interval
  useEffect(() => () => { if (holdTimerRef.current) clearInterval(holdTimerRef.current); }, []);

  return (
    <div className="bg-[#fef5fa] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#fef5fa] w-full max-w-[1512px] relative flex">
        {/* Sidebar */}
        <div className="absolute w-[257px] h-[982px] top-0 left-0 bg-white rounded-[0px_20px_20px_0px] shadow-[6px_6px_10px_#c4c4c440]">
          <img
            className="absolute top-[60px] left-[54px] object-contain max-w-[180px] max-h-[60px]"
            alt="Group"
            src="/group-10527.png"
          />
          <div className="absolute w-44 h-10 top-[166px] left-10">
            <Button className="relative w-[174px] h-10 bg-[#ed008c] rounded-[100px] text-white">
              <span className="[font-family:'TeleNeo-Bold',Helvetica] font-bold text-xl">X-Heal</span>
            </Button>
          </div>
          <div className="absolute w-44 h-10 top-[686px] left-10">
            <Button variant="ghost" className="relative w-[174px] h-10 bg-[#a599a066] rounded-[100px] text-white">
              <span className="[font-family:'TeleNeo-Bold',Helvetica] font-bold text-base">ACL Rehab Monitor</span>
            </Button>
          </div>
          <div className="absolute w-44 h-10 top-[730px] left-10">
            <Button variant="ghost" className="relative w-[174px] h-10 bg-[#a599a066] rounded-[100px] text-white">
              <span className="[font-family:'TeleNeo-Bold',Helvetica] font-bold text-base">Hypertension Monitor</span>
            </Button>
          </div>
          <div className="absolute w-28 h-[21px] top-72 left-[47px] flex items-center">
            <div className="flex items-center p-0 bg-transparent text-[#ed008c] text-lg font-medium select-none" title="请通过首页按钮进入训练">
              <img className="w-[19px] h-[19px] mr-2" alt="Medical specialty" src="/medical-specialty-rehabilitation-streamline-ultimate-regular.svg" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]" style={{ marginLeft: 5 }}>Rehabing</span>
            </div>
          </div>
          <div className="absolute w-28 h-[21px] top-[243px] left-[47px] flex items-center cursor-pointer">
            <Button variant="ghost" className="flex items-center p-0 bg-transparent hover:bg-[#f3e6f0] text-[#a4989f] text-lg font-medium" onClick={() => window.location.href = '/'}>
              <HomeIcon className="w-[19px] h-[19px] mr-2 text-[#a4989f]" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]">Overview</span>
            </Button>
          </div>
          <div className="absolute w-[152px] h-[21px] top-[333px] left-[47px] flex items-center cursor-pointer">
            <Button variant="ghost" className="flex items-center p-0 bg-transparent hover:bg-[#f3e6f0] text-[#a4989f] text-lg font-medium" onClick={() => window.location.href = '/records'}>
              <ClockIcon className="w-[19px] h-[19px] mr-2 text-[#a4989f]" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]">Rehab Records</span>
            </Button>
          </div>
          <div className="absolute w-[91px] h-[21px] top-[378px] left-[47px] flex items-center cursor-pointer">
            <Button variant="ghost" className="flex items-center p-0 bg-transparent hover:bg-[#f3e6f0] text-[#a4989f] text-lg font-medium" onClick={() => window.location.href = '/profile'}>
              <UserCircleIcon className="w-[19px] h-[19px] mr-2 text-[#a4989f]" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]">Profile</span>
            </Button>
          </div>
          <div className="absolute w-[101px] h-[19px] top-[922px] left-[47px]">
            <div className="absolute top-px left-[25px] [font-family:'TeleNeo-Medium',Helvetica] font-medium text-[#a4989f] text-base tracking-[0] leading-[normal] whitespace-nowrap">Need Help?</div>
            <HelpCircleIcon className="absolute w-[18px] h-[18px] top-0 left-0 text-[#a4989f]" />
          </div>
        </div>

        {/* Main Content */}
        <main className="ml-[257px] flex-1 pr-[40px] pl-[100px]">
          {/* Header */}
          <header className="flex justify-between items-center pt-[49px] mb-[25px]">
            <div>
              <h1 className="text-[32px] text-[#6d6369]">
                <span className="font-bold">X-Heal -- Rehabing</span>
              
              </h1>
              <p className="text-lg text-[#6e636a] mt-[25px]">
                🏋🏋 Please follow your doctor's instructions strictly when
                performing rehab.
                <br />
                Remember to upload your report after completing the rehab
                session so it can be stored in the report library.
              </p>
            </div>

            <div className="flex items-center">
              <img
                className="w-9 h-9 mr-[26px]"
                alt="Notifications"
                src="/alert-bell-notification-2-streamline-ultimate-regular---free.svg"
              />
              <Avatar className="w-[43px] h-[43px] mr-[17px]">
                <AvatarImage src="/ellipse-119.png" alt="Olivia Brown" />
                <AvatarFallback>OB</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-[22px] text-[#6d6369]">
                  Olivia Brown 5678
                </p>
                <p className="font-medium text-sm text-[#6d636980]">
                  UW Medical Center - Northwest
                </p>
              </div>
              <img
                className="w-[7px] h-[13px] ml-[7px]"
                alt="Expand"
                src="/vector-9.svg"
              />
            </div>
          </header>

          {/* Device Connection Cards Row */}
          <div className="flex flex-row gap-[25px] mb-[25px]">
            {/* DEVICE CONNECTION 原卡片 */}
            <Card className="w-[591px] h-[91px] rounded-[20px] shadow-[6px_6px_10px_#c4c4c440]">
            <CardContent className="p-0">
              <div className="p-3.5">
                <h2 className="font-extrabold text-[#ed008c] text-base">
                  DEVICE CONNECTION
                </h2>
                <div className="flex items-center mt-[20px]">
                  <div className="w-1.5 h-1.5 bg-[#fe0000] rounded-[3px]" />
                  <span className="ml-[7px] font-bold text-xs text-[#6e636a]">
                    {statusA === "Connected to Device A"
                      ? "The Device(device#a) Connected"
                      : "The Device(device#a) Is Not Connected"}
                  </span>
                  <div className="ml-auto flex space-x-[10px]">
                    <Button className="w-[120px] h-[29px] bg-[#ed008c] rounded-[21px] text-xs font-bold" onClick={connectDeviceA}>
                      Connect
                    </Button>
                    <Button
                      variant="outline"
                      className="w-[120px] h-[29px] bg-[#ed008c1a] rounded-[21px] text-xs font-bold text-[#ed008c] border-[#ed008c]"
                        onClick={handleCheckReport}
                    >
                      Check Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
            {/* DEVICE CONNECTION 复制卡片 */}
            <Card className="w-[591px] h-[91px] rounded-[20px] shadow-[6px_6px_10px_#c4c4c440]">
              <CardContent className="p-0">
                <div className="p-3.5">
                  <h2 className="font-extrabold text-[#ed008c] text-base">
                    DEVICE CONNECTION
                  </h2>
                  <div className="flex items-center mt-[20px]">
                    <div className="w-1.5 h-1.5 bg-[#fe0000] rounded-[3px]" />
                    <span className="ml-[7px] font-bold text-xs text-[#6e636a]">
                      {statusB === "Connected to Device B"
                        ? "The Device(device#b) Connected"
                        : "The Device(device#b) Is Not Connected"}
                    </span>
                    <div className="ml-auto flex space-x-[10px]">
                      <Button className="w-[120px] h-[29px] bg-[#ed008c] rounded-[21px] text-xs font-bold" onClick={connectDeviceB}>
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real Time Rehab Card */}
          <Card className="w-full h-[669px] rounded-[20px] shadow-[6px_6px_10px_#c4c4c440]">
            <CardContent className="p-0">
              <div className="p-3.5">
                <div className="flex justify-between items-center">
                  <h2 className="font-extrabold text-[#ed008c] text-base">
                    REAL TIME REHAB
                  </h2>
                  <div className="flex space-x-4">
                    <Button className="w-[200px] h-[29px] bg-[#ed008c] rounded-[21px] text-xs font-bold" onClick={handleUploadData}>
                      Upload Data
                    </Button>
                    <Button className="w-[200px] h-[29px] bg-[#ed008c] rounded-[21px] text-xs font-bold" onClick={handleOpenExerciseReport}>
                      Open Exercise Report
                  </Button>
                  </div>
                </div>

                <div className="flex mt-[21px]">
                  {/* Left Panel - Exercise Visualization */}
                  <div className="w-[378px] h-[608px] bg-white rounded-[10px] border-[0.5px] border-solid border-[#6e636a] overflow-hidden">
                    <div className="h-9 bg-[#6e636a] text-white font-bold text-base flex items-center justify-center">
                      Please do as below
                    </div>

                    <div className="p-[10px]">
                      <div className="w-[328px] h-[326px] mx-auto mt-[53px] bg-[#e5e5e5] rounded-[10px] flex items-center justify-center overflow-hidden">
                        <img
                          src="/exercise1.gif"
                          alt="Rehab Demo"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      <div className="relative w-[310px] h-[115px] mt-[41px] mx-auto">
                        <img
                          className="absolute w-72 h-[110px] top-0 left-0"
                          alt="Exercise Diagram"
                          src="/image-12.png"
                        />
                        <div className="absolute w-[9px] h-[9px] top-[84px] left-[124px] bg-[#e10174] rounded-[4.39px]" />
                        <div className="absolute w-[9px] h-[9px] top-11 left-[254px] bg-[#e10174] rounded-[4.39px]" />
                        <div className="absolute w-[62px] h-[62px] top-[53px] left-[158px] bg-[#e101741a] rounded-[31.05px]" />
                        <div className="absolute w-[62px] h-[62px] top-[42px] left-[239px] bg-[#e101741a] rounded-[31.05px]" />
                        <div className="absolute h-[21px] top-[84px] left-40 font-semibold text-[#e10174] text-[16.2px] text-center tracking-[-0.32px] leading-[21.4px] whitespace-nowrap">
                          180°
                        </div>
                        <div className="absolute h-[21px] top-16 left-[266px] font-semibold text-[#e10174] text-[16.2px] text-center tracking-[-0.32px] leading-[21.4px] whitespace-nowrap">
                          30cm
                        </div>
                        <img
                          className="absolute w-[130px] h-[41px] top-12 left-[129px]"
                          alt="Vector"
                          src="/vector-1.png"
                        />
                        <div className="absolute w-[9px] h-[9px] top-16 left-[189px] bg-[#e10174] rounded-[4.39px]" />
                        <img
                          className="absolute w-2.5 h-[37px] top-14 left-[254px]"
                          alt="Vector"
                          src="/vector-3.png"
                        />
                        <img
                          className="absolute w-[31px] h-[13px] top-[69px] left-[182px]"
                          alt="Vector"
                          src="/vector-2.png"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Metrics */}
                  <div className="flex-1 pl-[105px]">
                    <div className="flex mt-[21px]">
                      {/* 第一组：角度 */}
                      <div className="flex flex-col">
                        <h3 className="font-extrabold text-[#ed008c] text-2xl mb-2">Measured Value</h3>
                        <div className="w-[182px] h-[72px] bg-[#ed008c1a] flex items-center justify-center">
                          <span className="font-extrabold text-[#ed008c] text-6xl">
                            {angle === "--" ? "--" : angle + "°"}
                          </span>
                        </div>
                      </div>
                      <div className="mx-[22px] flex items-center">
                        <span className="text-[#6e636a] text-6xl font-bold mt-5">/</span>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-extrabold text-[#6e636a] text-2xl mb-2">Target Value</h3>
                        <div className="w-[182px] h-[72px] bg-[#6e636a1a] flex items-center justify-center">
                          <span className="font-extrabold text-[#6e636a] text-6xl">180°</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-[21px]">
                      {/* 第二组：距离 */}
                      <div className="flex flex-col">
                        <h3 className="font-extrabold text-[#ed008c] text-2xl mb-2">Measured Value</h3>
                        <div className="w-[182px] h-[72px] bg-[#ed008c1a] flex items-center justify-center">
                          <span className="font-extrabold text-[#ed008c] text-6xl">
                            {distance === "--" ? "--" : distance}
                            {distance !== "--" && <span style={{ fontSize: 24, marginLeft: 2 }}>cm</span>}
                        </span>
                        </div>
                      </div>
                      <div className="mx-[22px] flex items-center">
                        <span className="text-[#6e636a] text-6xl font-bold mt-5">/</span>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-extrabold text-[#6e636a] text-2xl mb-2">Target Value</h3>
                        <div className="w-[182px] h-[72px] bg-[#6e636a1a] flex items-center justify-center">
                          <span className="font-extrabold text-[#6e636a] text-6xl">
                            {targetHeight !== "--" ? (
                              <>
                                {targetHeight}
                                <span style={{ fontSize: 24, marginLeft: 2 }}>cm</span>
                              </>
                            ) : "--"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-[75px]">
                      {/* Status */}
                      <div className="flex flex-col">
                        <h3 className="font-extrabold text-[#ed008c] text-2xl mb-2">Status</h3>
                        <div className="w-[182px] h-[72px] bg-[#ed008c1a] flex items-center justify-center">
                          <span className="font-extrabold text-[#ed008c] text-2xl">
                            {phase}
                          </span>
                        </div>
                      </div>
                      {/* Time Per Session */}
                      <div className="flex flex-col ml-[24px]">
                        <h3 className="font-extrabold text-[#ed008c] text-2xl mb-2">Time Per Session</h3>
                        <div className="w-[374px] h-[72px] bg-[#ed008c1a] flex items-center justify-center">
                          <span className="font-extrabold text-[#ed008c] text-6xl">
                            {holdSeconds.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Accumulated Times */}
                    <div className="mt-[73px]">
                      <div className="w-[580px] h-[72px] bg-gradient-to-r from-[#ed008c] to-[rgba(237,0,140,0.2)] border border-solid border-[#ed008c] flex items-center">
                        <div className="w-[236px] text-white text-[40px] text-center">Accumulated</div>
                        <div className="w-[206px] text-white text-6xl font-extrabold text-center">{repCount}</div>
                        <div className="w-[138px] text-white text-[40px] text-center">Times</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exercise Selector */}
          <div style={{ position: "absolute", top: 53, left: "calc(50% + 70px)", transform: "translateX(-50%)", zIndex: 10 }}>
            <select
              value={currentPath}
              onChange={e => navigate(e.target.value)}
              style={{ padding: "10px 28px", borderRadius: 12, fontSize: 20, boxShadow: "0 2px 8px #0001" }}
            >
              <option value="/exercise1">Exercise 1 -- Hip Flexion</option>
              <option value="/exercise2">Exercise 2 -- Hamstring Curl</option>
              <option value="/exercise3">Exercise 3 -- Heel Raise</option>
            </select>
          </div>
        </main>
      </div>
    </div>
  );
};