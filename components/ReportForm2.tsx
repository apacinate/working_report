"use client";

import { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ReportForm2() {
  const [currentPage, setCurrentPage] = useState<"report" | "inserted" | "signature">("report");

  const workerSigPadRef = useRef<SignaturePad>(null);
  const repairCompanySigPadRef = useRef<SignaturePad>(null);
  const managementCompanySigPadRef = useRef<SignaturePad>(null);

  const clearSignature = (ref: React.MutableRefObject<SignaturePad | null>) => {
    ref.current?.clear();
  };

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    const reportPage = document.getElementById("report-page");
    const insertedPage = document.getElementById("inserted-page");
    const signaturePage = document.getElementById("signature-page");

    if (reportPage && insertedPage && signaturePage) {
      // Hide all non-print elements
      const hiddenElems = document.querySelectorAll(".no-print");
      hiddenElems.forEach((el) => ((el as HTMLElement).style.display = "none"));

      // 1st Page: Report
      setCurrentPage("report");
      await new Promise((res) => setTimeout(res, 200));
      const reportCanvas = await html2canvas(reportPage, { scrollY: -window.scrollY, useCORS: true, scale: 1 });
      pdf.addImage(reportCanvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);

      // 2nd Page: Inserted HTML
      setCurrentPage("inserted");
      await new Promise((res) => setTimeout(res, 200));
      const insertedCanvas = await html2canvas(insertedPage, { scrollY: -window.scrollY, useCORS: true, scale: 1 });
      pdf.addPage();
      pdf.addImage(insertedCanvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);

      // 3rd Page: Signature
      setCurrentPage("signature");
      await new Promise((res) => setTimeout(res, 200));
      const signatureCanvas = await html2canvas(signaturePage, { scrollY: -window.scrollY, useCORS: true, scale: 1 });
      pdf.addPage();
      pdf.addImage(signatureCanvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);

      pdf.save("document.pdf");

      // Reset to the initial page
      setCurrentPage("report");
    } else {
      console.error("Pages not found");
    }
  };

  const getPageStyle = (page: "report" | "inserted" | "signature"): React.CSSProperties => ({
    visibility: currentPage === page ? "visible" : "hidden",
    position: currentPage === page ? "static" : "absolute",
    left: currentPage === page ? "0" : "-9999px",
    top: currentPage === page ? "0" : "-9999px",
    zIndex: currentPage === page ? 1 : -1,
    width: "100%",
  });

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "2px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      {/* First Page: Report */}
      <div id="report-page" style={getPageStyle("report")}>
        <h1 style={{ textAlign: "center" }}>作業報告書ページ</h1>
        <form>
          {/* Your existing form fields */}
        </form>
        <button onClick={() => setCurrentPage("inserted")} style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#4CAF50", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}>次のページへ</button>
      </div>

      {/* New Inserted Page */}
      <div id="inserted-page" style={getPageStyle("inserted")}>
        <h1 style={{ textAlign: "center" }}>部品使用明細書 (店舗控え)</h1>
        <form>
          <label>会社名:</label>
          <input type="text" style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", marginBottom: "10px" }} />
          {/* Other fields as per the template */}
        </form>
        <button onClick={() => setCurrentPage("signature")} style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#4CAF50", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}>次のページへ</button>
      </div>

      {/* Third Page: Signature */}
      <div id="signature-page" style={getPageStyle("signature")}>
        <h1 style={{ textAlign: "center" }}>署名ページ</h1>
        <form>
          {/* Existing signature fields */}
        </form>
        <button onClick={generatePDF} style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#2196F3", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}>PDFを出力</button>
      </div>
    </div>
  );
}
