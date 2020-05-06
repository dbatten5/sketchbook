class Attractor {
  constructor(p5, position) {
    this.p5 = p5;
    this.position = position;
    this.influenceZone = 300;
    this.killZone = 20;
    this.dead = false;
  }

  draw() {
    const { p5 } = this;

    p5.push();
    p5.noFill();

    if (!this.dead) {
      p5.stroke('blue');
      // p5.ellipse(this.position.x, this.position.y, this.influenceZone);

      p5.stroke('red');
      // p5.ellipse(this.position.x, this.position.y, this.killZone);

      p5.fill('blue');
    }

    if (this.dead) {
      p5.fill('red');
    }

    p5.ellipse(this.position.x, this.position.y, 5);

    p5.pop();
  }
}

export default Attractor;
