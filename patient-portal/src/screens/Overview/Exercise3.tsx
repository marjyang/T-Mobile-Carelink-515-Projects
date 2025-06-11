import React, { useState, useRef } from "react";
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

export const Exercise3 = (): JSX.Element => {
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
  const [statusB, setStatusB] = useState("IDLE");
  // 采集到的 distance
  const [distance, setDistance] = useState("--");

  // Device B 的 UUID
  const SERVICE_UUID_B = "12345678-1234-5678-1234-56789abcdef0";
  const CHARACTERISTIC_UUID_B = "abcdefab-cdef-1234-5678-abcdefabcdef";

  // 采集与判定相关状态
  const [phase, setPhase] = useState("idle");
  const [holdSeconds, setHoldSeconds] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const [allRepsValues, setAllRepsValues] = useState<number[][]>([]);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const holdStartRef = useRef<number | null>(null);
  const repPendingRef = useRef(false);
  const currentRepValuesRef = useRef<number[]>([]);

  // 目标高度状态
  const [targetHeight, setTargetHeight] = useState("--");
  // 目标 reps 状态
  const [targetRepetitions, setTargetRepetitions] = useState<number | null>(null);

  const pageOptions = [
    { label: "Exercise 1", path: "/rehabing" },
    { label: "Exercise 2", path: "/exercise2" },
    { label: "Exercise 3", path: "/exercise3" },
  ];
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  // 连接 device B 并采集 distance
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
      characteristic.addEventListener("characteristicvaluechanged", (event: Event) => {
        const value = (event.target as any).value as DataView;
        const distanceValue = parseInt(new TextDecoder().decode(value));
        setDistance(distanceValue.toString());
        console.log('[connectDeviceB] 收到 distance:', distanceValue);
      });
      setStatusB("Connected to Device B");
    } catch (e: any) {
      setStatusB("Connection failed: " + e.message);
    }
  };

  // Check Report 按钮功能
  const handleCheckReport = async () => {
    try {
      const reportsRef = collection(db, "patients", "5678", "reports");
      const q = query(reportsRef, orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latest = querySnapshot.docs[0].data();
        const heelRaiseTargetHeight =
          latest.parameters &&
          latest.parameters.heelRaise &&
          latest.parameters.heelRaise.targetHeight;
        const reps =
          latest.parameters &&
          latest.parameters.heelRaise &&
          latest.parameters.heelRaise.repetitions;
        if (heelRaiseTargetHeight !== undefined && heelRaiseTargetHeight !== null) {
          setTargetHeight(heelRaiseTargetHeight.toString());
        } else {
          setTargetHeight("--");
        }
        setTargetRepetitions(typeof reps === 'number' ? reps : null);
      } else {
        setTargetHeight("--");
        setTargetRepetitions(null);
      }
    } catch (err) {
      setTargetHeight("--");
      setTargetRepetitions(null);
    }
    setPhase("idle");
    setHoldSeconds(0);
    setRepCount(0);
  };

  // 自动 pause 逻辑
  React.useEffect(() => {
    if (targetRepetitions !== null && repCount >= targetRepetitions) {
      setPhase("paused");
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    }
  }, [repCount, targetRepetitions]);

  // 监听 distance 和 phase，控制 phase 切换、计时、rep 计数
  React.useEffect(() => {
    if (phase === "paused") return;
    const distanceNum = parseFloat(distance as string);
    const resetCondition = distanceNum > 2.0;
    // 进入 holding
    if (phase === "idle" && distanceNum > 2.0) {
      setPhase("holding");
      setHoldSeconds(0);
      holdStartRef.current = Date.now();
      if (!holdTimerRef.current) {
        holdTimerRef.current = setInterval(() => {
          if (holdStartRef.current) {
            setHoldSeconds(((Date.now() - holdStartRef.current) / 1000));
          }
        }, 100);
      }
      repPendingRef.current = false;
      currentRepValuesRef.current = [distanceNum];
    } else if (phase === "holding") {
      // 采集当前 rep 的 distance 序列
      if (!isNaN(distanceNum)) {
        currentRepValuesRef.current.push(distanceNum);
      }
    }
    // holding 计时到 5s，进入 holdingDown
    if (phase === "holding" && holdSeconds >= 5) {
      setPhase("holdingDown");
      repPendingRef.current = true;
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    }
    // holdingDown 且 resetCondition，完成一次 rep
    if (phase === "holdingDown" && repPendingRef.current && !resetCondition) {
      if (currentRepValuesRef.current.length > 0) {
        setRepCount((prev) => prev + 1);
        setAllRepsValues(prev => [...prev, [...currentRepValuesRef.current]]);
      }
      setPhase("idle");
      setHoldSeconds(0);
      holdStartRef.current = null;
      repPendingRef.current = false;
      currentRepValuesRef.current = [];
    }
  }, [distance, phase, holdSeconds]);

  // 组件卸载时清理 interval
  React.useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    };
  }, []);

  const handleUploadData = () => {
    // Implementation of handleUploadData
  };

  const handleOpenExerciseReport = () => {
    // Implementation of handleOpenExerciseReport
  };

  return (
    <>
      {/* 页面切换下拉框，固定在页面顶部中央 */}
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
                  {/* Exercise 3 -- Heel Raise 字样已删除 */}
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

          {/* Device Connection Card */}
          <Card className="w-[591px] h-[91px] rounded-[20px] shadow-[6px_6px_10px_#c4c4c440] mb-[25px]">
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
                          src="/exercise3.gif"
                          alt="Rehab Demo"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      <div className="relative w-[310px] h-[115px] mt-[41px] mx-auto">
                        <img
                          className="absolute w-72 h-[110px] top-0 left-0"
                          alt="Exercise Diagram"
                          src="/exercise3-diagram.png"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Metrics */}
                  <div className="flex-1 pl-[105px]">
                    <div className="flex mt-[21px]">
                      {/* Measured Value */}
                      <div className="flex flex-col">
                        <h3 className="font-extrabold text-[#ed008c] text-2xl mb-2">
                          Measured Value
                        </h3>
                        <div className="w-[182px] h-[72px] bg-[#ed008c1a] flex items-center justify-center">
                          <span className="font-extrabold text-[#ed008c] text-6xl">
                              {distance}
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="mx-[22px] flex items-center">
                        <span className="text-[#6e636a] text-6xl font-bold mt-5">
                          /
                        </span>
                      </div>

                      {/* Target Value */}
                      <div className="flex flex-col">
                        <h3 className="font-extrabold text-[#6e636a] text-2xl mb-2">
                          Target Value
                        </h3>
                        <div className="w-[182px] h-[72px] bg-[#6e636a1a] flex items-center justify-center">
                          <span className="font-extrabold text-[#6e636a] text-6xl">
                              {targetHeight}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-[95px]">
                      {/* Status */}
                      <div className="flex flex-col">
                        <h3 className="font-extrabold text-[#ed008c] text-2xl mb-2">
                          Status
                        </h3>
                        <div className="w-[182px] h-[72px] bg-[#ed008c1a] flex items-center justify-center">
                            <span className="font-extrabold text-[#ed008c] text-2xl">
                              {phase}
                          </span>
                        </div>
                      </div>

                      {/* Time Per Session */}
                      <div className="flex flex-col ml-[24px]">
                        <h3 className="font-extrabold text-[#ed008c] text-2xl mb-2">
                          Time Per Session
                        </h3>
                        <div className="w-[374px] h-[72px] bg-[#ed008c1a] flex items-center justify-center">
                          <span className="font-extrabold text-[#ed008c] text-6xl">
                              {holdSeconds.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Accumulated Times */}
                    <div className="mt-[93px]">
                      <div className="w-[580px] h-[72px] bg-gradient-to-r from-[#ed008c] to-[rgba(237,0,140,0.2)] border border-solid border-[#ed008c] flex items-center">
                        <div className="w-[236px] text-white text-[40px] text-center">
                          Accumulated
                        </div>
                        <div className="w-[206px] text-white text-6xl font-extrabold text-center">
                            {repCount}
                        </div>
                        <div className="w-[138px] text-white text-[40px] text-center">
                          Times
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
    </>
  );
}; 