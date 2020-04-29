class Node {
  constructor(position, direction, radius) {
    this.p = position;
    this.d = direction;
    this.r = radius;
  }

  draw(s) {
    s.ellipse(this.p.x, this.p.y, this.r);
    // s.push();
    // s.noFill();
    // s.ellipse(this.p.x, this.p.y, this.r + 20);
    // s.pop();
  }

  position() {
    return this.p;
  }

  direction() {
    return this.d;
  }

  radius() {
    return this.r;
  }

  setDirection(direction) {
    this.d = direction;
  }
};

export default Node;
