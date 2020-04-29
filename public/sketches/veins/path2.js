class Path2 {
  nodes = [];

  constructor(p5, initialNode, settings) {
    this.p5 = p5;
    this.nodes.push(initialNode);
    this.settings = settings;
  }

  draw() {
    const { nodes, p5, settings } = this;
    const firstNode = nodes[0];
    const lastNode = this.lastNode();

    const { strokeWeight } = settings;

    p5.push();
    p5.strokeWeight(strokeWeight);

    p5.beginShape();
    p5.curveVertex(firstNode.position.x, firstNode.position.y);
    for (var i = 0; i < nodes.length; i++) {
      p5.curveVertex(nodes[i].position.x, nodes[i].position.y);
    }
    p5.curveVertex(lastNode.position.x, lastNode.position.y);
    p5.endShape();

    p5.pop();
  }
}

export default Path2;
