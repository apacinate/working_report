"use client";

import { useState, useRef, useEffect } from "react";
import SignaturePad from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ReportForm2() {
  const [pages, setPages] = useState(["report", "signature"]);
  const workerSigPadRef = useRef<SignaturePad>(null);
  const repairCompanySigPadRef = useRef<SignaturePad>(null);
  const managementCompanySigPadRef = useRef<SignaturePad>(null);

  const clearSignature = (ref: React.MutableRefObject<SignaturePad | null>) => {
    ref.current?.clear();
  };

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const formElement = document.getElementById("form-page");

    if (formElement) {
      try {
        const canvas = await html2canvas(formElement, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

        pdf.save("report_document.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    } else {
      console.error("Form element not found.");
    }
  };

  const addPage = () => {
    setPages(["report", "inserted", "signature"]);
  };

  return (
    <div id="form-page" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "2px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      {pages.map((page, index) => {
        if (page === "report") {
          return (
            <div key={index} id="report-page">
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
                onClick={addPage}
                style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#4CAF50", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
              >
                + ページを追加
              </button>
            </div>
          );
        }

        if (page === "inserted") {
          return (
            <div key={index} id="inserted-page">
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
                  <label>作業実施日:</label>
                  <input
                    type="date"
                    style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                  />
                </div>
              </form>
            </div>
          );
        }

        if (page === "signature") {
          return (
            <div key={index} id="signature-page">
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
                <div className="form-section" style={{ marginBottom: "20px" }}>
                  <label>修理会社 (サイン):</label>
                  <div style={{ border: "1px solid #ccc", borderRadius: "5px", width: "100%", height: "150px" }}>
                    <SignaturePad
                      ref={repairCompanySigPadRef}
                      canvasProps={{
                        style: { width: "100%", height: "100%" },
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
                  <label>管理会社名 (サイン):</label>
                  <div style={{ border: "1px solid #ccc", borderRadius: "5px", width: "100%", height: "150px" }}>
                    <SignaturePad
                      ref={managementCompanySigPadRef}
                      canvasProps={{
                        style: { width: "100%", height: "100%" },
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
          );
        }
        return null;
      })}

      <button
        onClick={generatePDF}
        style={{ marginTop: "20px", padding: "10px 20px", border: "none", backgroundColor: "#2196F3", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
      >
        PDFを出力
      </button>
    </div>
  );
}
