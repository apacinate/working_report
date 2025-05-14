"use client";

import { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ReportForm2() {
  const [currentPage, setCurrentPage] = useState<"report" | "signature">("report");

  const workerSigPadRef = useRef<SignaturePad>(null);
  const repairCompanySigPadRef = useRef<SignaturePad>(null);
  const managementCompanySigPadRef = useRef<SignaturePad>(null);

  const clearSignature = (ref: React.MutableRefObject<SignaturePad | null>) => {
    ref.current?.clear();
  };

  const generatePDF = () => {
    const input = document.body; // Entire document capture
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("report.pdf");
    });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "2px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      {currentPage === "report" ? (
        <>
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
          <h1 style={{ textAlign: "center" }}>署名ページ</h1>
          <form>
            <div className="form-section" style={{ marginBottom: "20px" }}>
              <label htmlFor="worker">作業担当者 (サイン):</label>
              <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
                <SignaturePad ref={workerSigPadRef} />
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
              <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
                <SignaturePad ref={repairCompanySigPadRef} />
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
              <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
                <SignaturePad ref={managementCompanySigPadRef} />
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
