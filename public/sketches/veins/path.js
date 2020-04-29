import Node from './node.js';

class Path {
  nodes = [];

  constructor(p5, initialNode, settings) {
    this.p5 = p5;
    this.settings = settings;
    this.prevailingDirection = initialNode.getDirection().copy();

    this.nodes.push(initialNode);
    this.t = p5.random(1000);
    this.noiseFactor = 1 / settings.strokeWeight;
    this.branchDirection = -1;
  }

  wobble(direction, angle, noiseCoord, inPlace = false) {
    const { p5 } = this;
    let d = direction;

    if (!inPlace) {
      d = d.copy();
    }

    return d.rotate(
        p5.map(p5.noise(noiseCoord), 0, 1, -angle, angle)
      );
  }

  getCollisions(allNodes, position, direction) {
    const { p5 } = this;

    return allNodes.filter(node => {
      const heading = direction
        .angleBetween(
          node.getPosition().copy().sub(position)
        );

      return p5.abs(heading) < 0.8 * p5.PI &&
        node.getPosition().dist(position) <= 20;
    });
  };

  iterate(allNodes) {
    if (this.dead) {
      return false;
    }

    const { nodes, p5, t, prevailingDirection } = this;

    const previousNode = this.lastNode();

    let nextPosition = previousNode.nextPosition();
    const collisions = this.getCollisions(
      allNodes,
      nextPosition,
      previousNode.getDirection(),
    );

    if (collisions.length > 0) {
      if (collisions.length > 2) {
        this.dead = true;
        return false;
      }
      // we're inside the repulsion radius of one or more nodes
      let betterPositionFound = false;
      let attempts = 0;

      while (!betterPositionFound) {
        let attemptedDirection = this.wobble(
          previousNode.getDirection(),
          p5.PI / 4,
          attempts + this.t
        );

        previousNode.setDirection(attemptedDirection);
        let attemptedNextPosition = previousNode.nextPosition();

        const newCollisions = this.getCollisions(allNodes, attemptedNextPosition, attemptedDirection);

        if (newCollisions.length === 0) {
          // we're out of the repulsion radius
          // set the new position as the attempted new position and exit the loop
          // set the direction of the last node as the successfull attempted direction
          nextPosition = attemptedNextPosition;
          betterPositionFound = true;
        }

        attempts ++;

        // if we can't find a new position after an arbitrary number of
        // attempts, kill the node
        if (attempts > 30) {
          this.dead = true;
          break;
        }
      }
    }

    if (nextPosition.dist(p5.createVector(0, 0)) > 150) {
      this.dead = true;
    }

    if (this.dead) {
      return false;
    }

    const nextNode = new Node(
      nextPosition,
      this.wobble(prevailingDirection, p5.PI / 4, t),
      5
    );

    nodes.push(nextNode);

    this.t += 1 * this.noiseFactor;
  }

  draw() {
    const { nodes, p5, settings } = this;
    const firstNodePosition = nodes[0].getPosition();
    const lastNodePosition = this.lastNode().getPosition();

    const { strokeWeight } = settings;

    p5.push();
    p5.strokeWeight(strokeWeight);

    p5.beginShape();
    p5.curveVertex(firstNodePosition.x, firstNodePosition.y);
    for (var i = 0; i < nodes.length; i++) {
      p5.curveVertex(nodes[i].getPosition().x, nodes[i].getPosition().y);
    }
    p5.curveVertex(lastNodePosition.x, lastNodePosition.y);
    p5.endShape();

    p5.pop();
  }

  lastNode() {
    return this.nodes[this.nodes.length - 1];
  }

  penultimateNode() {
    return this.nodes[this.nodes.length - 2];
  }

  getStrokeWeight() {
    return this.settings.strokeWeight;
  }

  branchable() {
    const weight = this.getStrokeWeight();

    return !this.dead &&
      weight >= 1 &&
      this.nodes.length % parseInt(weight) === 0;
  }

  getBranchDirection() {
    return this.branchDirection;
  }

  switchBranchDirection() {
    this.branchDirection *= -1;
  }
}

export default Path;
