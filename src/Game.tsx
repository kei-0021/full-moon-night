// src/Game.tsx
import { useEffect, useState } from "react";
import type { Player } from "react-game-ui";
import { Dice, ScoreBoard } from "react-game-ui";
import { io, Socket } from "socket.io-client";
import { BoardCanvas } from "./components/BoardCanvas";
import { Piece } from "./components/Piece";

// --- 型定義 ---
interface ServerToClientEvents {
  message: (data: string) => void;
  "game:turn": (playerId: Player["id"]) => void;
  "players:update": (players: Player[]) => void;
}

interface ClientToServerEvents {
  joinGame: (data: { playerId: Player["id"] }) => void;
}

// --- ソケット接続 ---
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

socket.on("message", (data) => console.log("サーバーからのメッセージ:", data));
socket.emit("joinGame", { playerId: "p1" });
socket.on("disconnect", (reason) => console.log("サーバーとの接続が切れました", reason));

export default function Game() {
  // プレイヤーリスト
  const [players, setPlayers] = useState<Player[]>([]);

  // 現在のプレイヤーID
  const [currentPlayerId, setCurrentPlayerId] = useState<Player["id"]>("p1");

  // ボード上の駒
  const [pieces, setPieces] = useState<Piece[]>([
    new Piece("human1", "1", 2, 0, "blue"),
    new Piece("human2", "1", 1, 0, "blue"),
    new Piece("wolf", "1", 0, 3, "red"),
  ]);

  // --- ソケットイベント登録 ---
  useEffect(() => {
    const handlePlayersUpdate = (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
      console.log("players:update 受信:", updatedPlayers);
    };

    const handleGameTurn = (playerId: Player["id"]) => {
      setCurrentPlayerId(playerId);
      console.log("game:turn 受信, 現在のターンプレイヤー:", playerId);
    };

    socket.on("connect", () => console.log("✅ connected:", socket.id));
    socket.on("connect_error", (err) => console.error("❌ connect_error:", err));
    socket.on("disconnect", (reason) => console.log("サーバーとの接続が切れました", reason));
    socket.on("players:update", handlePlayersUpdate);
    socket.on("game:turn", handleGameTurn);

    // クリーンアップ
    return () => {
      socket.off("players:update", handlePlayersUpdate);
      socket.off("game:turn", handleGameTurn);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* 左にボード */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <BoardCanvas pieces={pieces} setPieces={setPieces} />
      </div>

      {/* 右側に UI */}
      <div style={{ width: "300px", position: "relative", padding: "10px" }}>
        {/* スコアボード */}
        <div style={{ position: "absolute", top: "80px", right: "80px" }}>
          <ScoreBoard socket={socket} players={players} currentPlayerId={currentPlayerId} />
        </div>

        {/* サイコロ */}
        <div style={{ position: "absolute", bottom: "80px", right: "80px" }}>
          <Dice socket={socket} diceId="0" sides={3} />
        </div>
      </div>
    </div>
  );
}
