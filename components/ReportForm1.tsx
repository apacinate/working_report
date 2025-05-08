"use client";

import { useRef, useEffect, useState } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm1() {
  const sigCanvas = useRef<SignaturePad | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reasonCode, setReasonCode] = useState("");
  const [workCode, setWorkCode] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = "/working_report1.png"; // publicフォルダ内に配置すること
      img.onload = () => {
        // キャンバスサイズを画像に合わせて設定
        canvas.width = img.width;
        canvas.height = img.height;

        ctx?.drawImage(img, 0, 0);
      };
    }
  }, []);

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const items = [
    { code: "A01", reason: "清掃不足（パウダー）" },
    { code: "A02", reason: "清掃不足（ミルク）" },
    { code: "A03", reason: "清掃不足（FS）" },
    { code: "B01", reason: "初期不良（設置1ヶ月未満）" },
    { code: "C01", reason: "経年劣化" },
    { code: "D01", reason: "定期点検・改造・撤去・交換など" },
  ];

  return (
    <div className="relative max-w-4xl mx-auto border shadow">
      {/* 背景キャンバス */}
      <canvas
        ref={canvasRef}
        width={800}  // 画像の実際の幅に合わせる
        height={1131} // 画像の実際の高さに合わせる
        className="absolute top-0 left-0"
      ></canvas>

      {/* サインキャンバス */}
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{
          width: 800,
          height: 1131,
          className: "absolute top-0 left-0 bg-transparent",
        }}
      />

      {/* 入力UIと操作 */}
      <div className="absolute top-0 left-0 p-4 w-full">
        <select
          className="border p-1 mb-2 w-full"
          value={reasonCode}
          onChange={(e) => setReasonCode(e.target.value)}
        >
          <option value="">選択してください（理由コード）</option>
          {items.map((item) => (
            <option key={item.code} value={item.code}>
              {item.code} - {item.reason}
            </option>
          ))}
        </select>

        <select
          className="border p-1 mb-4 w-full"
          value={workCode}
          onChange={(e) => setWorkCode(e.target.value)}
        >
          <option value="">選択してください（作業コード）</option>
          <option value="A">再販使用品・通常使用品</option>
          <option value="B">再販使用品・初期不良</option>
          <option value="D">再販使用品・部品レベル</option>
          <option value="X">法定廃品</option>
        </select>

        <button
          onClick={clearSignature}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          署名をクリア
        </button>
      </div>
    </div>
  );
}
