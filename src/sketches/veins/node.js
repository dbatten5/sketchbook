import defaults from './defaults';

class Node {
  constructor(p5, position, parent, settings = {}) {
    this.p5 = p5;
    this.position = position;
    this.influencedBy = [];
    this.parent = parent;
    this.isTip = true;
    this.thickness = 1;
    this.child = null;
    this.settings = { ...defaults, ...settings };
  }

  getAverageAttractionDirection() {
    const { influencedBy, position } = this;

    const averageDirection = this.p5.createVector(0, 0);
    for (const attractor of influencedBy) {
      const direction = attractor
        .position
        .copy()
        .sub(position)
        .normalize();
      averageDirection.add(direction);
    }

    return averageDirection.normalize();
  }

  getNextPosition() {
    const { segmentLength } = this.settings;

    const direction = this.getAverageAttractionDirection().mult(segmentLength);

    return this.position.copy().add(direction);
  }

  setChild(node) {
    this.child = node;
  }

  draw() {
    const { p5, parent, child, thickness, position } = this;

    if (!parent) {
      return false;
    }

    const v1 = parent.parent ? parent.parent.position : parent.position;
    const v2 = parent.position;
    const v3 = position;
    const v4 = child ? child.position : position;

    p5.push();

    p5.noFill();
    p5.strokeWeight(thickness);

    p5.beginShape();
    p5.curveVertex(v1.x, v1.y);
    p5.curveVertex(v2.x, v2.y);
    p5.curveVertex(v3.x, v3.y);
    p5.curveVertex(v4.x, v4.y);
    p5.endShape();

    p5.pop();
  }
}

export default Node;
