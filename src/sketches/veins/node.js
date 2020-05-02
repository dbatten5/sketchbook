class Node {
  constructor(p5, position) {
    this.p5 = p5;
    this.position = position;
    this.influencedBy = [];
  }

  getAverageAttractionDirection() {
    const averageDirection = this.p5.createVector(0, 0);
    for (const attractor of this.influencedBy) {
      const direction = attractor
        .position
        .copy()
        .sub(this.position)
        .normalize();
      averageDirection.add(direction);
    }

    return averageDirection.normalize();
  }

  draw() {
    const { p5 } = this;

    p5.push();
    p5.fill(0);
    p5.ellipse(this.position.x, this.position.y, 2);
    p5.pop();
  }
}

export default Node;
