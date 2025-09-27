import { useEffect, useState } from "react";
import { Dice, ScoreBoard } from "react-game-ui";
import { io } from "socket.io-client";
import { BoardCanvas } from "./components/BoardCanvas.jsx";
import { Piece } from "./components/Piece.jsx";

const socket = io("http://localhost:3000");

socket.on("message", data => console.log("サーバーからのメッセージ:", data));
socket.emit("joinGame", { playerId: "p1" });
socket.on("disconnect", () => console.log("サーバーとの接続が切れました"));

export default function Game() {
  const [players, setPlayers] = useState([
    { id: "p1", name: "human1", score: 0 },
    { id: "p2", name: "human2", score: 0 },
    { id: "p3", name: "wolf", score: 0 }
  ]);
  const [currentPlayerId, setCurrentPlayerId] = useState("p1");

  const [pieces, setPieces] = useState(() => [
    new Piece("human1", 1, 2, 0, "blue"),
    new Piece("human2", 1, 1, 0, "blue"),
    new Piece("wolf", 1, 0, 3, "red")
  ]);

  useEffect(() => {
    socket.on("players:update", setPlayers);
    socket.on("game:turn", setCurrentPlayerId);

    return () => {
      socket.off("players:update");
      socket.off("game:turn");
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100vh",
        padding: "20px", // ←全体に余白
        boxSizing: "border-box"
      }}
    >
      {/* 左にボード */}
      <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <BoardCanvas pieces={pieces} setPieces={setPieces} />
      </div>

      {/* 右側に UI */}
      <div style={{ width: "300px", position: "relative", padding: "10px" }}>
        {/* スコアボード（右上） */}
        <div style={{ position: "absolute", top: "80px", right: "80px" }}>
          <ScoreBoard socket={socket} players={players} currentPlayerId={currentPlayerId} />
        </div>

        {/* サイコロ（右下） */}
        <div style={{ position: "absolute", bottom: "80px", right: "80px" }}>
          <Dice socket={socket} diceId="0" sides={3} />
        </div>
      </div>
    </div>
  );
}
