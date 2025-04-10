import React, { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import adminAxiosInstance from "@/config/AdminAxiosInstence";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


const ReportDownloader: React.FC<{ className?: string }> = ({ className }) => {
  const [dateRange, setDateRange] = useState<[Date, Date] | null>([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date(),
  ]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });


  const handleDownloadPDF = async () => {
    if (!dateRange) {
      console.log("Please select a date range");
      return;
    }

    try {
      setPdfLoading(true);
      const res = await adminAxiosInstance.post(
        "/dashboard/report/pdf",
        {
          startDate: dateRange[0],
          endDate: dateRange[1],
        },
        {
          responseType: "blob", // Get binary data
        }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const filename = `financial-report-${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up

    } catch (error) {
      console.error("PDF download failed:", error);
    }finally{
      setPdfLoading(false);
    }
  };


  const handleDownloadExcel = async () => {
    if (!dateRange) {
      console.log("Please select a date range");
      return;
    }

   
    
    try {
      setExcelLoading(true)
      const res = await adminAxiosInstance.post("/dashboard/report/excel", {
        startDate: dateRange[0],
        endDate: dateRange[1],
      }, {
        responseType: "blob", // Get binary data
      });

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const filename = `financial-report-${
        new Date().toISOString().split("T")[0]
      }.xlsx`;

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up

    } catch (error) {
      console.error("Excel download failed:", error);
    }finally{
      setExcelLoading(false)
    }
  };




  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-teal-700">
          Download Financial Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Select date range for your report:
          </p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[260px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange ? (
                  `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <Calendar
                selectRange
                value={dateRange}
                onChange={(val: Value) => setDateRange(val as [Date, Date])}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex space-x-4">
          <Button
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
            className="bg-teal-600 hover:bg-teal-700 flex-1"
          >
            {pdfLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white" />
                Downloading...
              </span>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
          <Button
            onClick={handleDownloadExcel}
            disabled={excelLoading}
            className="bg-teal-600 hover:bg-teal-700 flex-1"
          >
            {excelLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white" />
                Downloading...
              </span>
            ) : (
              <>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Download Excel
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportDownloader;
