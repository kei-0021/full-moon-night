export class Cell {
  constructor(r, s, innerR, outerR, angleStart, angleEnd, state) {
    this.r = r;
    this.s = s;
    this.radiusInner = innerR;
    this.radiusOuter = outerR;
    this.angleStart = angleStart;
    this.angleEnd = angleEnd;
    this.state = state; // 'light' or 'shadow'
  }

  draw(ctx, center) {
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, this.radiusOuter, this.angleStart, this.angleEnd);
    ctx.arc(center.x, center.y, this.radiusInner, this.angleEnd, this.angleStart, true);
    ctx.closePath();
    ctx.fillStyle = this.state === 'light' ? 'white' : 'gray';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

  toggleState() {
    this.state = this.state === 'light' ? 'shadow' : 'light';
  }

  containsPoint(x, y, center) {
    const dx = x - center.x;
    const dy = y - center.y;
    const r = Math.sqrt(dx*dx + dy*dy);
    if (r < this.radiusInner || r > this.radiusOuter) return false;
    let angle = Math.atan2(dy, dx);
    if (angle < 0) angle += 2 * Math.PI;
    return angle >= this.angleStart && angle <= this.angleEnd;
  }
}
