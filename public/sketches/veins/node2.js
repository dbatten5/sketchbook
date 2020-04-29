class Node2 {
  constructor(position, direction, speed) {
    this.position = position;
    this.direction = direction;
    this.speed = speed;
  }

  setDirection(d) {
    this.direction = direction;

    return this.direction;
  }

  nextPosition() {
    return this.position
      .copy()
      .add(
        this.direction.copy().mult(10)
      );
  }
}

export default Node2;
