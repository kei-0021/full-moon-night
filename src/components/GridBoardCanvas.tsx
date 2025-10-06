// src/components/GridBoardCanvas.tsx
import React, { useEffect, useRef } from "react";
import { Cell } from "./Cell";
import { Piece } from "./Piece";

interface GridBoardCanvasProps {
  pieces: Piece[];
  setPieces: React.Dispatch<React.SetStateAction<Piece[]>>;
  theme?: "forest" | "moon" | "lake";
  rows?: number;
  cols?: number;
  cellSize?: number;
}

export function GridBoardCanvas({
  pieces,
  setPieces,
  theme = "forest",
  rows = 8,
  cols = 8,
  cellSize = 80
}: GridBoardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const draggingPieceRef = useRef<Piece | null>(null);

  // --- テーマ ---
  const boardStyle = React.useMemo(() => {
    switch (theme) {
      case "forest":
        return { background: "#0b3d0b", lightColor: "#3fa34d", shadowColor: "#1e4620", lineColor: "#a4d68e" };
      case "moon":
        return { background: "#1a183f", lightColor: "#d1d1f2", shadowColor: "#4c4b6f", lineColor: "#f8f6e7" };
      case "lake":
        return { background: "#082b4c", lightColor: "#4fc3f7", shadowColor: "#1565c0", lineColor: "#bbdefb" };
      default:
        return { background: "#000", lightColor: "#999", shadowColor: "#555", lineColor: "#fff" };
    }
  }, [theme]);

  // --- セル生成 ---
  const cells: Cell[] = React.useMemo(() => {
    const arr: Cell[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const state: "light" | "shadow" = (r + c) % 2 === 0 ? "light" : "shadow";
        arr.push(new Cell(r, c, 0, 0, 0, 0, state));
      }
    }
    return arr;
  }, [rows, cols]);

  // --- 描画 ---
  const drawBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 背景
    ctx.fillStyle = boardStyle.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // マス描画
    cells.forEach(cell => {
      const x = cell.s * cellSize;
      const y = cell.r * cellSize;
      ctx.fillStyle = cell.state === "light" ? boardStyle.lightColor : boardStyle.shadowColor;
      ctx.fillRect(x, y, cellSize, cellSize);
      ctx.strokeStyle = boardStyle.lineColor;
      ctx.strokeRect(x, y, cellSize, cellSize);
    });

    // 駒描画
    pieces.forEach(p => {
      const x = p.tempX ?? (p.s * cellSize + cellSize / 2);
      const y = p.tempY ?? (p.r * cellSize + cellSize / 2);
      p.drawGrid(ctx, x, y);
    });
  };

  useEffect(() => drawBoard(), [pieces, cells, theme]);

  // --- ドラッグ処理 ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseDown = (e: MouseEvent) => {
    const pos = getMousePos(e);

    // まず駒をクリックしていたらドラッグ開始
    for (const p of pieces) {
        const x = p.s * cellSize + cellSize / 2;
        const y = p.r * cellSize + cellSize / 2;
        if (p.isHitGrid(pos.x, pos.y, x, y)) {
        p.startDragGrid(pos.x, pos.y, x, y);
        draggingPieceRef.current = p;
        return;
        }
    }

    // 駒でなければセルをクリック判定
    for (const cell of cells) {
        const cx = cell.s * cellSize;
        const cy = cell.r * cellSize;
        if (
        pos.x >= cx &&
        pos.x <= cx + cellSize &&
        pos.y >= cy &&
        pos.y <= cy + cellSize
        ) {
        cell.state = cell.state === "light" ? "shadow" : "light";
        drawBoard();
        return;
        }
    }
    };

    const onMouseMove = (e: MouseEvent) => {
      const draggingPiece = draggingPieceRef.current;
      if (!draggingPiece) return;
      const pos = getMousePos(e);
      draggingPiece.dragGrid(pos.x, pos.y); // 自由ドラッグ
      drawBoard();
    };

    const onMouseUp = (e: MouseEvent) => {
      const draggingPiece = draggingPieceRef.current;
      if (!draggingPiece) return;
      const pos = getMousePos(e);

      // 最も近いセルに吸着
      let closestCell: Cell | null = null;
      let minDist = Infinity;
      cells.forEach(c => {
        const cx = c.s * cellSize + cellSize / 2;
        const cy = c.r * cellSize + cellSize / 2;
        const dx = pos.x - cx;
        const dy = pos.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          closestCell = c;
        }
      });

      if (closestCell) {
        setPieces(prev =>
          prev.map(p =>
            p === draggingPiece ? new Piece(p.type, p.id, closestCell!.r, closestCell!.s, p.color) : p
          )
        );
      }

      draggingPiece.endDragGrid();
      draggingPieceRef.current = null;
      drawBoard();
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
    };
  }, [pieces, cells, theme]);

  return (
    <canvas
      ref={canvasRef}
      width={cols * cellSize}
      height={rows * cellSize}
      style={{
        background: boardStyle.background,
        display: "block",
        margin: "0 auto",
        borderRadius: "10px",
        boxShadow: "0 0 12px rgba(0,0,0,0.4)"
      }}
    />
  );
}
