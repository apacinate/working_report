"use client";
import { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";


export function ReportForm1() {
  const sigCanvas = useRef<SignaturePad>(null);
  const [requests, setRequests] = useState({
    修理: false,
    点検: false,
    改造: false,
    脱着: false,
  });

  function toggleRequest(key: string) {
    setRequests((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">作業報告書</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label>作業実施日：</label>
          <input type="date" className="border p-1 w-full" />
        </div>
        <div>
          <label>受付番号：</label>
          <input type="text" className="border p-1 w-full" />
        </div>
      </div>

      <div className="mb-4">
        <label>機種名：</label>
        <select className="border p-1 w-full">
          <option>Flair</option>
          <option>Evolution</option>
          <option>Sinfonia</option>
          <option>Spectra</option>
        </select>
      </div>

      <div className="mb-4">
        <label>依頼内容：</label>
        <div className="flex gap-2">
          {Object.keys(requests).map((key) => (
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
      </div>

      <div className="mb-4">
        <label>診断内容・作業内容：</label>
        <textarea className="border p-2 w-full h-24"></textarea>
      </div>

      <div className="mb-4">
        <label>署名（サイン）：</label>
        <SignaturePad
          ref={sigCanvas}
          canvasProps={{ className: "border w-full h-32" }}
        />
        <button
          type="button"
          onClick={() => sigCanvas.current.clear()}
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