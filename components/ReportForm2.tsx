"use client";

import { useRef, useEffect, useState } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm2() {
  const sigCanvas = useRef<SignaturePad | null>(null); // 型指定と初期値
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // 背景描画用キャンバス
  const [reasonCode, setReasonCode] = useState("");
  const [workCode, setWorkCode] = useState("");

  useEffect(() => {
    // 背景画像をキャンバスに描画
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = "/working_report2.png"; // 背景画像のパス
      img.onload = () => {
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
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
    <div className="relative max-w-4xl mx-auto">
      {/* 背景画像をキャンバスに描画 */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>

      {/* 署名パッド */}
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{
          className: "absolute top-0 left-0 w-full h-full bg-transparent",
        }}
      />

      {/* 入力フォーム */}
      <div className="absolute top-0 left-0 w-full h-full p-4">
        <select
          className="border p-1 w-full mb-4"
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

        <select
          className="border p-1 w-full mb-4"
          value={workCode}
          onChange={(e) => setWorkCode(e.target.value)}
        >
          <option value="">選択してください</option>
          <option value="A">再販使用品・通常使用品</option>
          <option value="B">再販使用品・初期不良</option>
          <option value="D">再販使用品・部品レベル</option>
          <option value="X">法定廃品</option>
        </select>

        <button
          onClick={clearSignature}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          署名をクリア
        </button>
      </div>
    </div>
  );
}
