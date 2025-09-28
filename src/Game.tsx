// src/Game.tsx
import React, { useEffect, useState } from "react";
import type { Player } from "react-game-ui";
import { Deck, Dice, ScoreBoard } from "react-game-ui";
import { io, Socket } from "socket.io-client";
import { BoardCanvas } from "./components/BoardCanvas";
import { Piece } from "./components/Piece";

import '../node_modules/react-game-ui/dist/react-game-ui.css';
import { cardEffects } from "./data/cardEffects";
import itemDeck from "./data/itemCards.json";
import lightDeck from "./data/lightCards.json";

React;

// --- 型定義 ---
interface ServerToClientEvents {
  message: (data: string) => void;
  "game:turn": (playerId: Player["id"]) => void;
  "players:update": (players: Player[]) => void;
}

interface ClientToServerEvents {
  joinGame: (data: { playerId: Player["id"] }) => void;
  "deck:add": (deck: { deckId: string; name: string, cards: typeof lightDeck }) => void;
}

// --- ソケット接続 ---
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

socket.on("message", (data) => console.log("サーバーからのメッセージ:", data));
socket.emit("joinGame", { playerId: "p1" });
socket.on("disconnect", (reason) => console.log("サーバーとの接続が切れました", reason));

export default function Game() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState<Player["id"]>("p1");
  const [pieces, setPieces] = useState<Piece[]>([
    new Piece("human1", "h1", 2, 0, "blue"),
    new Piece("human2", "h2", 1, 0, "blue"),
    new Piece("wolf", "w", 0, 3, "red"),
  ]);

  useEffect(() => {
    const handlePlayersUpdate = (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
      console.log("players:update 受信:", updatedPlayers);
    };

    const handleGameTurn = (playerId: Player["id"]) => {
      setCurrentPlayerId(playerId);
      console.log("game:turn 受信, 現在のターンプレイヤー:", playerId);
    };

    // デッキ初期化
    const allDecks = [
      { deckId: "light", name: "光カード", cards: lightDeck },
      { deckId: "item", name: "アイテムカード", cards: itemDeck }
    ];

    // カードに onPlay と location を追加
    allDecks.forEach(deck => {
      deck.cards = deck.cards.map(c => ({
        ...c,
        onPlay: cardEffects[c.name] || (() => {}),
        location: "deck"
      }));
    });

    // --- ソケット接続後にデッキを送信 ---
    socket.on("connect", () => {
      console.log("✅ connected:", socket.id);
      console.log(allDecks)

      allDecks.forEach(deck => {
        socket.emit("deck:add", {
          deckId: deck.deckId,
          name: "light",
          cards: deck.cards
        });
      });
    });

    socket.on("connect_error", (err) => console.error("❌ connect_error:", err));
    socket.on("disconnect", (reason) => console.log("サーバーとの接続が切れました", reason));
    socket.on("players:update", handlePlayersUpdate);
    socket.on("game:turn", handleGameTurn);

    return () => {
      socket.off("players:update", handlePlayersUpdate);
      socket.off("game:turn", handleGameTurn);
    };
  }, []);

  return (
    <div style={{ display: "flex", position: "relative", width: "100%", height: "100vh", padding: "20px", boxSizing: "border-box" }}>
      {/* 左側ボード */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <BoardCanvas pieces={pieces} setPieces={setPieces} />
      </div>
      {/* 右側 UI */}
      <div style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "10px",
        height: "100%"
      }}>
        {/* 上部 ScoreBoard */}
        <ScoreBoard socket={socket} players={players} currentPlayerId={currentPlayerId} />

        {/* 中央 Deck 横並び */}
        <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
          <Deck socket={socket} deckId="light" name="光カード" playerId={currentPlayerId} />
          <Deck socket={socket} deckId="item" name="アイテム" playerId={currentPlayerId} />
        </div>

        {/* 下部 Dice */}
        <Dice socket={socket} diceId="0" sides={3} />
      </div>
    </div>
  );
}
