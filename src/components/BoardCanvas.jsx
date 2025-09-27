import React, { useEffect, useRef } from "react";
import { Cell } from "./Cell.jsx";
import { Piece } from "./Piece.jsx";

export function BoardCanvas({ pieces, setPieces }) {
  const canvasRef = useRef(null);
  const draggingPieceRef = useRef(null);

  // --- 盤面用 ---
  const center = { x: 300, y: 300 };
  const radii = [100, 200, 300];
  const sectors = 12;
  const offset = 15 * Math.PI / 180;

  // マス生成（固定でOK）
  const cells = React.useMemo(() => {
    const arr = [];
    for (let r = 0; r < radii.length; r++) {
      for (let s = 0; s < sectors; s++) {
        const angleStart = (s / sectors) * 2 * Math.PI + offset - Math.PI / sectors;
        const angleEnd = (s / sectors) * 2 * Math.PI + offset + Math.PI / sectors;
        const state = (s + r) % 2 === 0 ? "light" : "shadow";
        arr.push(new Cell(r, s, r === 0 ? 0 : radii[r - 1], radii[r], angleStart, angleEnd, state));
      }
    }
    return arr;
  }, []);

  // --- 盤面描画 ---
  const drawBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // マス描画
    cells.forEach(cell => cell.draw(ctx, center));
    // 駒描画
    pieces.forEach(p => p.draw(ctx, center, cells, radii));

    // セクター線
    for (let s = 0; s < sectors; s++) {
      const angle = (s / sectors) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(
        center.x + Math.cos(angle) * radii[radii.length - 1],
        center.y + Math.sin(angle) * radii[radii.length - 1]
      );
      ctx.stroke();
    }

    // 同心円
    radii.forEach(r => {
      ctx.beginPath();
      ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
      ctx.stroke();
    });
  };

  useEffect(() => drawBoard(), [pieces, cells]);

  // --- ドラッグ処理 ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getMousePos = e => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseDown = e => {
      const pos = getMousePos(e);
      for (const p of pieces) {
        if (p.isHit(pos.x, pos.y, center, radii, cells)) {
          p.startDrag(pos.x, pos.y, center, radii, cells);
          draggingPieceRef.current = p;
          return;
        }
      }
      for (const cell of cells) {
        if (cell.containsPoint(pos.x, pos.y, center)) {
          cell.toggleState();
          drawBoard();
          return;
        }
      }
    };

    const onMouseMove = e => {
      const draggingPiece = draggingPieceRef.current;
      if (draggingPiece) {
        const pos = getMousePos(e);
        draggingPiece.drag(pos.x, pos.y);
        drawBoard();
      }
    };

    const onMouseUp = e => {
      const draggingPiece = draggingPieceRef.current;
      if (draggingPiece) {
        const pos = getMousePos(e);

        // 近いセルに吸着
        let closestCell = null;
        let minDist = Infinity;
        cells.forEach(c => {
          const cx = center.x + Math.cos((c.angleStart + c.angleEnd) / 2) * (radii[c.r] - 50);
          const cy = center.y + Math.sin((c.angleStart + c.angleEnd) / 2) * (radii[c.r] - 50);
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
              p === draggingPiece
                ? new Piece(p.type, p.id, closestCell.r, closestCell.s, p.color)
                : p
            )
          );
        }

        draggingPiece.endDrag();
        draggingPieceRef.current = null;
        drawBoard();
      }
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
    };
  }, [pieces, cells]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
      style={{ background: "#000", display: "block", margin: "0 auto" }}
    />
  );
}
