"use client";
import { useRef, useEffect } from "react";
import SignaturePad from "react-signature-canvas";

type RequestKey = "修理" | "点検" | "改造" | "脱着";

export function ReportForm1() {
  const sigCanvas = useRef<SignaturePad | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = "/working_report1.png"; // publicディレクトリにあることを想定
      img.crossOrigin = "anonymous"; // 必要に応じてCORS対応
      img.onload = () => {
        // キャンバスサイズを固定する例
        canvas.width = 800; // 仮に幅800px
        canvas.height = 600; // 仮に高さ600px
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.onerror = () => {
        console.error("画像の読み込みに失敗しました。パスを再確認してください！");
      };
    }
  }, []);

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  return (
    <div className="relative max-w-full overflow-auto">
      {/* 背景画像キャンバス */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
      ></canvas>

      {/* 署名パッド */}
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{
          className: "absolute top-0 left-0 bg-transparent",
          width: 800, // 仮に指定。画像サイズに合わせて
          height: 600,
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
