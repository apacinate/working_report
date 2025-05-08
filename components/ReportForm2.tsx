"use client";

import { useRef } from "react";
import SignaturePad from "react-signature-canvas";

export function ReportForm2() {
  const sigPadRef = useRef<SignaturePad>(null);

  const clearSignature = () => {
    sigPadRef.current?.clear();
  };

  return (
    <div className="container max-w-screen-lg mx-auto bg-white p-6 border shadow-md">
      <h1 className="text-center text-2xl font-bold mb-6">統合作業報告書</h1>

      {/* Displaying the HTML content in JSX format */}
      <div dangerouslySetInnerHTML={{
        __html: `
        <!DOCTYPE html>
        <html lang="ja">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>作業報告書 (店舗控え)</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f7f7f7;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    background: #fff;
                    padding: 20px;
                    border: 1px solid #ccc;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    text-align: center;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #ccc;
                    padding: 10px;
                    text-align: left;
                }
                th {
                    background: #f0f0f0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>作業報告書 (店舗控え)</h1>
                <table>
                    <tr>
                        <th>受付番号</th>
                        <td colspan="3"></td>
                        <th>作業実施日</th>
                        <td>20__年__月__日</td>
                        <th>日付区分</th>
                        <td>平日・土日祝日</td>
                    </tr>
                    <tr>
                        <th>店舗名</th>
                        <td colspan="3"></td>
                        <th>作業時間</th>
                        <td>～</td>
                        <th>時間区分</th>
                        <td>早朝・夜間・深夜</td>
                    </tr>
                    <tr>
                        <th>機種名</th>
                        <td colspan="3">Flair/Evolution/Sinphoniaなど</td>
                        <th>出荷年月</th>
                        <td>20__年__月__日</td>
                        <th>シリアルNo.</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>保証開始日</th>
                        <td>20__年__月__日</td>
                        <th>保証終了日</th>
                        <td>20__年__月__日</td>
                        <th colspan="4"></th>
                    </tr>
                </table>
        
                <h2>作業内容</h2>
                <table>
                    <tr>
                        <td>修理</td>
                        <td>定期点検</td>
                        <td>設置</td>
                        <td>撤去</td>
                        <td>消耗品</td>
                        <td>その他</td>
                    </tr>
                </table>
            </div>
        </body>
        </html>
        `
      }} />

      {/* 署名と連絡先セクション */}
      <div className="section mb-10">
        <h2 className="section-title text-xl font-semibold mb-4">お客様署名と連絡先</h2>
        <div className="signature-box border border-black mb-4" style={{ height: "100px" }}>
          <SignaturePad
            ref={sigPadRef}
            canvasProps={{
              width: 600,
              height: 100,
              style: { border: "none", width: "100%" },
            }}
          />
        </div>
        <p>連絡先: 三井倉庫ロジスティクス株式会社</p>
        <p>TEL: 0120-12-7661 FAX: 048-442-3921</p>
      </div>

      <div className="footer text-center text-sm text-gray-500 mt-10">
        <p>2018年10月版 作業担当者 管理会社名</p>
      </div>
    </div>
  );
}
