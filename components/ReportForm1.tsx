"use client";

import { useRef, useEffect } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm1() {
  const sigCanvas = useRef<SignaturePad | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = "/working_report1.png";
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

  return (
    <div className="w-full h-screen overflow-auto touch-manipulation">
      <div
        className="relative mx-auto border shadow"
        style={{
          width: "100%",
          maxWidth: 800,
          touchAction: "none", // SignaturePadがタッチイベントを独占しないように調整
        }}
      >
        {/* ズーム可能なラッパー */}
        <div
          className="relative"
          style={{
            width: "100%",
            aspectRatio: "800 / 1131",
            overflow: "hidden",
          }}
        >
          {/* 背景キャンバス */}
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          ></canvas>

          {/* サインキャンバス */}
          <SignaturePad
            ref={sigCanvas}
            canvasProps={{
              style: {
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
              },
            }}
          />
        </div>

        {/* 操作UI */}
        <div className="p-4 bg-white z-10 relative">
          <button
            onClick={clearSignature}
            className="bg-red-500 text-white px-4 py-2 rounded w-full"
          >
            署名をクリア
          </button>
        </div>
      </div>
    </div>
  );
}
