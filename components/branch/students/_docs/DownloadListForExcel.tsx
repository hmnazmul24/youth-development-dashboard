"use client";

import { StudentPaidType } from "@/components/data/tableHelper";
import { ReactNode, useEffect, useState } from "react";
import * as XLSX from "xlsx";

// Define the type for your student data
type StudentData = {
  Name: string;
  Roll: string;
  Registration: string;
  Mobile: string;
  Trade: string;
  Session: string;
  Result: string;
};

const modifyData = (info: StudentPaidType[]): StudentData[] => {
  return info.map((item) => ({
    Name: item.name,
    Roll: item.genRoll!,
    Registration: item.genReg!,
    Mobile: item.mobile,
    Trade: item.trade!,
    Session: item.range!,
    Result: item.result ?? "",
  }));
};

export default function DownloadListForExcel({
  children,
  studentInfo,
}: {
  children: ReactNode;
  studentInfo: StudentPaidType[];
}) {
  // State to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will only run on the client side
    setIsClient(true);
  }, []);

  // Example data
  const studentData: StudentData[] = modifyData(studentInfo);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(studentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Calculate column widths based on the maximum length of content in each column
    const maxLengths = Object.keys(studentData[0]).map((key) =>
      Math.max(
        ...studentData.map(
          (row) => row[key as keyof StudentData].toString().length
        ),
        key.length
      )
    );

    worksheet["!cols"] = maxLengths.map((len) => ({ width: len + 2 })); // Add padding for readability

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // todo: uncomment

    // const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", "students.xlsx"); // Set the file name
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  // Only render the button after the client-side is loaded
  if (!isClient) {
    return null;
  }

  return <div onClick={handleDownloadExcel}>{children}</div>;
}
