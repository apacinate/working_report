"use client";

import { useRef, useEffect, useState } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm1() {
  const sigCanvas = useRef<SignaturePad | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

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

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.min(3, Math.max(0.5, scale - e.deltaY * 0.001));
    setScale(newScale);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      const dx = e.touches[0].clientX - start.x;
      const dy = e.touches[0].clientY - start.y;
      setTranslate({
        x: translate.x + dx,
        y: translate.y + dy,
      });
      setStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* ズーム・移動可能な領域 */}
      <div className="flex-1 overflow-hidden relative">
        <div
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: "0 0",
            width: 800,
            height: 1131,
            margin: "0 auto",
            position: "relative",
            touchAction: "none",
          }}
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={1131}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          />

          <SignaturePad
            ref={sigCanvas}
            canvasProps={{
              width: 800,
              height: 1131,
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
              },
            }}
          />
        </div>
      </div>

      {/* フッターにボタン固定 */}
      <div className="p-4 bg-white shadow-md sticky bottom-0 z-50">
        <button
          onClick={clearSignature}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          署名をクリア
        </button>
      </div>
    </div>
  );
}
