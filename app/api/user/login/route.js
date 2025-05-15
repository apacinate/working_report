import {  NextResponse } from "next/server"

export async function POST(){
    const reqBody = await request.json()

    try{
           // ヘッダーから API トークンを取得
        const token = request.headers.get("X-HD-apitoken");
        
        if (!token) {
            // APIトークンがない場合はエラーを返す
            return NextResponse.json({ message: "APIトークンが必要です" }, { status: 401 });
        }

        // APIトークンが正しいかどうかの検証ロジックを追加
        const isValidToken = await verifyToken(token);
        if (!isValidToken) {
            return NextResponse.json({ message: "無効なAPIトークンです" }, { status: 403 });
        }
        
        return NextResponse.json({message:"ログイン成功"})
    } catch{
        return NextResponse.json({message:"ログイン失敗"})
    }

}
