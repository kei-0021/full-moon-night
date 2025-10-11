#!/usr/bin/env node
// expressとsocket.ioはrequire()でインポート (インポートエラー対策)
import express from "express";
import fs from "fs";
import { createServer } from "http";
import path from "path";
import { Server as SocketIOServer } from "socket.io";
import { fileURLToPath } from "url";

// 💥 修正: server-logic.js をライブラリのパスからインポート
import { initGameServer } from "react-game-ui/server-logic";
import { cardEffects } from "../public/data/cardEffects.js";

// ------------------------------------------------------------------
// --- I. パス解決とJSON読み込みヘルパー ---
// ------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_PATH = path.resolve("dist");
// Render環境変数PORTを優先し、ローカル環境では3000をフォールバックとして使用
const PORT = process.env.PORT || 3000; 

// JSON 読み込みヘルパー
function loadJson(filename) {
  const fullPath = path.join(__dirname, "..", "public", filename); 
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ JSON ファイルが見つかりません: ${fullPath}`);
    process.exit(1); 
  }
  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
  } catch (err) {
    console.error(`❌ JSON のパースに失敗: ${fullPath}`);
    console.error(err);
    process.exit(1);
  }
}

// ------------------------------------------------------------------
// --- II. データ読み込み ---
// ------------------------------------------------------------------

const itemDeckJson = loadJson("data/itemCards.json"); 
const lightDeckJson = loadJson("data/lightCards.json");

const initialDecks = [
  { deckId: "item", name: "アイテムカード", cards: itemDeckJson, backColor: "#c25656ff" },
  { deckId: "light", name: "光カード", cards: lightDeckJson, backColor: "#7e6d36ff" },
];

// ------------------------------------------------------------------
// --- III. ExpressとSocket.IOの設定 ---
// ------------------------------------------------------------------

const app = express();
const httpServer = createServer(app);
const corsOrigins = ["http://localhost:5173", "http://localhost:3000"];

const io = new SocketIOServer(httpServer, {
  cors: { origin: corsOrigins, methods: ["GET", "POST"] },
});

// 1. 静的ファイル配信
// Renderのログに合わせて、静的ファイルのパスは '/opt/render/project/src/dist' になることを確認
const STATIC_DIST_PATH = path.resolve(__dirname, '..', 'dist'); // 正しい絶対パスを取得
if (fs.existsSync(STATIC_DIST_PATH)) {
    app.use(express.static(STATIC_DIST_PATH)); 
    console.log(`[Express] Serving static files from: ${STATIC_DIST_PATH}`);
} else {
    console.error(`❌ [Express] Client dist folder not found at: ${STATIC_DIST_PATH}. Check build step.`);
}

// 2. SPA (Single Page Application)対応
const indexPath = path.join(STATIC_DIST_PATH, "index.html");
if (fs.existsSync(indexPath)) {
    app.get("/", (_req, res) => {
        // 🚨 修正: ポート情報の動的挿入ロジックを完全に削除し、純粋にHTMLを返す。
        // クライアント側で window.location.origin を使って接続させる。
        res.sendFile(indexPath); 
    });
} else {
    app.get("/", (_req, res) =>
        res.send("<h1>Client app not configured (index.html missing).</h1>")
    );
}

// 3. ゲームロジックの初期化
try {
    initGameServer(io, {
        initialDecks: initialDecks,
        cardEffects: cardEffects,
    });
} catch (err) {
    console.error("[Server] Failed to initialize game server logic:", err);
}


// --- サーバー起動 ---
httpServer.listen(PORT, () => {
    // 起動が成功したポートをログに出力（デバッグ用）
    const actualPort = httpServer.address().port;
    const url = `http://localhost:${actualPort}`;
    console.log(`🎮 Express/Socket server running at: ${url}`);
    
    console.log("Server started, decks loaded:");
    console.log(" - itemDeck:", itemDeckJson.length, "cards");
    console.log(" - lightDeck:", lightDeckJson.length, "cards");
    console.log(" - cardEffects:", Object.keys(cardEffects).length, "effects");
});
