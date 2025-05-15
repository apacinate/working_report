"use client";

import { useRef, useEffect, useState } from "react";
import SignaturePad from "react-signature-canvas";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export function ReportForm1() {
  const sigCanvas = useRef<SignaturePad | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showSecondPage, setShowSecondPage] = useState(false); // 2ページ目の表示状態を管理

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = "/working_report1.png"; // 1ページ目の画像
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

  const showSecondPageHandler = () => {
    setShowSecondPage(true); // 2ページ目を表示する
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-gray-100">
      <TransformWrapper>
        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
          <div
            className="relative mx-auto"
            style={{
              width: "100%",
              maxWidth: 800,
              aspectRatio: "800 / 1131",
              minHeight: "400px",
            }}
          >
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
            />

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
                  backgroundColor: "transparent",
                },
              }}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md z-50">
        <button
          onClick={clearSignature}
          className="bg-red-500 text-white px-4 py-2 rounded w-full mb-2"
        >
          署名をクリア
        </button>
        <button
          onClick={showSecondPageHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          次のページを追加
        </button>
      </div>

      {showSecondPage && (
        <div
          className="relative mx-auto mt-4 bg-white shadow-md"
          style={{
            width: "100%",
            maxWidth: 800,
            aspectRatio: "800 / 1131",
            minHeight: "400px",
          }}
        >
          <img
            src="/working_report2.png" // 添付画像のパスを指定
            alt="追加ページ"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
