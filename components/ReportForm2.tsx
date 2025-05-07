"use client"

import { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm2() {
    const sigCanvas = useRef<SignaturePad | null>(null); // 型を指定し、初期値をnullに設定
    const [reasonCode, setReasonCode] = useState("");
    const [workCode, setWorkCode] = useState("");

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
            <img
                src="/working_report2.png"
                alt="記載方法フォーム"
                className="w-full"
            />
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

                <div className="mb-4">
                    <SignaturePad
                        ref={sigCanvas}
                        canvasProps={{ className: "border w-full h-32 bg-transparent" }}
                    />
                    <button
                        type="button"
                        onClick={() => sigCanvas.current?.clear()} // ?.を使い安全に呼び出し
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
