"use client";

import { useRef } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm2() {
  const workerSigPadRef = useRef<SignaturePad>(null);
  const repairCompanySigPadRef = useRef<SignaturePad>(null);
  const managementCompanySigPadRef = useRef<SignaturePad>(null);

  const clearSignature = (ref: React.MutableRefObject<SignaturePad | null>) => {
    ref.current?.clear();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "2px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h1 style={{ textAlign: "center" }}>記録フォーム</h1>
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
