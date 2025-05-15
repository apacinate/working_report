"use client";

import { useState, useRef, useEffect } from "react";
import SignaturePad from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ReportForm2() {
  const [currentPage, setCurrentPage] = useState<"report" | "signature">("report");

  const workerSigPadRef = useRef<SignaturePad>(null);
  const repairCompanySigPadRef = useRef<SignaturePad>(null);
  const managementCompanySigPadRef = useRef<SignaturePad>(null);

  useEffect(() => {
    // Ensures the canvas is resized to fill its container
    const resizeCanvas = (ref: React.MutableRefObject<SignaturePad | null>) => {
      if (ref.current) {
        const canvas = ref.current.getCanvas();
        canvas.width = canvas.parentElement?.offsetWidth || canvas.width;
        canvas.height = canvas.parentElement?.offsetHeight || canvas.height;
      }
    };

    // Resize all signature fields on mount or page change
    resizeCanvas(workerSigPadRef);
    resizeCanvas(repairCompanySigPadRef);
    resizeCanvas(managementCompanySigPadRef);
  }, [currentPage]);

  const clearSignature = (ref: React.MutableRefObject<SignaturePad | null>) => {
    ref.current?.clear();
  };

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4"); // A4-sized PDF
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
                <input
                  type="text"
                  placeholder="受付番号を入力"
                  style={{ width: "540px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
              <div className="form-section" style={{ marginBottom: "10px" }}>
                <label>店舗名:</label>
                <input
                  type="text"
                  placeholder="店舗名を入力"
                  style={{ width: "540px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
              <div className="form-section" style={{ marginBottom: "10px" }}>
                <label>作業実施日:</label>
                <input
                  type="date"
                  style={{ width: "540px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
            </form>
          </div>

          <button
            onClick={() => setCurrentPage("signature")}
            style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#4CAF50", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
          >
            次のページへ
          </button>

          <button
            onClick={generatePDF}
            style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#2196F3", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
          >
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
                  <SignaturePad
                    ref={workerSigPadRef}
                    canvasProps={{
                      style: { width: "100%", height: "100%", display: "block" }, // Full usage of container
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => clearSignature(workerSigPadRef)}
                  style={{ marginTop: "10px", padding: "10px 20px", border: "none", backgroundColor: "#f44336", color: "#fff", borderRadius: "5px", cursor: "pointer" }}
                >
                  クリア
                </button>
              </div>

              <div className="form-section" style={{ marginBottom: "20px" }}>
                <label htmlFor="repair-company">修理会社 (サイン):</label>
                <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", width: "540px", height: "200px" }}>
                  <SignaturePad
                    ref={repairCompanySigPadRef}
                    canvasProps={{
                      style: { width: "100%", height: "100%", display: "block" }, // Full usage of container
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => clearSignature(repairCompanySigPadRef)}
                  style={{ marginTop: "10px", padding: "10px 20px", border: "none", backgroundColor: "#f44336", color: "#fff", borderRadius: "5px", cursor: "pointer" }}
                >
                  クリア
                </button>
              </div>

              <div className="form-section" style={{ marginBottom: "20px" }}>
                <label htmlFor="management-company">管理会社名 (サイン):</label>
                <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", width: "540px", height: "200px" }}>
                  <SignaturePad
                    ref={managementCompanySigPadRef}
                    canvasProps={{
                      style: { width: "100%", height: "100%", display: "block" }, // Full usage of container
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => clearSignature(managementCompanySigPadRef)}
                  style={{ marginTop: "10px", padding: "10px 20px", border: "none", backgroundColor: "#f44336", color: "#fff", borderRadius: "5px", cursor: "pointer" }}
                >
                  クリア
                </button>
              </div>
            </form>
          </div>

          <button
            onClick={() => setCurrentPage("report")}
            style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#f44336", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
          >
            前のページへ
          </button>
        </>
      )}
    </div>
  );
}
