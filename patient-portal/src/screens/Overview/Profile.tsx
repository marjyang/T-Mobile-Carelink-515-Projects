import {
  BellIcon,
  ChevronRightIcon,
  ClockIcon,
  HelpCircleIcon,
  HomeIcon,
  UserCircleIcon,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  // Patient information data
  const patientInfo = {
    name: "Olivia Brown",
    id: "5678",
    age: "25 Years Old",
    gender: "Female",
    blood: "O",
    email: "oliiibrown@outlook.com",
    contact: "+1 (720) 298 7718",
    address: "12190 NE District Wy, Bellevue, WA 98005",
    injuredSide: "Right Knee Joint",
    surgeryDate: "01/29/2025",
    primaryDoctor: "Dr Smith - 6578",
    medicalFacility: "UW Medical Center - Northwest",
  };

  // Calendar data
  const calendarDays = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];
  const calendarDates = [
    ["27", "28", "29", "30", "1", "2", "3"],
    ["4", "5", "6", "7", "8", "9", "10"],
    ["11", "12", "13", "14", "15", "16", "17"],
    ["18", "19", "20", "21", "22", "23", "24"],
    ["25", "26", "27", "28", "29", "30", "31"],
    ["1", "2", "3", "4", "5", "6", "7"],
  ];

  // Appointments data
  const appointments = [
    { day: "8", time: "9:00 PT", type: "Physical Therapy" },
    { day: "14", time: "9:00 PT", type: "Physical Therapy" },
    { day: "21", time: "9:00 PT", type: "Physical Therapy" },
    { day: "28", time: "9:00 PT", type: "Physical Therapy" },
    { day: "4", time: "9:00 PT", type: "Physical Therapy" },
    { day: "6", time: "15:00 IPC", type: "In-Person Consultation" },
  ];

  return (
    <div className="bg-[#fef5fa] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#fef5fa] w-full max-w-[1512px] relative">
        {/* Sidebar */}
        <div className="absolute w-[257px] h-[982px] top-0 left-0 bg-white rounded-[0px_20px_20px_0px] shadow-[6px_6px_10px_#c4c4c440]">
          <img
            className="absolute top-[60px] left-[54px] object-contain max-w-[180px] max-h-[60px]"
            alt="Group"
            src="/group-10527.png"
          />

          <div className="absolute w-44 h-10 top-[166px] left-10">
            <Button className="relative w-[174px] h-10 bg-[#ed008c] rounded-[100px] text-white">
              <span className="[font-family:'TeleNeo-Bold',Helvetica] font-bold text-xl">
              X-Heal
              </span>
            </Button>
          </div>

          <div className="absolute w-44 h-10 top-[686px] left-10">
            <Button
              variant="ghost"
              className="relative w-[174px] h-10 bg-[#a599a066] rounded-[100px] text-white"
            >
              <span className="[font-family:'TeleNeo-Bold',Helvetica] font-bold text-base">
                ACL Rehab Monitor
              </span>
            </Button>
          </div>

          <div className="absolute w-44 h-10 top-[730px] left-10">
            <Button
              variant="ghost"
              className="relative w-[174px] h-10 bg-[#a599a066] rounded-[100px] text-white"
            >
              <span className="[font-family:'TeleNeo-Bold',Helvetica] font-bold text-base">
                Hypertension Monitor
              </span>
            </Button>
            </div>

          {/* Rehabing 按钮 */}
          <div className="absolute w-28 h-[21px] top-72 left-[47px] flex items-center">
            <div className="flex items-center p-0 bg-transparent text-[#a4989f] text-lg font-medium select-none" style={{width: '100%'}} title="请通过首页按钮进入训练">
              <img className="w-[19px] h-[19px] mr-2" alt="Medical specialty" src="/medical-specialty-rehabilitation-streamline-ultimate-regular.svg" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]" style={{ marginLeft: 5 }}>Rehabing</span>
            </div>
          </div>

          {/* Overview 按钮 */}
          <div className="absolute w-28 h-[21px] top-[243px] left-[47px] flex items-center cursor-pointer">
            <Button
              variant="ghost"
              className="flex items-center p-0 bg-transparent hover:bg-[#f3e6f0] text-[#a4989f] text-lg font-medium"
              onClick={() => navigate("/")}
            >
              <HomeIcon className="w-[19px] h-[19px] mr-2 text-[#a4989f]" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]">Overview</span>
            </Button>
          </div>

          {/* Rehab Records 按钮 */}
          <div className="absolute w-[152px] h-[21px] top-[333px] left-[47px] flex items-center cursor-pointer">
            <Button
              variant="ghost"
              className="flex items-center p-0 bg-transparent hover:bg-[#f3e6f0] text-[#a4989f] text-lg font-medium"
              onClick={() => navigate("/records")}
            >
              <ClockIcon className="w-[19px] h-[19px] mr-2 text-[#a4989f]" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]">Rehab Records</span>
            </Button>
          </div>

          {/* Profile 按钮 */}
          <div className="absolute w-[91px] h-[21px] top-[378px] left-[47px] flex items-center cursor-pointer">
            <Button
              variant="ghost"
              className="flex items-center p-0 bg-transparent hover:bg-[#f3e6f0] text-[#ed008c] text-lg font-medium"
              onClick={() => navigate("/profile")}
            >
              <UserCircleIcon className="w-[19px] h-[19px] mr-2 text-[#ed008c]" />
              <span className="[font-family:'TeleNeo-Medium',Helvetica]">Profile</span>
            </Button>
          </div>

          <div className="absolute w-[101px] h-[19px] top-[922px] left-[47px]">
            <div className="absolute top-px left-[25px] [font-family:'TeleNeo-Medium',Helvetica] font-medium text-[#a4989f] text-base tracking-[0] leading-[normal] whitespace-nowrap">
              Need Help?
            </div>
            <HelpCircleIcon className="absolute w-[18px] h-[18px] top-0 left-0 text-[#a4989f]" />
          </div>
        </div>

        {/* Main content */}
        <main className="ml-[257px] p-[40px]">
          <header className="flex justify-between items-center mb-[30px]">
            <h1 className="font-bold text-[#6d6369] text-[32px]">
              X-Heal -- Profile
            </h1>

            <div className="flex items-center">
              <BellIcon className="w-9 h-9 text-[#6d6369] mr-[25px]" />
              <Avatar className="w-[43px] h-[43px] mr-[17px]">
                <AvatarImage src="/ellipse-119-2.png" alt="Olivia Brown" />
                <AvatarFallback>OB</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold text-[#6d6369] text-[22px] flex items-center">
                  Olivia Brown&nbsp;&nbsp;5678
                  <ChevronRightIcon className="w-[7px] h-[13px] ml-1" />
                </div>
                <div className="font-medium text-[#6d636980] text-sm">
                  UW Medical Center - Northwest
                </div>
              </div>
            </div>
          </header>

          <div className="font-normal text-[#6e636a] text-lg mb-[17px]">
            !! Here, you can only view your information. To make any changes,
            please contact your primary doctor.
          </div>

          <div className="flex gap-[25px]">
            {/* Left column - Patient Information */}
            <div className="w-[537px]">
              <Card className="shadow-[6px_6px_10px_#c4c4c440] rounded-[20px] overflow-hidden">
                <div className="h-[156px] bg-[#ed008c1a] rounded-[20px_20px_0px_0px] relative">
                  <div className="absolute top-[13px] left-3.5 font-extrabold text-[#ed008c] text-base">
                    PATIENT INFORMATION
                  </div>
                </div>

                <div className="flex justify-center -mt-[82px]">
                  <Avatar className="w-[165px] h-[165px] border-4 border-white">
                    <AvatarImage
                      src="/ellipse-119-2.png"
                      alt="Olivia Brown"
                      className="object-cover"
                    />
                    <AvatarFallback>OB</AvatarFallback>
                  </Avatar>
                </div>

                <CardContent className="pt-[20px]">
                  <div className="text-center mb-[30px]">
                    <h2 className="text-2xl text-[#6d6369]">
                      <span className="font-extrabold">{patientInfo.name}</span>
                      <span className="font-thin"> | ID {patientInfo.id}</span>
                    </h2>
                    <p className="text-lg text-[#6e636a] mt-[10px]">
                      {patientInfo.age}, {patientInfo.gender} | Blood:{" "}
                      {patientInfo.blood}
                    </p>
                  </div>

                  <Separator className="mb-[35px]" />

                  <div className="grid grid-cols-2 gap-x-[40px] gap-y-[20px] px-[59px]">
                    <div>
                      <h3 className="font-extrabold text-[#6d6369] text-base">
                        Email
                      </h3>
                      <p className="font-normal text-[#6d6369] text-base">
                        {patientInfo.email}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-[#6d6369] text-base">
                        Contact
                      </h3>
                      <p className="font-normal text-[#6d6369] text-base">
                        {patientInfo.contact}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <h3 className="font-extrabold text-[#6d6369] text-base">
                        Address
                      </h3>
                      <p className="font-normal text-[#6d6369] text-base">
                        {patientInfo.address}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-[#6d6369] text-base">
                        Injured Side
                      </h3>
                      <p className="font-normal text-[#6d6369] text-base">
                        {patientInfo.injuredSide}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-[#6d6369] text-base">
                        Surgery Date
                      </h3>
                      <p className="font-normal text-[#6d6369] text-base">
                        {patientInfo.surgeryDate}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-[#6d6369] text-base">
                        Primary Doctor
                      </h3>
                      <p className="font-normal text-[#6d6369] text-base">
                        {patientInfo.primaryDoctor}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-[#6d6369] text-base">
                        Medical Facility
                      </h3>
                      <p className="font-normal text-[#6d6369] text-base">
                        {patientInfo.medicalFacility}
                      </p>
                    </div>
                  </div>

                  <div className="mt-[40px] px-[59px]">
                    <div className="font-extrabold text-[#ed008c] text-base mb-[10px]">
                      SURGERY DAY : {patientInfo.surgeryDate}
                    </div>

                    <div className="flex">
                      <div className="bg-[#ed008c] rounded-l-md px-4 py-1 text-white">
                        <span className="font-normal">Phase 1</span>
                        <span className="font-bold">&nbsp;</span>
                        <span className="font-normal">
                          &nbsp;&nbsp; Completed&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                      </div>
                      <div className="bg-[#ed008c] rounded-r-md px-4 py-1 text-white">
                        <span className="font-extrabold">
                          Phase 2&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="font-normal">04/30/2025 - NOW</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Flexion Progress and Appointment Reminder */}
            <div className="flex-1 space-y-[25px]">
              {/* Flexion Progress Card */}
              <Card className="shadow-[6px_6px_10px_#c4c4c440] rounded-[20px]">
                <CardContent className="p-0">
                  <div className="p-[13px_14px]">
                    <div className="font-extrabold text-[#ed008c] text-base">
                      FLEXION PROGRESS
                    </div>

                    <div className="flex justify-between mt-[20px]">
                      <div>
                        <p className="text-xs text-[#6e636a]">
                          <span className="font-extrabold">
                            Flexion on Surgery Day
                          </span>
                          <span className="font-normal"> (01/29/2025)</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6e636a]">
                          <span className="font-extrabold">
                            Most Recent Flexion Measurement
                          </span>
                          <span className="font-normal"> (04/21/2025)</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between mt-[15px]">
                      <div className="relative">
                        <div className="w-[62px] h-[62px] bg-[#e101741a] rounded-[31.05px] absolute top-[8px] left-[70px]" />
                        <img
                          className="w-[250px] h-[154px] object-cover relative z-10"
                          alt="Flexion on Surgery Day"
                          src="/--2025-05-27-14-13-39-1-1.png"
                        />
                        <img
                          className="absolute top-[9px] left-[30px] w-[132px] h-[114px] z-20"
                          alt="Vector"
                          src="/vector-2788.svg"
                        />
                        <div className="absolute top-[27px] left-[78px] w-8 h-8 z-30">
                          <img src="/vector-4.svg" alt="Vector" />
                        </div>
                        <div className="absolute h-[21px] top-[50px] left-[57px] font-semibold text-[#e10174] text-[16.2px] text-center z-30">
                          120°
                        </div>
                        <div className="absolute w-[9px] h-[9px] top-[25px] left-[101px] bg-[#e10174] rounded-[4.39px] z-30" />
                        <div className="absolute w-[9px] h-[9px] top-[119px] left-[158px] bg-[#e10174] rounded-[4.39px] z-30" />
                        <div className="absolute w-[9px] h-[9px] top-[5px] left-[26px] bg-[#e10174] rounded-[4.39px] z-30" />
                      </div>

                      <div className="relative">
                        <div className="w-[62px] h-[62px] bg-[#e101741a] rounded-[31.05px] absolute top-[23px] left-[136px]" />
                        <img
                          className="w-[249px] h-[154px] object-cover relative z-10"
                          alt="Most Recent Flexion"
                          src="/--2025-05-27-14-02-50-1-1.png"
                        />
                        <img
                          className="absolute top-[20px] left-[109px] w-[103px] h-[65px] z-20"
                          alt="Vector"
                          src="/vector-2789.svg"
                        />
                        <div className="absolute top-[58px] left-[150px] w-[34px] h-[17px] z-30">
                          <img src="/vector-2790.svg" alt="Vector" />
                        </div>
                        <div className="absolute h-[21px] top-[78px] left-[156px] font-semibold text-[#e10174] text-[16.2px] text-center z-30">
                          85°
                        </div>
                        <div className="absolute w-[9px] h-[9px] top-[36px] left-[158px] bg-[#e10174] rounded-[4.39px] z-30" />
                        <div className="absolute w-[9px] h-[9px] top-[72px] left-[207px] bg-[#e10174] rounded-[4.39px] z-30" />
                        <div className="absolute w-[9px] h-[9px] top-[100px] left-[105px] bg-[#e10174] rounded-[4.39px] z-30" />
                        <img
                          className="absolute w-[55px] h-[18px] top-[74px] left-[43px] z-30"
                          alt="Group"
                          src="/group.png"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Appointment Reminder Card */}
              <Card className="shadow-[6px_6px_10px_#c4c4c440] rounded-[20px]">
                <CardContent className="p-[13px_14px]">
                  <div className="font-extrabold text-[#ed008c] text-base mb-[10px]">
                    APPOINTMENT REMINDER
                  </div>

                  <div className="flex justify-between items-center mb-[20px]">
                    <Select defaultValue="may">
                      <SelectTrigger className="w-[174px] h-[29px] border-[0.5px] border-[#6e636a80] rounded-[7px]">
                        <SelectValue placeholder="This month: May" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="may">This month: May</SelectItem>
                        <SelectItem value="june">Next month: June</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="text-center font-extrabold text-[#6e636a] text-base">
                      MAY
                    </div>

                    <Tabs defaultValue="month" className="w-[174px]">
                      <TabsList className="grid grid-cols-3 h-[29px] border-[0.5px] border-[#6e636a] rounded-[7px]">
                        <TabsTrigger
                          value="day"
                          className="data-[state=inactive]:bg-transparent data-[state=active]:bg-[#ed008c] data-[state=active]:text-white rounded-l-[7px] text-xs"
                        >
                          Day
                        </TabsTrigger>
                        <TabsTrigger
                          value="week"
                          className="data-[state=inactive]:bg-transparent data-[state=active]:bg-[#ed008c] data-[state=active]:text-white text-xs"
                        >
                          Week
                        </TabsTrigger>
                        <TabsTrigger
                          value="month"
                          className="data-[state=inactive]:bg-transparent data-[state=active]:bg-[#ed008c] data-[state=active]:text-white rounded-r-[7px] text-xs"
                        >
                          Month
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="calendar-container">
                    <div className="grid grid-cols-7 text-center">
                      {calendarDays.map((day, index) => (
                        <div
                          key={index}
                          className="font-medium text-[#6e636a] text-[10px]"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 text-center border border-[#6e636a] border-opacity-20 mt-[7px]">
                      {calendarDates.map((week, weekIndex) => (
                        <React.Fragment key={weekIndex}>
                          {week.map((date, dateIndex) => {
                            const isHighlighted =
                              weekIndex % 2 === 0 &&
                              (dateIndex === 0 || dateIndex === 3);
                            const appointment = appointments.find(
                              (a) => a.day === date,
                            );

                            return (
                              <div
                                key={`${weekIndex}-${dateIndex}`}
                                className={`h-[55px] relative border border-[#6e636a] border-opacity-10 ${isHighlighted ? "bg-[#6e636a0d]" : ""}`}
                              >
                                <div className="absolute top-2 left-2 font-normal text-[#343434] text-[8px]">
                                  {date}
                                </div>

                                {appointment && (
                                  <div
                                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[66px] h-[15px] ${
                                      appointment.type === "Physical Therapy"
                                        ? "bg-[#763cef]"
                                        : "bg-[#ff8700]"
                                    } rounded-[10px] flex items-center justify-center`}
                                  >
                                    <span className="font-bold text-white text-[8px]">
                                      {appointment.time}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex items-center mt-[10px] space-x-[20px]">
                      <div className="flex items-center">
                        <div className="w-[43px] h-2.5 bg-[#763cef] rounded-[10px]"></div>
                        <span className="ml-[8px] font-medium text-[#646464] text-[10.8px]">
                          Physical Therapy
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div className="w-[43px] h-2.5 bg-[#ff8700] rounded-[10px]"></div>
                        <span className="ml-[8px] font-medium text-[#646464] text-[10.8px]">
                          In-Person Consultation
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};