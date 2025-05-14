"use client";

import { useRef } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm2() {
  const sigPadRef = useRef<SignaturePad>(null);

  const clearSignature = () => {
    sigPadRef.current?.clear();
  };

  return (
    <div className="container max-w-screen-lg mx-auto bg-white p-6 border shadow-md">
      <h1 className="text-center text-2xl font-bold mb-6">統合作業報告書</h1>

      {/* 署名と連絡先セクション */}
      <div className="section mb-10">
        <h2 className="section-title text-xl font-semibold mb-4">お客様署名と連絡先</h2>
        <div className="signature-box border border-black mb-4" style={{ height: "100px" }}>
          <SignaturePad
            ref={sigPadRef}
            canvasProps={{
              width: 600,
              height: 100,
              style: { border: "none", width: "100%" },
            }}
          />
        </div>
        <p>連絡先: 三井倉庫ロジスティクス株式会社</p>
        <p>TEL: 0120-12-7661 FAX: 048-442-3921</p>
      </div>

      <div className="footer text-center text-sm text-gray-500 mt-10">
        <p>2018年10月版 作業担当者 管理会社名</p>
      </div>
    </div>
  );
}
