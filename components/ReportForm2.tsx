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
      try {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Capture report page
        const reportCanvas = await html2canvas(reportPage, { scale: 2 });
        const reportImgData = reportCanvas.toDataURL("image/png");
        pdf.addImage(reportImgData, "PNG", 0, 0, pageWidth, pageHeight);

        // Capture inserted page
        pdf.addPage();
        const insertedCanvas = await html2canvas(insertedPage, { scale: 2 });
        const insertedImgData = insertedCanvas.toDataURL("image/png");
        pdf.addImage(insertedImgData, "PNG", 0, 0, pageWidth, pageHeight);

        // Capture signature page
        pdf.addPage();
        const signatureCanvas = await html2canvas(signaturePage, { scale: 2 });
        const signatureImgData = signatureCanvas.toDataURL("image/png");
        pdf.addImage(signatureImgData, "PNG", 0, 0, pageWidth, pageHeight);

        pdf.save("report_document.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    } else {
      console.error("Page elements not found.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "2px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      {currentPage === "report" && (
        <>
          <div id="report-page">
            <h1 style={{ textAlign: "center" }}>作業報告書ページ</h1>
            <form>
              <div className="form-section" style={{ marginBottom: "10px" }}>
                <label>受付番号:</label>
                <input
                  type="text"
                  placeholder="受付番号を入力"
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
              <div className="form-section" style={{ marginBottom: "10px" }}>
                <label>店舗名:</label>
                <input
                  type="text"
                  placeholder="店舗名を入力"
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
              <div className="form-section" style={{ marginBottom: "10px" }}>
                <label>作業実施日:</label>
                <input
                  type="date"
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
            </form>
            <button
              type="button"
              onClick={() => setCurrentPage("inserted")}
              style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#4CAF50", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
            >
              + 挿入ページへ
            </button>
          </div>
        </>
      )}

      {currentPage === "inserted" && (
        <>
          <div id="inserted-page">
            <h1 style={{ textAlign: "center" }}>挿入されたページ</h1>
            <form>
              <div className="form-section" style={{ marginBottom: "10px" }}>
                <label>受付番号:</label>
                <input
                  type="text"
                  placeholder="受付番号を入力"
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
              <div className="form-section" style={{ marginBottom: "10px" }}>
                <label>店舗名:</label>
                <input
                  type="text"
                  placeholder="店舗名を入力"
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
              <div className="form-section" style={{ marginBottom: "10px" }}>
                <label>作業実施時間:</label>
                <input
                  type="time"
                  style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
            </form>
            <button
              type="button"
              onClick={() => setCurrentPage("signature")}
              style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#4CAF50", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
            >
              次のページへ
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage("report")}
              style={{ marginTop: "10px", padding: "10px 20px", border: "none", backgroundColor: "#f44336", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
            >
              戻る
            </button>
          </div>
        </>
      )}

      {currentPage === "signature" && (
        <>
          <div id="signature-page">
            <h1 style={{ textAlign: "center" }}>署名ページ</h1>
            <form>
              <div className="form-section" style={{ marginBottom: "20px" }}>
                <label htmlFor="worker">作業担当者 (サイン):</label>
                <div style={{ border: "1px solid #ccc", borderRadius: "5px", width: "100%", height: "150px" }}>
                  <SignaturePad
                    ref={workerSigPadRef}
                    canvasProps={{
                      style: { width: "100%", height: "100%" },
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
            </form>
            <button
              type="button"
              onClick={() => setCurrentPage("inserted")}
              style={{ marginTop: "10px", padding: "10px 20px", border: "none", backgroundColor: "#f44336", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
            >
              戻る
            </button>
          </div>
        </>
      )}

      <button
        onClick={generatePDF}
        style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#2196F3", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
      >
        PDFを出力
      </button>
    </div>
  );
}
