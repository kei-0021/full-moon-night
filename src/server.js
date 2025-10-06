// src/server.js
import fs from 'fs';
import { createServer } from "http";
import path, { dirname } from "path";
import { initGameServer } from "react-game-ui/server-logic";
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
// import mime from 'mime-types'; // 💥 外部依存を削除！

// --- パス解決 ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const APP_ROOT = path.join(__dirname, '..'); 
const appDist = path.join(APP_ROOT, "dist"); 

// --- MIMEタイプ代替マップ ---
// 💥 必須: 外部パッケージを使わない代替策
const mimeTypeMap = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    // 他に必要な静的ファイルタイプがあれば追加
};

// --- サーバー初期化 ---
const app = (req, res) => {
    const urlPath = req.url.split('?')[0];
    let filePath = path.join(appDist, urlPath);

    // 1. ファイルが存在するかチェック
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        // 💥 修正: 自前のマップからMIMEタイプを取得
        const contentType = mimeTypeMap[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    } else {
        // 2. ファイルが見つからない場合、index.htmlを返す（フォールバック）
        const indexPath = path.join(appDist, 'index.html');
        if (fs.existsSync(indexPath)) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            fs.createReadStream(indexPath).pipe(res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found: Index file missing.');
        }
    }
};

// --- Socket.IO/ゲームロジック ---
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// ライブラリの Socket.IO ロジックを初期化
initGameServer(io);

// --- サーバー起動 ---
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`full-moon-night server running on port ${PORT} (production: ${process.env.NODE_ENV === "production"})`);
});