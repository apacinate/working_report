"use client";

import { useRef } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm1() {
  const sigPadRef = useRef<SignaturePad>(null);

  const clearSignature = () => {
    sigPadRef.current?.clear();
  };

  return (
    <div className="container max-w-screen-lg mx-auto bg-white p-6 border shadow-md">
      <h1 className="text-center text-2xl font-bold mb-6">統合作業報告書</h1>

      {/* 受付番号と作業内容セクション */}
      <div className="section mb-10">
        <h2 className="section-title text-xl font-semibold mb-4">受付番号と作業内容</h2>
        <table className="w-full border-collapse mb-6">
          <tbody>
            <tr>
              <th className="border p-2 bg-gray-100">受付番号</th>
              <td className="border p-2"></td>
            </tr>
            <tr>
              <th className="border p-2 bg-gray-100">作業実施日</th>
              <td className="border p-2">20__年__月__日</td>
            </tr>
            <tr>
              <th className="border p-2 bg-gray-100">機種名</th>
              <td className="border p-2">Flair / Evolution / Sinfonia / Spectra</td>
            </tr>
            <tr>
              <th className="border p-2 bg-gray-100">故障コード</th>
              <td className="border p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 動作点検セクション */}
      <div className="section mb-10">
        <h2 className="section-title text-xl font-semibold mb-4">動作点検</h2>
        <div className="checkbox-container flex gap-4 mb-6">
          <div className="checkbox-item flex items-center">
            <input type="checkbox" id="extraction" className="mr-2" />
            <label htmlFor="extraction">抽出ライン</label>
          </div>
          <div className="checkbox-item flex items-center">
            <input type="checkbox" id="milkline" className="mr-2" />
            <label htmlFor="milkline">ミルクライン</label>
          </div>
          <div className="checkbox-item flex items-center">
            <input type="checkbox" id="extractionUnit" className="mr-2" />
            <label htmlFor="extractionUnit">抽出ユニット</label>
          </div>
          <div className="checkbox-item flex items-center">
            <input type="checkbox" id="boilerPressure" className="mr-2" />
            <label htmlFor="boilerPressure">ボイラー圧</label>
          </div>
        </div>
      </div>

      {/* 修理結果セクション */}
      <div className="section mb-10">
        <h2 className="section-title text-xl font-semibold mb-4">修理結果</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100">No</th>
              <th className="border p-2 bg-gray-100">部品番号</th>
              <th className="border p-2 bg-gray-100">部品名称</th>
              <th className="border p-2 bg-gray-100">数量</th>
              <th className="border p-2 bg-gray-100">部品コードⅠ</th>
              <th className="border p-2 bg-gray-100">部品コードⅡ</th>
              <th className="border p-2 bg-gray-100">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">1</td>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
              <td className="border p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

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
