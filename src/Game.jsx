// Game.jsx
import { useEffect, useRef, useState } from 'react';
import { Cell } from './components/Cell.jsx';
import { Dice } from './components/Dice.jsx';
import { Piece } from './components/Piece.jsx';
import { PlayerBoard } from './components/PlayerBoard.jsx';

export default function Game() {
  const canvasRef = useRef(null);
  const draggingPieceRef = useRef(null);
  const [turn, setTurn] = useState(0);
  const [diceResult, setDiceResult] = useState(null);

  const center = { x: 300, y: 300 };
  const radii = [100, 200, 300];
  const sectors = 12;
  const offset = 15 * Math.PI / 180;

  // --- 初期マス生成 ---
  const [cells] = useState(() => {
    const arr = [];
    for (let r = 0; r < radii.length; r++) {
      for (let s = 0; s < sectors; s++) {
        const angleStart = (s / sectors) * 2 * Math.PI + offset - Math.PI / sectors;
        const angleEnd = (s / sectors) * 2 * Math.PI + offset + Math.PI / sectors;
        const state = (s + r) % 2 === 0 ? 'light' : 'shadow';
        arr.push(new Cell(r, s, r === 0 ? 0 : radii[r - 1], radii[r], angleStart, angleEnd, state));
      }
    }
    return arr;
  });

  // --- 駒生成 ---
  const [pieces, setPieces] = useState(() => [
    new Piece('human', 1, 2, 0, 'blue'),
    new Piece('human', 2, 2, 6, 'blue'),
    new Piece('wolf', 1, 0, 3, 'red')
  ]);

  const dice = new Dice([1, 2, 'circle']);

  // --- カード ---
  const cards = [
    { id: 1, name: "月を回転させる" },
    { id: 2, name: "月の光を一つ消す" },
    { id: 3, name: "月の光を一つ灯らせる" }
  ];

  // --- 描画 ---
  const drawBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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
      ctx.lineTo(center.x + Math.cos(angle) * radii[radii.length - 1], center.y + Math.sin(angle) * radii[radii.length - 1]);
      ctx.stroke();
    }

    // 同心円
    radii.forEach(r => {
      ctx.beginPath();
      ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
      ctx.stroke();
    });
  };

  useEffect(() => {
    drawBoard();
  }, [pieces, cells]);

  // --- ドラッグ＆セルクリック処理 ---
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
            prev.map(p => (p === draggingPiece ? new Piece(p.type, p.id, closestCell.r, closestCell.s, p.color) : p))
          );
        }

        draggingPiece.endDrag();
        draggingPieceRef.current = null;
        drawBoard();
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
    };
  }, [pieces, cells]);

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        style={{ background: '#000', display: 'block', margin: '0 auto' }}
      />

      {/* サイコロとカードボタン */}
      <div style={{ marginTop: 10 }}>
        <button onClick={() => setDiceResult(dice.roll())}>サイコロを振る</button>
        <span style={{ marginLeft: 10 }}>{diceResult !== null ? `出目: ${diceResult}` : ''}</span>
        <button
          style={{ marginLeft: 10 }}
          onClick={() => {
            setTurn((turn + 1) % pieces.length);
            dice.reset();
            setDiceResult(null);
          }}
        >
          番を終了
        </button>
      </div>

      {/* カード表示
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        {cards.map(card => (
          <Card
            key={card.id}
            name={card.name}
            onClick={() => console.log(`${card.name}を使う`)}
          />
        ))}
      </div> */}

      {/* プレイヤーボードをcanvasの下に */}
      <div style={{ marginTop: '20px', display: 'inline-block' }}>
        <PlayerBoard players={pieces} currentTurn={turn} />
      </div>
    </div>
  );

}
