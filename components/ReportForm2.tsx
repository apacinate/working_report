"use client";

import { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ReportForm2() {
  const [currentPage, setCurrentPage] = useState<"report" | "signature">("report");
  const [workerSignatureData, setWorkerSignatureData] = useState<string | null>(null);
  const [repairCompanySignatureData, setRepairCompanySignatureData] = useState<string | null>(null);
  const [managementCompanySignatureData, setManagementCompanySignatureData] = useState<string | null>(null);

  const workerSigPadRef = useRef<SignaturePad>(null);
  const repairCompanySigPadRef = useRef<SignaturePad>(null);
  const managementCompanySigPadRef = useRef<SignaturePad>(null);

  const clearSignature = (ref: React.MutableRefObject<SignaturePad | null>, setSignatureData: (value: string | null) => void) => {
    ref.current?.clear();
    setSignatureData(null);
  };

  const saveSignatureData = () => {
    if (workerSigPadRef.current) {
      setWorkerSignatureData(workerSigPadRef.current.toDataURL());
    }
    if (repairCompanySigPadRef.current) {
      setRepairCompanySignatureData(repairCompanySigPadRef.current.toDataURL());
    }
    if (managementCompanySigPadRef.current) {
      setManagementCompanySignatureData(managementCompanySigPadRef.current.toDataURL());
    }
  };

  const reloadSignatureData = () => {
    if (workerSigPadRef.current && workerSignatureData) {
      workerSigPadRef.current.fromDataURL(workerSignatureData);
    }
    if (repairCompanySigPadRef.current && repairCompanySignatureData) {
      repairCompanySigPadRef.current.fromDataURL(repairCompanySignatureData);
    }
    if (managementCompanySigPadRef.current && managementCompanySignatureData) {
      managementCompanySigPadRef.current.fromDataURL(managementCompanySignatureData);
    }
  };

  const handlePageChange = (newPage: "report" | "signature") => {
    if (newPage === "report") {
      saveSignatureData(); // Save signatures when leaving the signature page
    } else if (newPage === "signature") {
      reloadSignatureData(); // Reload signatures when returning to the signature page
    }
    setCurrentPage(newPage);
  };

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const reportPage = document.getElementById("report-page");
    const signaturePage = document.getElementById("signature-page");

    if (reportPage && signaturePage) {
      try {
        const reportCanvas = await html2canvas(reportPage, { scale: 2 });
        const reportImgData = reportCanvas.toDataURL("image/png");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(reportImgData, "PNG", 0, 0, pageWidth, pageHeight);

        pdf.addPage();

        const signatureCanvas = await html2canvas(signaturePage, { scale: 2 });
        const signatureImgData = signatureCanvas.toDataURL("image/png");
        pdf.addImage(signatureImgData, "PNG", 0, 0, pageWidth, pageHeight);

        pdf.save("report_document.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    } else {
      console.error("Report or Signature page element not found.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "2px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      {currentPage === "report" ? (
        <>
          <div id="report-page">
            <h1 style={{ textAlign: "center" }}>作業報告書ページ</h1>
            <form>
              <div className="form-section" style={{ marginBottom: "10px" }}>
                <label>受付番号:</label>
                <input type="text" placeholder="受付番号を入力" style={{ width: "540px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              </div>
              <div className="form-section" style={{ marginBottom: "10px" }}>
                <label>店舗名:</label>
                <input type="text" placeholder="店舗名を入力" style={{ width: "540px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              </div>
              <div className="form-section" style={{ marginBottom: "10px" }}>
                <label>作業実施日:</label>
                <input type="date" style={{ width: "540px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
              </div>
            </form>
          </div>
          <button onClick={() => handlePageChange("signature")} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#4CAF50", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}>
            次のページへ
          </button>

          <button onClick={generatePDF} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#2196F3", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}>
            PDFを出力
          </button>
        </>
      ) : (
        <>
          <div id="signature-page">
            <h1 style={{ textAlign: "center" }}>署名ページ</h1>
            <form>
              <div className="form-section" style={{ marginBottom: "20px" }}>
                <label htmlFor="worker">作業担当者 (サイン):</label>
                <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", width: "540px", height: "200px" }}>
                  <SignaturePad ref={workerSigPadRef} canvasProps={{ width: 520, height: 180 }} />
                </div>
                <button type="button" onClick={() => clearSignature(workerSigPadRef, setWorkerSignatureData)} style={{ marginTop: "10px", padding: "10px 20px", backgroundColor: "#f44336", color: "#fff", borderRadius: "5px", cursor: "pointer" }}>
                  クリア
                </button>
              </div>
              <button onClick={() => handlePageChange("report")} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#f44336", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}>
                前のページへ
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
