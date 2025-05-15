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

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
  
    const reportPage = document.getElementById("report-page");
    const signaturePage = document.getElementById("signature-page");
  
    if (reportPage && signaturePage) {
      // --- 1ページ目: 報告ページ ---
      setCurrentPage("report");
      await new Promise((res) => setTimeout(res, 200));
  
      const reportCanvas = await html2canvas(reportPage, {
        scrollY: -window.scrollY,
        useCORS: true,
        scale: 2,
      });
      const reportImgData = reportCanvas.toDataURL("image/png");
      pdf.addImage(reportImgData, "PNG", 0, 0, 210, 297);
  
      // --- 2ページ目: 署名ページ（強制表示＆高さ調整） ---
      setCurrentPage("signature");
      await new Promise((res) => setTimeout(res, 200));
  
      // 高さ調整
      signaturePage.style.height = "auto";
      signaturePage.style.minHeight = "297mm"; // A4の高さに最低合わせる
      signaturePage.style.overflow = "visible";
  
      const signatureCanvas = await html2canvas(signaturePage, {
        scrollY: -window.scrollY,
        useCORS: true,
        scale: 2,
      });
      const signatureImgData = signatureCanvas.toDataURL("image/png");
      pdf.addPage();
      pdf.addImage(signatureImgData, "PNG", 0, 0, 210, 297);
  
      pdf.save("document.pdf");
  
      // 戻す
      setCurrentPage("report");
    } else {
      console.error("ページの要素が見つかりません");
    }
  };
  
  

  const getPageStyle = (page: "report" | "signature"): React.CSSProperties => ({
    visibility: currentPage === page ? "visible" : "hidden",
    position: currentPage === page ? "static" : "absolute",
    left: currentPage === page ? "0" : "-9999px",
    top: currentPage === page ? "0" : "-9999px",
    zIndex: currentPage === page ? 1 : -1,
    width: "100%",
  });
  

  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      border: "2px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    }}>
      {/* 報告ページ */}
      <div id="report-page" style={getPageStyle("report")}>
        <h1 style={{ textAlign: "center" }}>作業報告書ページ</h1>
        <form>
          <div className="form-section" style={{ marginBottom: "10px" }}>
            <label>受付番号:</label>
            <input
              type="text"
              placeholder="受付番号を入力"
              style={{
                width: "100%", padding: "10px",
                border: "1px solid #ccc", borderRadius: "5px"
              }}
            />
          </div>
          <div className="form-section" style={{ marginBottom: "10px" }}>
            <label>店舗名:</label>
            <input
              type="text"
              placeholder="店舗名を入力"
              style={{
                width: "100%", padding: "10px",
                border: "1px solid #ccc", borderRadius: "5px"
              }}
            />
          </div>
          <div className="form-section" style={{ marginBottom: "10px" }}>
            <label>作業実施日:</label>
            <input
              type="date"
              style={{
                width: "100%", padding: "10px",
                border: "1px solid #ccc", borderRadius: "5px"
              }}
            />
          </div>
        </form>
      </div>

      {/* 署名ページ */}
      <div id="signature-page" style={getPageStyle("signature")}>
        <h1 style={{ textAlign: "center" }}>署名ページ</h1>
        <form>
          {[
            { label: "作業担当者 (サイン):", ref: workerSigPadRef },
            { label: "修理会社 (サイン):", ref: repairCompanySigPadRef },
            { label: "管理会社名 (サイン):", ref: managementCompanySigPadRef },
          ].map((sig, index) => (
            <div className="form-section" style={{ marginBottom: "20px" }} key={index}>
              <label>{sig.label}</label>
              <div style={{
                border: "1px solid #ccc", borderRadius: "5px", padding: "10px"
              }}>
               <SignaturePad
                  ref={sig.ref}
                  canvasProps={{
                    style: {
                      width: "500px",
                      height: "150px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    },
                  }}
                />

              </div>
              <button
                type="button"
                onClick={() => clearSignature(sig.ref)}
                style={{
                  marginTop: "10px", padding: "10px 20px",
                  border: "none", backgroundColor: "#f44336",
                  color: "#fff", borderRadius: "5px", cursor: "pointer"
                }}
              >
                クリア
              </button>
            </div>
          ))}
        </form>
      </div>

      {/* ナビゲーションボタン */}
      {currentPage === "report" ? (
        <>
          <button
            onClick={() => setCurrentPage("signature")}
            style={{
              marginTop: "20px", padding: "10px 20px", border: "none",
              backgroundColor: "#4CAF50", color: "#fff",
              borderRadius: "5px", cursor: "pointer", width: "100%"
            }}
          >
            次のページへ
          </button>

          <button
            onClick={generatePDF}
            style={{
              marginTop: "20px", padding: "10px 20px", border: "none",
              backgroundColor: "#2196F3", color: "#fff",
              borderRadius: "5px", cursor: "pointer", width: "100%"
            }}
          >
            PDFを出力
          </button>
        </>
      ) : (
        <button
          onClick={() => setCurrentPage("report")}
          style={{
            marginTop: "20px", padding: "10px 20px", border: "none",
            backgroundColor: "#f44336", color: "#fff",
            borderRadius: "5px", cursor: "pointer", width: "100%"
          }}
        >
          前のページへ
        </button>
      )}
    </div>
  );
}
