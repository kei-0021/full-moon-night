// Piece.jsx
export class Piece {
  constructor(type, id, r, s, color) {
    this.type = type;
    this.id = id;
    this.r = r;
    this.s = s;
    this.color = color;
    this.tempX = null;
    this.tempY = null;
  }

  draw(ctx, center, cells, radii) {
    const cell = cells.find(c => c.r === this.r && c.s === this.s);
    const x = this.tempX ?? (center.x + Math.cos((cell.angleStart + cell.angleEnd)/2) * (radii[this.r]-50));
    const y = this.tempY ?? (center.y + Math.sin((cell.angleStart + cell.angleEnd)/2) * (radii[this.r]-50));

    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.stroke();

    ctx.fillStyle = 'white';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${this.id}`, x, y);
  }

  isHit(mx, my, center, radii, cells) {
    const cell = cells.find(c => c.r === this.r && c.s === this.s);
    const x = center.x + Math.cos((cell.angleStart + cell.angleEnd)/2) * (radii[this.r]-50);
    const y = center.y + Math.sin((cell.angleStart + cell.angleEnd)/2) * (radii[this.r]-50);
    return Math.hypot(mx - x, my - y) < 15;
  }

  startDrag(mx, my, center, radii, cells) {
    const cell = cells.find(c => c.r === this.r && c.s === this.s);
    this.offsetX = mx - (center.x + Math.cos((cell.angleStart + cell.angleEnd)/2) * (radii[this.r]-50));
    this.offsetY = my - (center.y + Math.sin((cell.angleStart + cell.angleEnd)/2) * (radii[this.r]-50));
  }

  drag(mx, my) {
    this.tempX = mx - this.offsetX;
    this.tempY = my - this.offsetY;
  }

  endDrag() {
    this.tempX = null;
    this.tempY = null;
  }
}
