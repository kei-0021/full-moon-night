import fs from "fs"; // fsモジュールをインポートに追加
import path from "path";
import { fileURLToPath } from "url"; // __dirname のために必要

// ライブラリからGameServerをインポート
import { GameServer } from "react-game-ui/server";
import { cardEffects } from "../public/data/cardEffects.js";

// ------------------------------------------------------------------
// --- 互換性確保のためのJSON読み込み ---
// ------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** 互換性の高いJSON読み込み関数 */
function loadJson(relativePath) {
  const fullPath = path.join(__dirname, relativePath); 
  try {
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ JSON ファイルが見つかりません: ${fullPath}`);
      return [];
    }
    return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
  } catch (err) {
    console.error(`❌ JSON のパースに失敗: ${fullPath}`);
    console.error(err);
    return [];
  }
}

// ------------------------------------------------------------------
// --- データ読み込み ---
// ------------------------------------------------------------------

const itemDeckJson = loadJson("../public/data/itemCards.json");
const lightDeckJson = loadJson("../public/data/lightCards.json");

const initialDecks = [
  { deckId: "item", name: "アイテムカード", cards: itemDeckJson, backColor: "#c25656ff" },
  { deckId: "light", name: "光カード", cards: lightDeckJson, backColor: "#7e6d36ff" },
];

// ------------------------------------------------------------------
// --- GameServerの利用 (Render対応のまま) ---
// ------------------------------------------------------------------

// GameServerの利用 (データとパスはここで確定して渡す)
const demoServer = new GameServer({
  // Render環境では process.env.PORT が優先されるため、ローカル用の設定はそのまま
  port: 4000,
  // path.resolve(__dirname, '..', 'dist') は、server.jsから見てdistフォルダを指す正確なパス
  clientDistPath: path.resolve(__dirname, '..', 'dist'), 
  
  corsOrigins: ["http://localhost:5173", "http://localhost:4000"],
  onServerStart: (url) => {
    console.log(`🎮 Demo server running at: ${url}`);
  },
  initialDecks, // 読み込まれたデータ
  cardEffects // 読み込まれたデータ
});

demoServer.start();
