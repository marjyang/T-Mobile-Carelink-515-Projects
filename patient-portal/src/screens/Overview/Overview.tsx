import {
  BellIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  HelpCircleIcon,
  HomeIcon,
  UserCircleIcon,
  XCircleIcon,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { fetchLatestReportUrl } from "../../utils/fetchLatestReportUrl";

export const Overview = (): JSX.Element => {
  const navigate = useNavigate();
  // Data for exercise tracking
  const exercises = [
    { id: 1, name: "Hip Flexion", completed: 18, total: 23 },
    { id: 2, name: "Hamstring Curl", completed: 15, total: 23 },
    { id: 3, name: "Heel Raise", completed: 19, total: 23 },
  ];

  // Data for today's exercises
  const todaysExercises = [
    {
      id: 1,
      name: "Hip Flexion",
      status: "Completed",
      time: "~8 min",
      measurement: "180°",
      secondaryMeasurement: "30cm",
      completed: true,
    },
    {
      id: 2,
      name: "Hamstring Curl",
      status: "Incompleted",
      time: "~12 min",
      measurement: "90°",
      completed: false,
    },
    {
      id: 3,
      name: "Heel Raise",
      status: "Incompleted",
      time: "~6 min",
      measurement: "2.5-5cm",
      completed: false,
    },
  ];

  // Data for exercise tracking dates
  const trackingDates = [
    "05/15",
    "05/16",
    "05/17",
    "05/18",
    "05/19",
    "05/20",
    "05/21",
    "05/22",
    "05/23",
    "05/24",
    "05/25",
    "05/26",
    "05/27",
    "05/28",
    "05/29",
    "05/30",
  ];

  // PDF 预览函数
  const handleViewLatestInstruction = async () => {
    try {
      const url = await fetchLatestReportUrl("/X-Heal-Reports/5678/Mid");
      if (url) {
        window.open(url, "_blank");
      } else {
        alert("未找到最新报告！");
      }
    } catch (err) {
      alert("获取报告失败");
    }
  };

  return (
    <div className="bg-[#fef5fa] flex flex-row justify-center w-full">
      <div className="bg-[#fef5fa] w-[1512px] h-[982px] relative">
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
            <div className="flex items-center p-0 bg-transparent text-[#a4989f] text-lg font-medium select-none" title="请通过首页按钮进入训练">
              <img className="w-[19px] h-[19px] mr-2" alt="Medical specialty" src="/medical-specialty-rehabilitation-streamline-ultimate-regular.svg" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]" style={{ marginLeft: 5 }}>Rehabing</span>
            </div>
          </div>
          <div className="absolute w-28 h-[21px] top-[243px] left-[47px] flex items-center cursor-pointer">
            <Button variant="ghost" className="flex items-center p-0 bg-transparent hover:bg-[#f3e6f0] text-[#ed008c] text-lg font-medium" onClick={() => navigate('/') }>
              <HomeIcon className="w-[19px] h-[19px] mr-2 text-[#ed008c]" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]">Overview</span>
            </Button>
          </div>
          <div className="absolute w-[152px] h-[21px] top-[333px] left-[47px] flex items-center cursor-pointer">
            <Button variant="ghost" className="flex items-center p-0 bg-transparent hover:bg-[#f3e6f0] text-[#a4989f] text-lg font-medium" onClick={() => navigate('/records') }>
              <ClockIcon className="w-[19px] h-[19px] mr-2 text-[#a4989f]" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]">Rehab Records</span>
            </Button>
          </div>
          <div className="absolute w-[91px] h-[21px] top-[378px] left-[47px] flex items-center cursor-pointer">
            <Button variant="ghost" className="flex items-center p-0 bg-transparent hover:bg-[#f3e6f0] text-[#a4989f] text-lg font-medium" onClick={() => navigate('/profile') }>
              <UserCircleIcon className="w-[19px] h-[19px] mr-2 text-[#a4989f]" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]">Profile</span>
            </Button>
          </div>
          <div className="absolute w-[101px] h-[19px] top-[922px] left-[47px]">
            <div className="absolute top-px left-[25px] [font-family:'TeleNeo-Medium',Helvetica] font-medium text-[#a4989f] text-base tracking-[0] leading-[normal] whitespace-nowrap">Need Help?</div>
            <HelpCircleIcon className="absolute w-[18px] h-[18px] top-0 left-0 text-[#a4989f]" />
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-[49px] left-[290px] [font-family:'TeleNeo-Bold',Helvetica] font-bold text-[#6d6369] text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
          Welcome, Olivia Brown !
        </div>

        <div className="absolute top-[45px] left-[1294px] [font-family:'TeleNeo-Bold',Helvetica] font-bold text-[#6d6369] text-[22px] tracking-[0] leading-[normal] whitespace-nowrap">
          Olivia Brown&nbsp;&nbsp;5678
        </div>

        <div className="absolute top-[72px] left-[1294px] [font-family:'TeleNeo-Medium',Helvetica] font-medium text-[#6d636980] text-sm tracking-[0] leading-[normal] whitespace-nowrap">
          UW Medical Center - Northwest
        </div>

        {/* Welcome message */}
        <div className="absolute w-[1182px] top-[120px] left-[290px] [font-family:'TeleNeo-Regular',Helvetica] font-normal text-[#6e636a] text-lg tracking-[0] leading-[normal]">
          👋👋 Welcome to X-Heal – Your ACL Recovery Companion
          <br />
          <br /> X-Heal helps you stay on track with your daily rehab exercises
          after ACL surgery.
          <br /> Follow step-by-step guidance based on your doctor&apos;s plan,
          and automatically share your progress with your care team.
          <br /> Stay consistent. Stay connected. Recover faster.
        </div>

        <div className="absolute w-[1182px] h-[721px] top-[261px] left-[290px]">
          {/* Rehab Completion Overview Card */}
          <Card className="absolute w-[436px] h-[294px] top-0 left-0 bg-white rounded-[20px] shadow-[6px_6px_10px_#c4c4c440]">
            <CardHeader className="pt-3.5 pb-0 px-3.5">
              <CardTitle className="[font-family:'TeleNeo-ExtraBold',Helvetica] font-extrabold text-[#ed008c] text-base">
                REHAB COMPLETION OVERVIEW
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-[150px] h-[150px] mx-auto mt-4">
                <div className="relative w-[162px] h-[162px] -left-1.5 bg-[url(/ellipse-120.svg)] bg-[100%_100%]">
                  <img
                    className="absolute w-[46px] h-[102px] top-[38px] left-1.5"
                    alt="Ellipse"
                    src="/ellipse-121.svg"
                  />
                  <img
                    className="absolute w-[102px] h-[46px] top-0 left-4"
                    alt="Ellipse"
                    src="/ellipse-122.svg"
                  />
                </div>
              </div>

              <div className="w-20 top-[110px] left-[43px] [font-family:'TeleNeo-Bold',Helvetica] font-bold text-[#b193a4] text-xs leading-[21px] whitespace-nowrap absolute text-center tracking-[0]">
                25 Days
              </div>

              <div className="w-[79px] h-[23px] top-[119px] left-[179px] [font-family:'TeleNeo-ExtraBold',Helvetica] font-normal text-[#ed008c] text-2xl leading-[21px] whitespace-nowrap absolute text-center tracking-[0]">
                <span className="font-extrabold">100</span>
                <span className="[font-family:'TeleNeo-Regular',Helvetica] text-[21px]">
                  &nbsp;
                </span>
                <span className="[font-family:'TeleNeo-Regular',Helvetica] text-xs">
                  DAYS
                </span>
              </div>

              <img
                className="w-[86px] top-[130px] left-[43px] absolute h-8"
                alt="Base"
                src="/base.png"
              />

              <div className="absolute w-[54px] top-[133px] left-[54px] [font-family:'TeleNeo-Bold',Helvetica] font-bold text-white text-xs text-center tracking-[0] leading-3">
                Partially Completed
              </div>

              <div className="w-[86px] top-[143px] left-[308px] [font-family:'TeleNeo-Bold',Helvetica] font-bold text-[#ed008c] text-xs leading-[21px] whitespace-nowrap absolute text-center tracking-[0]">
                50 Days
              </div>

              <div className="w-[79px] top-[147px] left-[179px] [font-family:'TeleNeo-Bold',Helvetica] font-bold text-[#ed008c] text-[9px] leading-[10px] absolute text-center tracking-[0]">
                <span className="[font-family:'TeleNeo-Bold',Helvetica] font-bold text-[#ed008c] text-[9px] tracking-[0] leading-[10px]">
                  from Surgery Day:
                  <br />
                </span>
                <span className="underline">01/29/2025</span>
              </div>

              <img
                className="w-[91px] top-[163px] left-[303px] absolute h-8"
                alt="Base"
                src="/base-1.png"
              />

              <div className="top-[170px] left-[324px] [font-family:'TeleNeo-Bold',Helvetica] font-bold text-white text-xs absolute tracking-[0] leading-[normal] whitespace-nowrap">
                Completed
              </div>

              <div className="flex gap-6 absolute bottom-6 left-[43px]">
                <div className="flex items-center gap-2">
                  <div className="w-[11px] h-[11px] bg-[#ed008c] rounded-[5.72px]"></div>
                  <span className="[font-family:'TeleNeo-Medium',Helvetica] font-medium text-[#646464] text-[10.8px]">
                    Completed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[11px] h-[11px] bg-[#b193a4] rounded-[5.72px]"></div>
                  <span className="[font-family:'TeleNeo-Medium',Helvetica] font-medium text-[#646464] text-[10.8px]">
                    Partially Completed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[11px] h-[11px] bg-[#e8e8e8] rounded-[5.72px]"></div>
                  <span className="[font-family:'TeleNeo-Medium',Helvetica] font-medium text-[#646464] text-[10.8px]">
                    Not Completed
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Phase Exercise Tracker Card */}
          <Card className="absolute w-[721px] h-[294px] top-0 left-[461px] bg-white rounded-[20px] shadow-[6px_6px_10px_#c4c4c440]">
            <CardHeader className="pt-4 pb-0 px-4 flex flex-row justify-between items-center">
              <CardTitle className="[font-family:'TeleNeo-ExtraBold',Helvetica] font-extrabold text-[#ed008c] text-base">
                CURRENT PHASE EXERCISE TRACKER
              </CardTitle>
              <div className="[font-family:'TeleNeo-Regular',Helvetica] font-normal text-[#6e636a] text-base text-right">
                Current Phase :{" "}
                <span className="[font-family:'TeleNeo-Bold',Helvetica] font-bold text-[#6e636a] leading-[0.1px]">
                  Rehab Phase II
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              {exercises.map((exercise, index) => (
                <div key={exercise.id} className="relative mb-4">
                  <div className="w-[693px] h-[70px] mx-auto bg-white rounded-[5px] border-[0.5px] border-solid border-[#6e636a] relative">
                    <div className="absolute w-[97px] h-[70px] top-0 left-0 bg-[#6e636a]">
                      <div className="w-[86px] h-[34px] p-2 text-white text-xs">
                        <span>
                          Rehab Exercise {exercise.id}
                          <br />
                        </span>
                        <span className="[font-family:'TeleNeo-ExtraBold',Helvetica] font-extrabold whitespace-nowrap">- {exercise.name}</span>
                      </div>
                    </div>

                    {/* Exercise tracking bars */}
                    <div className="flex absolute right-0 h-full items-end">
                      {trackingDates.map((date, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center mx-[3.5px]"
                        >
                          <div
                            className={`w-7 h-[15px] ${Math.random() > 0.2 ? "bg-[#ed008c]" : "bg-[#e8e8e8]"} rounded-[0px_0px_4px_0px]`}
                          ></div>
                          <span
                            className="w-7 text-[10px] text-center text-[#6e636a] [font-family:'TeleNeo-Medium',Helvetica] font-medium"
                          >
                            {date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-[21px] absolute right-6 top-3 [font-family:'TeleNeo-ExtraBold',Helvetica] font-extrabold text-[#ed008c] text-2xl leading-[21px] whitespace-nowrap text-center">
                    {exercise.completed}/{exercise.total}
                  </div>
                </div>
              ))}

              <div className="absolute right-4 bottom-[-61px] z-10">
                <Button className="w-[140px] h-[18px] bg-[#ed008c] rounded-[20px] [font-family:'TeleNeo-ExtraBold',Helvetica] font-extrabold text-white text-[10px] text-center p-0" onClick={handleViewLatestInstruction}>
                  View Latest Instruction
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Today's Exercise Checklist */}
          <Card className="absolute w-[1182px] h-[402px] top-[319px] left-0 bg-white rounded-[20px] shadow-[6px_6px_10px_#c4c4c440]">
            <CardHeader className="pt-3 pb-0 px-3.5">
              <CardTitle className="[font-family:'TeleNeo-ExtraBold',Helvetica] font-extrabold text-[#ed008c] text-base">
                TODAY&apos;S EXERCISE CHECKLIST
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex justify-between mt-4">
              {todaysExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="w-[378px] h-[341px] mx-1 bg-white rounded-[10px] border-[0.5px] border-solid border-[#6e636a] relative"
                >
                  <div className="w-full h-9 bg-[#6e636a] text-white text-center flex items-center justify-center">
                    <span className="[font-family:'TeleNeo-Regular',Helvetica]">
                      Rehab Exercise {exercise.id}{" "}
                    </span>
                    <span className="[font-family:'TeleNeo-ExtraBold',Helvetica] font-extrabold whitespace-nowrap">- {exercise.name}</span>
                  </div>

                  {/* 占位图片 */}
                  <img
                    src={
                      exercise.id === 1
                        ? "/hipflexion.png"
                        : exercise.id === 2
                        ? "/hamstringcurl.png"
                        : exercise.id === 3
                        ? "/heelraise.png"
                        : "/placeholder.png"
                    }
                    alt="Exercise Placeholder"
                    style={{ width: 280, height: 280 }}
                    className="rounded-xl mx-auto mb-2 object-contain bg-white"
                  />
                  <div className="absolute bottom-[86px] left-0 right-0 flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      {exercise.completed ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircleIcon className="w-5 h-5 text-red-500" />
                      )}
                      <span className="[font-family:'TeleNeo-Regular',Helvetica] text-[#6e636a] text-base">
                        Status: {" "}
                        <span className="[font-family:'TeleNeo-Bold',Helvetica] font-bold">
                          {exercise.status}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-[60px] left-0 right-0 text-center [font-family:'TeleNeo-Regular',Helvetica] text-[#6e636a] text-base">
                    Estimated Time: {exercise.time}
                  </div>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <Button
                      className={`w-[178px] h-[35px] rounded-[21px] ${
                        exercise.completed
                          ? "bg-[#e8e8e8] text-[#6e636a] border border-solid border-[#6e636a]"
                          : "bg-[#ed008c1a] text-[#ed008c] border border-solid border-[#ed008c]"
                      }`}
                      onClick={() => {
                        if (exercise.id === 1) navigate("/exercise1");
                        else if (exercise.id === 2) navigate("/exercise2");
                        else if (exercise.id === 3) navigate("/exercise3");
                      }}
                    >
                      {exercise.completed ? "Try Again" : "Start Exercise"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* User profile and notifications */}
        <BellIcon className="absolute w-9 h-9 top-[50px] left-[1169px] text-[#6d6369]" />
        <ChevronRightIcon className="absolute w-[7px] h-[13px] top-[52px] left-[1466px] text-[#6d6369]" />
        <img
          className="absolute w-[43px] h-[43px] top-[46px] left-[1234px] object-cover rounded-full"
          alt="User profile"
          src="/ellipse-119-1.png"
        />
      </div>
    </div>
  );
};
