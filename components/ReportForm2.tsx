"use client";

import { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ReportForm2() {
  const [pages, setPages] = useState<string[]>(["report", "signature"]); // Initial pages
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const workerSigPadRef = useRef<SignaturePad>(null);
  const repairCompanySigPadRef = useRef<SignaturePad>(null);
  const managementCompanySigPadRef = useRef<SignaturePad>(null);

  // Function to clear signature from SignaturePad
  const clearSignature = (ref: React.MutableRefObject<SignaturePad | null>) => {
    ref.current?.clear();
  };

  // Function to dynamically insert a new page
  const addPage = (currentIndex: number) => {
    const newPages = [...pages];
    newPages.splice(currentIndex + 1, 0, `inserted-${Date.now()}`); // Generate a unique ID for inserted page
    setPages(newPages);
  };

  // Function to generate the PDF
  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
  
    const originalPageIndex = currentPageIndex; // 現在のページを保持
  
    try {
      for (let i = 0; i < pages.length; i++) {
        setCurrentPageIndex(i); // ページ表示を切り替え
  
        // Wait for DOM update (必要に応じて強制再描画のために少し待つ)
        await new Promise((resolve) => setTimeout(resolve, 300));
  
        const pageElement = document.getElementById(`${pages[i]}-page`);
        if (pageElement) {
          const canvas = await html2canvas(pageElement, { scale: 2 });
          const imgData = canvas.toDataURL("image/png");
  
          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
        }
      }
  
      pdf.save("report_document.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // 元のページに戻す
      setCurrentPageIndex(originalPageIndex);
    }
  };
  

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "2px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {pages.map((page, index) => {
        if (index !== currentPageIndex) return null;

        // Render the report page
        if (page === "report") {
          return (
            <div id="report-page" key={index}>
              <h1 style={{ textAlign: "center" }}>作業報告書ページ</h1>
              <form>
                <div className="form-section" style={{ marginBottom: "10px" }}>
                  <label>受付番号:</label>
                  <input
                    type="text"
                    placeholder="受付番号を入力"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="form-section" style={{ marginBottom: "10px" }}>
                  <label>店舗名:</label>
                  <input
                    type="text"
                    placeholder="店舗名を入力"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="form-section" style={{ marginBottom: "10px" }}>
                  <label>作業実施日:</label>
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </form>
              <button
                type="button"
                onClick={() => addPage(index)}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  border: "none",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                + ページを挿入
              </button>
              <button
                type="button"
                onClick={() => setCurrentPageIndex(index + 1)}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  border: "none",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                次のページへ
              </button>
            </div>
          );
        }

        // Render dynamically inserted pages
        if (page.startsWith("inserted")) {
          return (
            <div id={`${page}-page`} key={index}>
              <h1 style={{ textAlign: "center" }}>挿入されたページ</h1>
              <form>
                <div className="form-section" style={{ marginBottom: "10px" }}>
                  <label>受付番号:</label>
                  <input
                    type="text"
                    placeholder="受付番号を入力"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="form-section" style={{ marginBottom: "10px" }}>
                  <label>店舗名:</label>
                  <input
                    type="text"
                    placeholder="店舗名を入力"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="form-section" style={{ marginBottom: "10px" }}>
                  <label>作業実施時間:</label>
                  <input
                    type="time"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </form>
              <button
                type="button"
                onClick={() => addPage(index)}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  border: "none",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                + ページを挿入
              </button>
              <button
                type="button"
                onClick={() => setCurrentPageIndex(index + 1)}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  border: "none",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                次のページへ
              </button>
              <button
                type="button"
                onClick={() => setCurrentPageIndex(index - 1)}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  border: "none",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                戻る
              </button>
            </div>
          );
        }

        // Render the signature page
        if (page === "signature") {
          return (
            <div id="signature-page" key={index}>
              <h1 style={{ textAlign: "center" }}>署名ページ</h1>
              <form>
                <div className="form-section" style={{ marginBottom: "20px" }}>
                  <label htmlFor="worker">作業担当者 (サイン):</label>
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      width: "100%",
                      height: "150px",
                    }}
                  >
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
                    style={{
                      marginTop: "10px",
                      padding: "10px 20px",
                      border: "none",
                      backgroundColor: "#f44336", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
                      >
                        クリア
                      </button>
                    </div>
                  </form>
                  <button
                    type="button"
                    onClick={() => setCurrentPageIndex(index - 1)}
                    style={{
                      marginTop: "10px",
                      padding: "10px 20px",
                      border: "none",
                      backgroundColor: "#f44336",
                      color: "#fff",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    戻る
                  </button>
                </div>
              );
            }
    
            return null;
          })}
    
          <button
            onClick={generatePDF}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              border: "none",
              backgroundColor: "#2196F3",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            PDFを出力
          </button>
        </div>
      );
    }
    