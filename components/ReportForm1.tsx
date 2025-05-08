"use client";

import { useRef, useEffect, useState } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm1() {
  const sigCanvas = useRef<SignaturePad | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scale, setScale] = useState(1); // 拡大縮小のスケール状態

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = "/working_report1.png"; // 背景画像のパス
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
      };
    }
  }, []);

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const handlePinchZoom = (event: React.WheelEvent<HTMLDivElement>) => {
    const newScale = Math.min(Math.max(scale + event.deltaY * -0.01, 0.5), 3); // 拡大縮小範囲0.5〜3
    setScale(newScale);
  };

  return (
    <div
      className="relative max-w-full overflow-auto border shadow"
      onWheel={handlePinchZoom} // 拡大縮小イベントをキャッチ
      style={{
        transform: `scale(${scale})`, // 現在のスケールを適用
        transformOrigin: "center center", // 拡大の中心
      }}
    >
      {/* 背景キャンバス */}
      <canvas
        ref={canvasRef}
        width={800}
        height={1131}
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

      {/* 操作ボタン */}
      <div className="absolute bottom-4 left-4">
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
