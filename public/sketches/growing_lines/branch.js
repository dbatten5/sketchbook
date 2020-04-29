import Node from './node.js';

class Branch {
  nodes = [];

  constructor(p5, initialPosition, initialDirection, initialRadius, settings) {
    this.p5 = p5;
    this.p = initialPosition;
    this.d = initialDirection;
    this.r = initialRadius;
    this.settings = settings;
    this.dead = false;
    this.t = p5.random(1000);

    const initialNode = new Node(
      initialPosition,
      initialDirection,
      initialRadius
    );

    this.nodes.push(initialNode);
  }

  findNextNodePosition(currentNode) {
    return currentNode
            .position()
            .copy()
            .add(
              currentNode.direction().copy().mult(currentNode.radius() / 2)
            );
  }

  getCollisions(allNodes, position, direction) {
    const settings = this.settings;
    const { p5 } = this;

    return allNodes.filter(node => {
      const heading = direction.angleBetween(node.position().copy().sub(position));

      return p5.abs(heading) < p5.PI / 4 &&
        node.position().dist(position) < settings.repulsionRadius;
    });
  };

  addWobble(direction, wobble, noiseCoord) {
    return direction
      .copy()
      .rotate(
        this.p5.map(
          this.p5.noise(noiseCoord), 0, 1, -wobble, wobble
        )
      );
  };

  iterate(allNodes) {
    const { speed, wobble } = this.settings;

    const lastNode = this.nodes[this.nodes.length - 1];
    const lastDirection = lastNode.direction();

    let newPosition = this.findNextNodePosition(lastNode);
    const collisions = this.getCollisions(allNodes, newPosition, lastDirection);

    if (collisions.length > 0) {
      // we're inside the repulsion radius of one or more nodes
      let betterPositionFound = false;
      let attempts = 0;

      while (!betterPositionFound) {
        // create a new attempted direction by rotating the direction of the last node a bit
        let attemptedDirection = this.addWobble(
          lastDirection,
          wobble * 4,
          attempts + this.t
        );

        // find the new attempted position after the wobble
        lastNode.setDirection(attemptedDirection);
        let attemptedNewPosition = this.findNextNodePosition(lastNode, speed);

        // see if this still leaves us in the replusion radius of any nodes
        const newCollisions = this.getCollisions(allNodes, attemptedNewPosition, attemptedDirection);

        if (newCollisions.length === 0) {
          // we're out of the repulsion radius
          // set the new position as the attempted new position and exit the loop
          // set the direction of the last node as the successfull attempted direction
          newPosition = attemptedNewPosition;
          betterPositionFound = true;
        }

        attempts ++;

        // if we can't find a new position after an arbitrary number of
        // attempts, kill the node
        if (attempts > 100) {
          this.dead = true;
          break;
        }
      }
    }

    if (this.dead || newPosition.dist(this.p5.createVector(0, 0)) > 150) {
      return false;
    }

    // create the direction for the new node based on the last direction
    const newDirection = this.addWobble(lastNode.direction(), wobble, this.t);

    // create the new node
    let radius = lastNode.radius();
    radius *= 0.999;
    const newNode = new Node(
      newPosition,
      newDirection,
      radius,
    );

    this.nodes.push(newNode);

    this.t += 0.1;
  }

  render() {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].draw(this.p5);
    }
  }

  nodes() {
    return this.nodes;
  }

  currentNode() {
    return this.nodes[this.nodes.length - 1];
  }
}

export default Branch;
