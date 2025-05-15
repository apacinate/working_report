"use client";

import { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ReportForm2() {
  type PageType = "report" | "signature" | `inserted-${number}`;
  const [currentPage, setCurrentPage] = useState<PageType>("report");const [additionalPages, setAdditionalPages] = useState<number>(0); // Tracks the number of added pages.

  


  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    const reportPage = document.getElementById("report-page");
    const signaturePage = document.getElementById("signature-page");

    if (reportPage && signaturePage) {
      // Hide all non-print elements
      const hiddenElems = document.querySelectorAll(".no-print");
      hiddenElems.forEach((el) => ((el as HTMLElement).style.display = "none"));

      // 1st Page: Report
      setCurrentPage("report");
      await new Promise((res) => setTimeout(res, 200));
      const reportCanvas = await html2canvas(reportPage, { scrollY: -window.scrollY, useCORS: true, scale: 1 });
      pdf.addImage(reportCanvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);

      // Dynamically added pages
      for (let i = 1; i <= additionalPages; i++) {
        const additionalPage = document.getElementById(`inserted-page-${i}`);
        if (additionalPage) {
          setCurrentPage(`inserted-${i}`);
          await new Promise((res) => setTimeout(res, 200));
          const additionalCanvas = await html2canvas(additionalPage, { scrollY: -window.scrollY, useCORS: true, scale: 1 });
          pdf.addPage();
          pdf.addImage(additionalCanvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
        }
      }

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

  const addPage = () => {
    setAdditionalPages(additionalPages + 1);
  };

  const getPageStyle = (page: string): React.CSSProperties => ({
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
        <button onClick={() => setCurrentPage("signature")} style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#4CAF50", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}>次のページへ</button>
      </div>

      {/* Dynamically Added Pages */}
      {Array.from({ length: additionalPages }, (_, i) => (
        <div id={`inserted-page-${i + 1}`} style={getPageStyle(`inserted-${i + 1}`)} key={i + 1}>
          <h1 style={{ textAlign: "center" }}>挿入ページ {i + 1}</h1>
          <form>
            <label>会社名:</label>
            <input type="text" style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", marginBottom: "10px" }} />
            {/* Other fields as needed */}
          </form>
          <button onClick={() => setCurrentPage(i + 2 <= additionalPages ? `inserted-${i + 2}` : "signature")} style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#4CAF50", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}>次のページへ</button>
        </div>
      ))}

      {/* Third Page: Signature */}
      <div id="signature-page" style={getPageStyle("signature")}>
        <h1 style={{ textAlign: "center" }}>署名ページ</h1>
        <form>
          {/* Existing signature fields */}
        </form>
        <button onClick={generatePDF} style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#2196F3", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}>PDFを出力</button>
      </div>

      {/* "+" Button to Add Pages */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md">
        <button onClick={addPage} style={{ padding: "10px 20px", border: "none", backgroundColor: "#2196F3", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}>＋ 挿入ページを追加</button>
      </div>
    </div>
  );
}
