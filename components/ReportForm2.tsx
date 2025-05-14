"use client";

import { useRef } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm2() {
  const sigPadRef = useRef<SignaturePad>(null);

  const clearSignature = () => {
    sigPadRef.current?.clear();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "2px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h1 style={{ textAlign: "center" }}>記録フォーム</h1>
      <form>
        <div className="form-section" style={{ marginBottom: "20px" }}>
          <label htmlFor="worker">作業担当者:</label>
          <input 
            type="text" 
            id="worker" 
            name="worker" 
            placeholder="担当者名を記入" 
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>

        <div className="form-section" style={{ marginBottom: "20px" }}>
          <label htmlFor="repair-company">修理会社:</label>
          <input 
            type="text" 
            id="repair-company" 
            name="repair-company" 
            placeholder="修理会社名を記入" 
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>

        <div className="form-section" style={{ marginBottom: "20px" }}>
          <label htmlFor="management-company">管理会社名:</label>
          <input 
            type="text" 
            id="management-company" 
            name="management-company" 
            placeholder="管理会社名を記入" 
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>

        <div className="form-section" style={{ marginBottom: "20px" }}>
          <label htmlFor="signature">署名:</label>
          <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
            <SignaturePad ref={sigPadRef} />
          </div>
          <button 
            type="button" 
            onClick={clearSignature} 
            style={{ marginTop: "10px", padding: "10px 20px", border: "none", backgroundColor: "#f44336", color: "#fff", borderRadius: "5px", cursor: "pointer" }}
          >
            クリア
          </button>
        </div>

        <button 
          type="submit" 
          style={{ padding: "10px 20px", border: "none", backgroundColor: "#4CAF50", color: "#fff", borderRadius: "5px", cursor: "pointer", width: "100%" }}
        >
          送信
        </button>
      </form>
    </div>
  );
}
