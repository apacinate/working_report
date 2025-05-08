"use client";

import { useRef } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm2() {
  const sigPadRef = useRef<SignaturePad>(null);

  const clearSignature = () => {
    sigPadRef.current?.clear();
  };

  return (
    <div className="relative w-full min-h-screen bg-[#b0e0e6] p-4">
      {/* 作業報告書レイアウト */}
      <div className="bg-white mx-auto max-w-3xl p-6 shadow-md" id="report-content">
        <h1 className="text-center text-xl font-bold mb-6">作業報告書 (店舗控え)</h1>

        {/* 各セクション */}
        <div className="mb-4">
          <div className="font-bold bg-gray-100 p-2">受付番号</div>
          <table className="w-full border-collapse mt-2">
            <tbody>
              <tr>
                <th className="border p-2 bg-gray-300">店舗名</th>
                <td className="border p-2" colSpan={3}>Flair / Evolution / Sinphonia</td>
              </tr>
              <tr>
                <th className="border p-2 bg-gray-300">作業実施日</th>
                <td className="border p-2">20 年 月 日</td>
                <th className="border p-2 bg-gray-300">日時区分</th>
                <td className="border p-2">平日・土日祝日</td>
              </tr>
              <tr>
                <th className="border p-2 bg-gray-300">出動件数</th>
                <td className="border p-2">件</td>
                <th className="border p-2 bg-gray-300">ポイント数</th>
                <td className="border p-2">点</td>
              </tr>
              <tr>
                <th className="border p-2 bg-gray-300">機種名</th>
                <td className="border p-2" colSpan={3}>Spectra / Purat / FM850</td>
              </tr>
              <tr>
                <th className="border p-2 bg-gray-300">オプション</th>
                <td className="border p-2" colSpan={3}>冷蔵庫 / 冷凍庫 / 氷</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 故障コード */}
        <div className="mb-4">
          <div className="font-bold bg-gray-100 p-2">故障コード</div>
          <table className="w-full border-collapse mt-2">
            <tbody>
              <tr>
                <th className="border p-2 bg-gray-300">故障コード</th>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <th className="border p-2 bg-gray-300">詳細</th>
                <td className="border p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 動作点検 */}
        <div className="mb-4">
          <div className="font-bold bg-gray-100 p-2">動作点検</div>
          <table className="w-full border-collapse mt-2">
            <tbody>
              <tr>
                <td className="border p-2"><div className="inline-block w-5 h-5 border border-black mr-2"></div>抽出ライン</td>
                <td className="border p-2"><div className="inline-block w-5 h-5 border border-black mr-2"></div>ミルクライン</td>
                <td className="border p-2"><div className="inline-block w-5 h-5 border border-black mr-2"></div>抽出ユニット</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 署名エリア */}
        <div className="mb-4">
          <div className="font-bold bg-gray-100 p-2">署名</div>
          <div className="border mt-2">
            <SignaturePad
              ref={sigPadRef}
              canvasProps={{
                width: 600,
                height: 200,
                style: {
                  border: "1px solid #ccc",
                  width: "100%",
                  touchAction: "none",
                },
              }}
            />
          </div>
        </div>

        {/* 操作ボタン */}
        <div className="mb-4">
          <button
            onClick={clearSignature}
            className="w-full bg-red-600 text-white py-2 rounded"
          >
            署名をクリア
          </button>
        </div>
      </div>
    </div>
  );
}
