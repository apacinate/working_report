"use client";
import { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";

type RequestKey = "修理" | "点検" | "改造" | "脱着";

export function ReportForm1() {
  const sigCanvas = useRef<SignaturePad>(null);
  const [requests, setRequests] = useState<Record<RequestKey, boolean>>({
    修理: false,
    点検: false,
    改造: false,
    脱着: false,
  });

  function toggleRequest(key: RequestKey) {
    setRequests((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="relative max-w-4xl mx-auto">
    <img
      src="/form1-background.png"
      alt="作業報告書"
      className="w-full"
    />
    <div className="absolute top-0 left-0 w-full h-full p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input type="date" className="border p-1 w-full" />
        <input type="text" className="border p-1 w-full" />
      </div>

      <select className="border p-1 w-full mb-4">
        <option>Flair</option>
        <option>Evolution</option>
        <option>Sinfonia</option>
        <option>Spectra</option>
      </select>

      <div className="flex gap-4 mb-4">
        {(Object.keys(requests) as RequestKey[]).map((key) => (
            <label key={key}>
                <input
                type="checkbox"
                checked={requests[key]}
                onChange={() => toggleRequest(key)}
                />
                {key}
            </label>
        ))}
      </div>

      <textarea className="border p-2 w-full h-24 mb-4"></textarea>

      <div className="mb-4">
        <SignaturePad
          ref={sigCanvas}
          canvasProps={{
            className: "border w-full h-32 bg-transparent",
          }}
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
  </div>
  );
}
