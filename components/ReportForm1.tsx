"use client";
import { useRef, useEffect } from "react";
import SignaturePad from "react-signature-canvas";

type RequestKey = "修理" | "点検" | "改造" | "脱着";

export function ReportForm1() {
  const sigCanvas = useRef<SignaturePad | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 背景画像をキャンバスに描画
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = "/working_report1.png"; // 背景画像のパス
      img.onload = () => {
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, []);

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* 背景画像キャンバス */}
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

      {/* 操作ボタン */}
      <div className="absolute bottom-0 left-0 p-4">
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
