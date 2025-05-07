"use client";
import { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm2() {
  const sigCanvas = useRef<SignaturePad>(null);
  const [reasonCode, setReasonCode] = useState("");
  const [workCode, setWorkCode] = useState("");

  const items = [
    { code: "A01", reason: "清掃不足（パウダー）" },
    { code: "A02", reason: "清掃不足（ミルク）" },
    { code: "A03", reason: "清掃不足（FS）" },
    { code: "B01", reason: "初期不良（設置1ヶ月未満）" },
    { code: "C01", reason: "経年劣化" },
    { code: "D01", reason: "定期点検・改造・撤去・交換など" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">作業報告書 記載方法</h1>

      <div className="mb-4">
        <label>故障原因コード：</label>
        <select
          className="border p-1 w-full"
          value={reasonCode}
          onChange={(e) => setReasonCode(e.target.value)}
        >
          <option value="">選択してください</option>
          {items.map((item) => (
            <option key={item.code} value={item.code}>
              {item.code} - {item.reason}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label>作業区分コード：</label>
        <select
          className="border p-1 w-full"
          value={workCode}
          onChange={(e) => setWorkCode(e.target.value)}
        >
          <option value="">選択してください</option>
          <option value="A">再販使用品・通常使用品</option>
          <option value="B">再販使用品・初期不良</option>
          <option value="D">再販使用品・部品レベル</option>
          <option value="X">法定廃品</option>
        </select>
      </div>

      <div className="mb-4">
        <label>署名（サイン）：</label>
        <SignaturePad
          ref={sigCanvas}
          canvasProps={{ className: "border w-full h-32" }}
        />
        <button
          type="button"
          onClick={() => sigCanvas.current?.clear()}
          className="mt-2 text-sm text-red-500"
        >
          署名クリア
        </button>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        提出する
      </button>
    </div>
  );
}