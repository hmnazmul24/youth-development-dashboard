import { useEffect } from "react";
import { CertificateInfoType } from "@/types";
import { format } from "date-fns";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function createCertificate(info: CertificateInfoType) {
  // Load the background PDF
  const backgroundPdfBytes = await fetch("/certificate/certificate2.pdf").then(
    (res) => res.arrayBuffer()
  );

  // Load the background PDF document
  const pdfDoc = await PDFDocument.load(backgroundPdfBytes);

  // Load the custom font (italic)
  const customFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // Access the first page of the PDF
  const pages = pdfDoc.getPages();
  const doc = pages[0]; // Assuming the first page is the background

  // Draw custom content on the certificate
  doc.drawText(info.SLNo, {
    x: 260,
    y: 512,
    size: 14,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  doc.drawText(info.roll, {
    x: 635,
    y: 355,
    size: 14,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  doc.drawText(info.reg, {
    x: 635,
    y: 335,
    size: 14,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  doc.drawText(format(new Date(), "PP"), {
    x: 645,
    y: 311,
    size: 14,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  doc.drawText(info.fullName, {
    x: 350,
    y: 290,
    size: 14,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  doc.drawText(info.fathersName, {
    x: 330,
    y: 262,
    size: 14,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  doc.drawText(info.mothersName, {
    x: 590,
    y: 262,
    size: 14,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  doc.drawText(info.courseName, {
    x: 455,
    y: 238,
    size: 14,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  doc.drawText(info.branchName, {
    x: 345,
    y: 210,
    size: 14,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  doc.drawText(info.branchCode, {
    x: 670,
    y: 209,
    size: 13,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  doc.drawText(info.held, {
    x: 310,
    y: 186,
    size: 14,
    font: customFont,
    color: rgb(0, 0, 0),
  });
  doc.drawText(info.grade, {
    x: 665,
    y: 186,
    size: 14,
    font: customFont,
    color: rgb(0, 0, 0),
  });

  // Save the final PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });

  // Trigger download in the browser (useEffect ensures it's client-side)
  useEffect(() => {
    // Make sure `document` is available
    if (typeof document !== "undefined") {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `certificate_${info.fullName}.pdf`;
      link.click();
    }
  }, []); // This will run only on the client
}
