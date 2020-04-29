class Node {
  constructor(position, direction, radius) {
    this.p = position;
    this.d = direction;
    this.r = radius;
  }

  getPosition() {
    return this.p;
  }

  getDirection() {
    return this.d;
  }

  setDirection(d) {
    this.d = d;

    return this.d;
  }

  nextPosition() {
    return this.p
      .copy()
      .add(
        this.d.copy().mult(10)
      );
  }
}

export default Node;
