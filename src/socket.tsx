import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

// --- 修正: import.meta.env のカスタム型定義を追加 ---
// これにより、TypeScriptが 'PROD' プロパティを認識できるようになります。
interface ImportMetaEnv {
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
// ---------------------------------------------------

// Webpack/Viteなどが提供する環境変数を使ってプロダクションかどうかを判断する
// import.meta.env.PROD が最も一般的で確実な方法です。
const isProd = import.meta.env.PROD; 

/**
 * Socket.IO接続を管理するカスタムフック。
 * プロダクション環境では、引数のURLを無視し、ブラウザの現在のオリジンに接続します。
 * 開発環境では、引数のURLを使用します（通常は 'http://localhost:4000'）。
 * * @param url - 開発環境で使用するSocketサーバーのURL。
 * @returns Socket.IOクライアントインスタンス。
 */
export function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // 魂を込めた修正ポイント: 
    // プロダクション（Render）では、ブラウザのURLをそのまま使う。
    // クライアントとサーバーが同じオリジンで動いているため、これで正しく公開URLに接続されます。
    const SOCKET_SERVER_URL = isProd ? window.location.origin : url;
    
    // 修正された URL で接続を試みる
    const s = io(SOCKET_SERVER_URL);
    setSocket(s);

    s.on("connect", () => {
      console.log("🚀 Socket Connected!", s.id, "Destination:", SOCKET_SERVER_URL);
    });
    s.on("connect_error", (err) => console.log("connect_error", err));

    return () => {
      s.disconnect();
    };
  }, [url]);

  return socket!;
}
