const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const center = {x: 300, y: 300};
const radii = [100, 200, 300];
const sectors = 12; // 30°刻み
const offset = 15 * Math.PI / 180; // マス角度オフセット
const cells = [];

// マス生成（扇形）
for(let r=0; r<radii.length; r++){
  for(let s=0; s<sectors; s++){
    const angleStart = (s / sectors) * 2 * Math.PI + offset - Math.PI / sectors;
    const angleEnd = (s / sectors) * 2 * Math.PI + offset + Math.PI / sectors;
    const state = ((s + r) % 2 === 0) ? 'light' : 'shadow';
    cells.push({
      r: r,
      s: s,
      state: state,
      angleStart: angleStart,
      angleEnd: angleEnd,
      radiusInner: r === 0 ? 0 : radii[r-1],
      radiusOuter: radii[r]
    });
  }
}

// 駒データ（番号付き）
const pieces = [
  {type:'human', id:1, r:2, s:0, color:'blue'},
  {type:'human', id:2, r:2, s:6, color:'blue'},
  {type:'wolf', id:1, r:0, s:3, color:'red'}
];

// サイコロ設定
const diceFaces = [1, 2, 'circle'];

// ドラッグ状態
let draggingPiece = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

// 描画関数
function drawBoard(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // 扇形マス描画
  cells.forEach(cell => {
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, cell.radiusOuter, cell.angleStart, cell.angleEnd);
    ctx.arc(center.x, center.y, cell.radiusInner, cell.angleEnd, cell.angleStart, true);
    ctx.closePath();
    ctx.fillStyle = (cell.state==='light')?'white':'gray';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.stroke();
  });

  // 駒描画
  pieces.forEach(p => {
    const cell = cells.find(c => c.r===p.r && c.s===p.s);
    let x = p.tempX ?? (center.x + Math.cos((cell.angleStart + cell.angleEnd)/2) * (radii[p.r]-50));
    let y = p.tempY ?? (center.y + Math.sin((cell.angleStart + cell.angleEnd)/2) * (radii[p.r]-50));

    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2*Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.stroke();

    // 駒番号表示（色+ID）
    ctx.fillStyle = 'white';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${p.id}`, x, y);
  });

  // セクター線
  for(let s=0; s<sectors; s++){
    const angle = (s / sectors) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(center.x + Math.cos(angle) * radii[radii.length-1], center.y + Math.sin(angle) * radii[radii.length-1]);
    ctx.stroke();
  }

  // 同心円
  for(let i=0;i<radii.length;i++){
    ctx.beginPath();
    ctx.arc(center.x, center.y, radii[i], 0, 2*Math.PI);
    ctx.stroke();
  }
}

drawBoard();

// 光/影切替（クリック時のみ）
canvas.addEventListener('click', (e)=>{
  if(isDragging) return;

  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const dx = mx - center.x;
  const dy = my - center.y;
  const clickRadius = Math.sqrt(dx*dx + dy*dy);
  let clickAngle = Math.atan2(dy, dx);
  if(clickAngle < 0) clickAngle += 2*Math.PI;

  cells.forEach(cell=>{
    if(clickRadius >= cell.radiusInner && clickRadius <= cell.radiusOuter &&
       clickAngle >= cell.angleStart && clickAngle <= cell.angleEnd){
      cell.state = (cell.state==='light')?'shadow':'light';
      drawBoard();
    }
  });
});

// ドラッグ開始
canvas.addEventListener('mousedown', (e)=>{
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  for(let p of pieces){
    const cell = cells.find(c=>c.r===p.r && c.s===p.s);
    if(cell){
      const dx = mx - (center.x + Math.cos((cell.angleStart + cell.angleEnd)/2) * (radii[p.r]-50));
      const dy = my - (center.y + Math.sin((cell.angleStart + cell.angleEnd)/2) * (radii[p.r]-50));
      if(Math.sqrt(dx*dx + dy*dy) < 10){
        draggingPiece = p;
        offsetX = dx;
        offsetY = dy;
        isDragging = true;
        break;
      }
    }
  }
});

// ドラッグ中
canvas.addEventListener('mousemove', (e)=>{
  if(draggingPiece){
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    draggingPiece.tempX = mx - offsetX;
    draggingPiece.tempY = my - offsetY;
    drawBoard();
  }
});

// ドラッグ終了
canvas.addEventListener('mouseup', (e)=>{
  if(draggingPiece){
    let closestCell = null;
    let minDist = Infinity;
    for(let c of cells){
      const cx = center.x + Math.cos((c.angleStart + c.angleEnd)/2) * (radii[c.r]-50);
      const cy = center.y + Math.sin((c.angleStart + c.angleEnd)/2) * (radii[c.r]-50);
      const dx = cx - draggingPiece.tempX;
      const dy = cy - draggingPiece.tempY;
      const d = Math.sqrt(dx*dx + dy*dy);
      if(d < minDist){
        minDist = d;
        closestCell = c;
      }
    }
    if(closestCell){
      draggingPiece.r = closestCell.r;
      draggingPiece.s = closestCell.s;
    }

    delete draggingPiece.tempX;
    delete draggingPiece.tempY;
    draggingPiece = null;
    drawBoard();
    setTimeout(()=>{ isDragging = false; }, 0);
  }
});

// サイコロ表示用UI
const diceBtn = document.createElement('button');
diceBtn.textContent = "サイコロを振る";
document.body.appendChild(diceBtn);

const diceResultDisplay = document.createElement('span');
diceResultDisplay.style.marginLeft = '10px';
diceBtn.after(diceResultDisplay);

function rollDice() {
  const result = diceFaces[Math.floor(Math.random() * diceFaces.length)];
  diceResultDisplay.textContent = `出目: ${result}`;
  return result;
}

diceBtn.addEventListener('click', ()=>{ 
  const player = pieces[currentPlayerIndex];
  const result = rollDice();
  console.log(`${player.color}-${player.id} の出目: ${result}`);
});

// --- ターン管理 ---
let currentPlayerIndex = 0;

const turnDisplay = document.createElement('div');
turnDisplay.style.margin = '10px 0';
document.body.insertBefore(turnDisplay, diceBtn);

function updateTurnDisplay() {
  const player = pieces[currentPlayerIndex];
  turnDisplay.textContent = `現在の番: ${player.color}-${player.id} (${player.type})`;
}

updateTurnDisplay();

const endTurnBtn = document.createElement('button');
endTurnBtn.textContent = "番を終了";
endTurnBtn.style.marginLeft = '10px';
diceBtn.after(endTurnBtn);

endTurnBtn.addEventListener('click', ()=>{
  currentPlayerIndex = (currentPlayerIndex + 1) % pieces.length;
  updateTurnDisplay();
  // サイコロリセット
  diceResultDisplay.textContent = '';
});

