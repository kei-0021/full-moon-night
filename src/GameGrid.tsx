// src/Game.tsx
import "react-game-ui/dist/react-game-ui.css";

import React, { useEffect, useState } from "react";
import type { Card, Player } from "react-game-ui";
import { Deck, Dice, PlayField, ScoreBoard } from "react-game-ui";
import { io, Socket } from "socket.io-client";
import { GridBoardCanvas } from "./components/GridBoardCanvas"; // 変更
import { Piece } from "./components/Piece";

import { cardEffects } from "../public/data/cardEffects";
import itemDeckJson from "../public/data/itemCards.json";
import lightDeckJson from "../public/data/lightCards.json";

const itemDeck: Card[] = itemDeckJson as Card[];
const lightDeck: Card[] = lightDeckJson as Card[];

React;

interface ServerToClientEvents {
  message: (data: string) => void;
  "game:turn": (playerId: Player["id"]) => void;
  "players:update": (players: Player[]) => void;
  "player:assign-id": (id: Player["id"]) => void;
}

interface ClientToServerEvents {
  joinGame: (data: { playerId: Player["id"] }) => void;
  "deck:add": (deck: { deckId: string; name: string; cards: typeof lightDeck }) => void;
}

// --- ソケット接続 ---
const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(socketUrl);

socket.on("message", (data) => console.log("サーバーからのメッセージ:", data));
socket.on("disconnect", (reason) => console.log("サーバーとの接続が切れました", reason));

export default function Game() {
  const [myPlayerId, setMyPlayerId] = useState<Player["id"]>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState<Player["id"]>("");

  // 🔹 ここを追加：盤面のタブ状態
  const [activeBoard, setActiveBoard] = useState<"forest" | "moon" | "lake">("forest");

  // Grid盤面: 5x5など適当なサイズで初期化
  const [pieces, setPieces] = useState<Piece[]>([
    new Piece("human1", "h1", 0, 0, "blue"),
    new Piece("human2", "h2", 0, 4, "blue"),
    new Piece("wolf", "w", 4, 2, "red"),
  ]);

  const [, setScores] = useState<Record<Player["id"], number>>({});

  const addScore = (playerId: Player["id"], points: number) => {
    setScores((prev) => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + points,
    }));
  };

  useEffect(() => {
    socket.on("player:assign-id", (id: Player["id"]) => setMyPlayerId(id));

    const handlePlayersUpdate = (updatedPlayers: Player[]) => setPlayers(updatedPlayers);
    const handleGameTurn = (playerId: Player["id"]) => setCurrentPlayerId(playerId);

    const allDecks = [
      { deckId: "light", name: "光カード", cards: lightDeck },
      { deckId: "item", name: "アイテムカード", cards: itemDeck },
    ];

    allDecks.forEach((deck) => {
      deck.cards = deck.cards.map((c) => ({
        ...c,
        onPlay: () => {
          const effect = cardEffects[c.name];
          if (effect) {
            const params = {
              card: c,
              currentPlayerId,
              addScore,
            };
            effect(params);
          }
        },
        location: "deck",
      }));
    });

    socket.on("connect", () => {
      allDecks.forEach((deck) => {
        socket.emit("deck:add", {
          deckId: deck.deckId,
          name: deck.name,
          cards: deck.cards,
        });
      });
    });

    socket.on("players:update", handlePlayersUpdate);
    socket.on("game:turn", handleGameTurn);

    return () => {
      socket.off("player:assign-id");
      socket.off("players:update", handlePlayersUpdate);
      socket.off("game:turn", handleGameTurn);
    };
  }, [currentPlayerId]);

  const renderBoard = () => (
    <GridBoardCanvas
      pieces={pieces}
      setPieces={setPieces}
      rows={10}       // 行数
      cols={10}       // 列数
      cellSize={80}  // マスサイズ
      theme={activeBoard}
    />
  );

  return (
    <div style={{ display: "flex", position: "relative", width: "100%", height: "100vh", padding: "20px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* タブ */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          {["forest", "moon", "lake"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveBoard(t as any)}
              style={{
                padding: "8px 16px",
                backgroundColor: activeBoard === t ? "#68b36b" : "#ddd",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {t === "forest" ? "🪵 森" : t === "moon" ? "🌕 月光" : "🌊 湖"}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          {renderBoard()}
        </div>
      </div>

      {/* UIエリア */}
      <div style={{ width: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px" }}>
        {players.length > 0 && currentPlayerId && (
          <> {/* 👈 currentPlayerId が存在するブロック */}
            <ScoreBoard socket={socket} players={players} currentPlayerId={currentPlayerId} myPlayerId={myPlayerId} />
            <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
              <Deck socket={socket} deckId="item" name="アイテム" playerId={currentPlayerId} />
              <Deck socket={socket} deckId="light" name="光カード" playerId={currentPlayerId} />
            </div>
            <PlayField socket={socket} deckId="item"/> 
            <PlayField socket={socket} deckId="light"/>
          </>
        )}
        <Dice socket={socket} diceId="0" sides={3} />
      </div>
    </div>
  );
}
