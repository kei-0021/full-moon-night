export class Dice {
  constructor(faces) {
    this.faces = faces;
    this.lastResult = null;

    // 表示用要素
    this.displayElement = document.createElement('span');
    this.displayElement.style.marginLeft = '10px';
  }

  roll() {
    this.lastResult = this.faces[Math.floor(Math.random() * this.faces.length)];
    this.displayElement.textContent = `出目: ${this.lastResult}`;
    return this.lastResult;
  }

  reset() {
    this.lastResult = null;
    this.displayElement.textContent = '';
  }
}
