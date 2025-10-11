// GameLogic.tsx
import React, { useEffect, useState } from "react";
import { Deck, ScoreBoard } from "react-game-ui";
import "react-game-ui/dist/react-game-ui.css";
import { io, Socket } from "socket.io-client";

// --- 型定義 ---
export interface Piece {
  id: string;
  type: "thief" | "guard";
  x: number;
  y: number;
  lightRange?: number;
}

export interface MapTile {
  type: "floor" | "shadow";
}

interface Player {
  id: string;
  name: string;
  score?: number;
}

interface ServerToClientEvents {
  message: (data: string) => void;
  "player:assign-id": (id: string) => void;
  "players:update": (players: Player[]) => void;
  "game:turn": (playerId: string) => void;
}

interface ClientToServerEvents {
  "deck:add": (data: { deckId: string; name: string; cards: any[] }) => void;
}

// --- ソケット接続 ---
// 🚨 修正: 固定されたURLではなく、ブラウザがアクセスしているオリジン (https://full-moon-night.onrender.com) を使用する
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(window.location.origin);

interface GameProps {
  rows: number;
  columns: number;
}

export const GameLogic: React.FC<GameProps> = ({ rows, columns }) => {
  const [myPlayerId, setMyPlayerId] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState<string>("");
  const [pieces, setPieces] = useState<Piece[]>([
    { id: "thief1", type: "thief", x: 0, y: 0 },
    { id: "guard1", type: "guard", x: columns - 1, y: rows - 1, lightRange: 2 },
  ]);

  // --- 盤面作成 ---
  const map: MapTile[][] = Array.from({ length: rows }, (_, y) =>
    Array.from({ length: columns }, (_, x) =>
      (x === 2 && y === 2) || (x === 1 && y === 3) ? { type: "shadow" } : { type: "floor" }
    )
  );

  // --- 初期処理 ---
  useEffect(() => {
    // 自分のID受信
    socket.on("player:assign-id", (id) => {
      console.log("自分のID:", id);
      setMyPlayerId(id);
    });

    // プレイヤー更新
    socket.on("players:update", (updatedPlayers) => {
      setPlayers(updatedPlayers);
      console.log("players:update:", updatedPlayers);
    });

    // ターン更新
    socket.on("game:turn", (playerId) => {
      setCurrentPlayerId(playerId);
      console.log("game:turn:", playerId);
    });

    socket.on("connect_error", (err) => console.error("connect_error:", err));
    socket.on("disconnect", (reason) => console.log("disconnect:", reason));

    // --- デッキ追加 ---
    const thiefDeck = [
      { id: "t1", deckId: "thiefDeck", name: "1マス右", onPlay: () => moveThief(1, 0) },
      { id: "t2", deckId: "thiefDeck", name: "影優先移動", onPlay: () => moveThiefPreferShadow() },
    ];
    const guardDeck = [
      { id: "g1", deckId: "guardDeck", name: "ライト+1", onPlay: () => adjustGuardLight(1) },
      { id: "g2", deckId: "guardDeck", name: "ライト消灯", onPlay: () => adjustGuardLight(0) },
      { id: "g3", deckId: "guardDeck", name: "ランダム移動", onPlay: () => moveGuardsRandom() },
    ];

    socket.emit("deck:add", { deckId: "thiefDeck", name: "泥棒カード", cards: thiefDeck });
    socket.emit("deck:add", { deckId: "guardDeck", name: "警備カード", cards: guardDeck });

    return () => {
      socket.off("player:assign-id");
      socket.off("players:update");
      socket.off("game:turn");
    };
  }, []);

  // --- 移動系 ---
  const moveThief = (dx: number, dy: number) => {
    setPieces((prev) =>
      prev.map((p) =>
        p.type === "thief"
          ? {
              ...p,
              x: Math.max(0, Math.min(p.x + dx, columns - 1)),
              y: Math.max(0, Math.min(p.y + dy, rows - 1)),
            }
          : p
      )
    );
  };

  const moveThiefPreferShadow = () => {
    setPieces((prev) =>
      prev.map((p) => {
        if (p.type !== "thief") return p;
        const moves = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [0, 0],
        ];
        let best = moves[0];
        for (const [dx, dy] of moves) {
          const nx = Math.max(0, Math.min(p.x + dx, columns - 1));
          const ny = Math.max(0, Math.min(p.y + dy, rows - 1));
          if (map[ny][nx].type === "shadow") {
            best = [dx, dy];
            break;
          }
        }
        return { ...p, x: p.x + best[0], y: p.y + best[1] };
      })
    );
  };

  const adjustGuardLight = (range: number) => {
    setPieces((prev) =>
      prev.map((p) => (p.type === "guard" ? { ...p, lightRange: range } : p))
    );
  };

  const moveGuardsRandom = () => {
    setPieces((prev) =>
      prev.map((p) => {
        if (p.type !== "guard") return p;
        const moves = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [0, 0],
        ];
        const [dx, dy] = moves[Math.floor(Math.random() * moves.length)];
        return {
          ...p,
          x: Math.max(0, Math.min(p.x + dx, columns - 1)),
          y: Math.max(0, Math.min(p.y + dy, rows - 1)),
        };
      })
    );
  };

  // --- 盤面描画 ---
  const renderBoard = () => (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns},50px)`, gap: 2 }}>
      {map.map((row, y) =>
        row.map((tile, x) => {
          const piece = pieces.find((p) => p.x === x && p.y === y);
          const inLight = pieces.some(
            (p) =>
              p.type === "guard" &&
              p.lightRange &&
              Math.abs(p.x - x) + Math.abs(p.y - y) <= p.lightRange
          );
          const bgColor =
            tile.type === "shadow" ? "#555" : inLight ? "#ffeb99" : "#eee";
          return (
            <div
              key={`${x}-${y}`}
              style={{
                width: 50,
                height: 50,
                border: "1px solid #999",
                backgroundColor: bgColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {piece?.type === "thief" ? "🦹" : piece?.type === "guard" ? "👮" : ""}
            </div>
          );
        })
      )}
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>ターン制泥棒ゲーム・カード版</h2>
      <ScoreBoard
        socket={socket}
        players={players}
        currentPlayerId={currentPlayerId}
        myPlayerId={myPlayerId}
      />
      <div style={{ display: "flex", gap: 20, margin: "20px 0" }}>
        {players.map((p) =>
          p.id === currentPlayerId ? (
            <Deck
              key={p.id}
              socket={socket}
              deckId={"thief"}
              name={"泥棒カード"}
              playerId={p.id} // ←ターン中のプレイヤーIDを渡す
            />
          ) : null
        )}
      </div>
      <div style={{ marginTop: 20 }}>{renderBoard()}</div>
    </div>
  );
};
