"use client";

import { useRef } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm2() {
  const sigPadRef = useRef<SignaturePad>(null);

  const clearSignature = () => {
    sigPadRef.current?.clear();
  };

  return (
    <div>
      <h1>記録フォーム</h1>
      <form>
        <div className="form-section">
          <label htmlFor="worker">作業担当者:</label>
          <input type="text" id="worker" name="worker" placeholder="担当者名を記入" />
        </div>

        <div className="form-section">
          <label htmlFor="repair-company">修理会社:</label>
          <input type="text" id="repair-company" name="repair-company" placeholder="修理会社名を記入" />
        </div>

        <div className="form-section">
          <label htmlFor="management-company">管理会社名:</label>
          <input type="text" id="management-company" name="management-company" placeholder="管理会社名を記入" />
        </div>

        <div className="form-section">
          <label htmlFor="signature">署名:</label>
          <SignaturePad ref={sigPadRef} />
          <button type="button" onClick={clearSignature}>クリア</button>
        </div>

        <button type="submit">送信</button>
      </form>
    </div>
  );
}
