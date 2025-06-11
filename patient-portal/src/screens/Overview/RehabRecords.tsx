import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  HomeIcon,
  ClockIcon,
  UserCircleIcon,
  HelpCircleIcon,
} from "lucide-react";
import { fetchLatestReportUrl } from "../../utils/fetchLatestReportUrl";

export const RehabRecords = (): JSX.Element => {
  const navigate = useNavigate();
  // Data for rehab records
  const rehabRecords = [
    {
      phase: "Mid",
      date: "06/03/2025",
      time: "UTC 14:40:31",
      exerciseType: "Rehab Exercise 2 - Hamstring Curl",
      actualTime: "7min",
      evaluation: "Needs More Effort",
    },
    {
      phase: "Mid",
      date: "05/29/2025",
      time: "UTC 07:43:21",
      exerciseType: "Rehab Exercise 3 - Heel Raise",
      actualTime: "8min",
      evaluation: "Needs Improvement",
    },
    {
      phase: "Mid",
      date: "05/29/2025",
      time: "UTC 07:33:54",
      exerciseType: "Rehab Exercise 2 - Hamstring Curl",
      actualTime: "12min",
      evaluation: "Needs Improvement",
    },
    {
      phase: "Mid",
      date: "05/29/2025",
      time: "UTC 07:20:47",
      exerciseType: "Rehab Exercise 1 - Hip Flexion",
      actualTime: "9min",
      evaluation: "Well Done",
    },
    {
      phase: "Mid",
      date: "05/28/2025",
      time: "UTC 17:15:26",
      exerciseType: "Rehab Exercise 3 - Heel Raise",
      actualTime: "9min",
      evaluation: "Needs Improvement",
    },
    {
      phase: "Mid",
      date: "05/28/2025",
      time: "UTC 17:05:56",
      exerciseType: "Rehab Exercise 2 - Hamstring Curl",
      actualTime: "14min",
      evaluation: "Well Done",
    },
    {
      phase: "Mid",
      date: "05/28/2025",
      time: "UTC 16:48:33",
      exerciseType: "Rehab Exercise 1 - Hip Flexion",
      actualTime: "6min",
      evaluation: "Well Done",
    },
    {
      phase: "Mid",
      date: "05/27/2025",
      time: "UTC 09:55:43",
      exerciseType: "Rehab Exercise 3 - Heel Raise",
      actualTime: "9min",
      evaluation: "Needs More Effort",
    },
    {
      phase: "Mid",
      date: "05/27/2025",
      time: "UTC 09:47:43",
      exerciseType: "Rehab Exercise 2 - Hamstring Curl",
      actualTime: "11min",
      evaluation: "Needs Improvement",
    },
    {
      phase: "Mid",
      date: "05/27/2025",
      time: "UTC 06:24:47",
      exerciseType: "Rehab Exercise 1 - Hip Flexion",
      actualTime: "10min",
      evaluation: "Needs Improvement",
    },
  ];

  const handleDownloadPDF = async () => {
    try {
      const url = await fetchLatestReportUrl('doctor/reports');
      if (url) {
        window.open(url, "_blank");
      } else {
        alert("No report found!");
      }
    } catch (err) {
      alert("Failed to fetch report.");
    }
  };

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
            <div className="flex items-center p-0 bg-transparent text-[#a4989f] text-lg font-medium select-none" title="请通过首页按钮进入训练">
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
            <Button variant="ghost" className="flex items-center p-0 bg-transparent hover:bg-[#f3e6f0] text-[#ed008c] text-lg font-medium" onClick={() => window.location.href = '/records'}>
              <ClockIcon className="w-[19px] h-[19px] mr-2 text-[#ed008c]" />
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

        {/* Main content */}
        <main className="ml-[257px] flex-1 p-[50px]">
          <header className="flex justify-between items-start mb-[50px]">
            <div>
              <h1 className="font-bold text-[32px] text-[#6d6369]">
                X-Heal -- Rehab Records
              </h1>
              <p className="mt-[25px] font-normal text-lg text-[#6e636a]">
                📝📝 Here, you can view all your rehab exercise records.
              </p>
            </div>
            <div className="flex items-center">
              <img
                className="w-9 h-9 mr-[26px]"
                alt="Notification Bell"
                src="/alert-bell-notification-2-streamline-ultimate-regular---free.svg"
              />
              <img
                className="w-[43px] h-[43px] mr-[17px] rounded-full object-cover"
                alt="Profile Picture"
                src="/ellipse-119-1.png"
              />
              <div>
                <div className="font-bold text-[22px] text-[#6d6369] flex items-center">
                  Olivia Brown&nbsp;&nbsp;5678
                  <img
                    className="w-[7px] h-[13px] ml-2"
                    alt="Dropdown Arrow"
                    src="/vector-9.svg"
                  />
                </div>
                <div className="font-medium text-sm text-[#6d636980]">
                  UW Medical Center - Northwest
                </div>
              </div>
            </div>
          </header>

          <Card className="w-full rounded-[20px] shadow-[6px_6px_10px_#c4c4c440]">
            <CardContent className="p-0">
              <div className="p-3.5">
                <h2 className="font-extrabold text-base text-[#ed008c] [font-family:'TeleNeo-ExtraBold',Helvetica]">
                  ALL REHAB RECORDS
                </h2>

                <div className="flex flex-wrap gap-6 mt-8">
                  <div className="flex items-center">
                    <span className="font-bold text-xs text-[#6e636a] mr-[78px] [font-family:'TeleNeo-Bold',Helvetica]">
                      REHAB PHASE
                    </span>
                    <Select>
                      <SelectTrigger className="w-[174px] h-[29px] rounded-[7px] border-[0.5px] border-[#6e636a80] text-xs font-normal text-[#6e636a] [font-family:'TeleNeo-Regular',Helvetica]">
                        <SelectValue placeholder="All Rehab Phases" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Dropdown content would go here */}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center">
                    <span className="font-bold text-xs text-[#6e636a] mr-[84px] [font-family:'TeleNeo-Bold',Helvetica]">
                      EXERCISE TYPE
                    </span>
                    <Select>
                      <SelectTrigger className="w-[174px] h-[29px] rounded-[7px] border-[0.5px] border-[#6e636a80] text-xs font-normal text-[#6e636a] [font-family:'TeleNeo-Regular',Helvetica]">
                        <SelectValue placeholder="All Exercise Types" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Dropdown content would go here */}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center">
                    <span className="font-bold text-xs text-[#6e636a] mr-[34px] [font-family:'TeleNeo-Bold',Helvetica]">
                      DATE
                    </span>
                    <Select>
                      <SelectTrigger className="w-[174px] h-[29px] rounded-[7px] border-[0.5px] border-[#6e636a80] text-xs font-normal text-[#6e636a] [font-family:'TeleNeo-Regular',Helvetica]">
                        <SelectValue placeholder="mm/dd/yyyy" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Dropdown content would go here */}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="ml-auto flex gap-2">
                    <Button className="w-[120px] h-[29px] rounded-[21px] bg-[#ed008c1a] border border-[#ed008c] text-[#ed008c] text-xs font-bold [font-family:'TeleNeo-Bold',Helvetica]">
                      Apply Filter
                    </Button>
                    <Button className="w-[120px] h-[29px] rounded-[21px] bg-[#e8e8e8] border border-[#6e636a] text-[#6e636a] text-xs font-bold [font-family:'TeleNeo-Bold',Helvetica]">
                      Clear Filter
                    </Button>
                  </div>
                </div>

                <div className="mt-8 border-[0.5px] border-[#6e636a] rounded-[10px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-[#6e636a]">
                        <TableHead className="text-[#6e636a] font-extrabold text-sm [font-family:'TeleNeo-ExtraBold',Helvetica] pl-[46px]">
                          REHAB PHASE
                        </TableHead>
                        <TableHead className="text-[#6e636a] font-extrabold text-sm [font-family:'TeleNeo-ExtraBold',Helvetica]">
                          DATE & TIME
                        </TableHead>
                        <TableHead className="text-[#6e636a] font-extrabold text-sm [font-family:'TeleNeo-ExtraBold',Helvetica]">
                          EXERCISE TYPE
                        </TableHead>
                        <TableHead className="text-[#6e636a] font-extrabold text-sm [font-family:'TeleNeo-ExtraBold',Helvetica]">
                          ACTUAL TIME
                        </TableHead>
                        <TableHead className="text-[#6e636a] font-extrabold text-sm [font-family:'TeleNeo-ExtraBold',Helvetica]">
                          OVERALL EVALUATION
                        </TableHead>
                        <TableHead className="text-[#6e636a] font-extrabold text-sm [font-family:'TeleNeo-ExtraBold',Helvetica]">
                          ACTION
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rehabRecords.map((record, index) => (
                        <TableRow
                          key={index}
                          className="border border-[#6e636a] rounded-[10px] h-12"
                        >
                          <TableCell className="font-medium text-sm text-[#6e636a] [font-family:'TeleNeo-Medium',Helvetica] pl-[69px]">
                            {record.phase}
                          </TableCell>
                          <TableCell className="font-normal text-sm text-[#6e636a]">
                            <span className="font-bold [font-family:'TeleNeo-Bold',Helvetica]">
                              {record.date}
                            </span>
                            <span className="[font-family:'TeleNeo-Regular',Helvetica]">
                              {" "}
                              {record.time}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium text-sm text-[#ed008c] [font-family:'TeleNeo-Medium',Helvetica]">
                            {record.exerciseType}
                          </TableCell>
                          <TableCell className="font-medium text-sm text-[#6e636a] [font-family:'TeleNeo-Medium',Helvetica]">
                            {record.actualTime}
                          </TableCell>
                          <TableCell className="font-medium text-sm text-[#6e636a] [font-family:'TeleNeo-Medium',Helvetica]">
                            {record.evaluation}
                          </TableCell>
                          <TableCell>
                            <Button
                              className="w-[100px] h-[18px] bg-[#ed008c] rounded-[20px] text-white text-xs font-extrabold [font-family:'TeleNeo-ExtraBold',Helvetica]"
                              onClick={handleDownloadPDF}
                            >
                              Download PDF
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex justify-between items-center p-5">
                    <div className="font-medium text-base text-[#6e636a] [font-family:'TeleNeo-Medium',Helvetica] whitespace-nowrap">
                      Showing 1 to 10 of 168 Rehab Records
                    </div>

                    <Pagination>
                      <PaginationContent className="bg-white rounded-[30px] border border-[#6e636a] h-[37px] px-2 flex gap-2 items-center">
                        <span className="w-9 h-9 rounded-full bg-[#e8e8e8] text-[#6e636a] flex items-center justify-center text-lg font-bold cursor-pointer select-none">
                          {"<"}
                        </span>
                        <PaginationItem>
                          <PaginationLink className="w-9 h-9 rounded-full bg-[#ed008c] text-white font-medium text-sm flex items-center justify-center">
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink className="w-9 h-9 rounded-full font-medium text-sm text-[#6e636a] flex items-center justify-center">
                            2
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink className="w-9 h-9 rounded-full font-medium text-sm text-[#6e636a] flex items-center justify-center">
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis className="h-auto px-2" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink className="w-9 h-9 rounded-full font-medium text-sm text-[#6e636a] flex items-center justify-center">
                            27
                          </PaginationLink>
                        </PaginationItem>
                        <span className="w-9 h-9 rounded-full bg-[#e8e8e8] text-[#6e636a] flex items-center justify-center text-lg font-bold cursor-pointer select-none">
                          {">"}
                        </span>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};
