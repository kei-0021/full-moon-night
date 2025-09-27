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
    <div style={{ textAlign: "center" }}>
      <BoardCanvas pieces={pieces} setPieces={setPieces} />

      {/* スコアボードとサイコロ */}
      <div style={{ marginTop: "20px", display: "inline-block" }}>
        <Dice socket={socket} diceId="0" sides={3} />
        <ScoreBoard socket={socket} players={players} currentPlayerId={currentPlayerId} />
      </div>
    </div>
  );
}
