import p5 from 'p5/lib/p5.min.js';
import Node from './node';

const sketch = (s) => {
  const width = s.windowWidth;
  const height = s.windowHeight
  const start = s.createVector(width / 2, height / 2);
  const initialDirection = s.createVector(s.random(-1, 1), s.random(-1, 1)).normalize();
  const nodes = [];
  const wobble = s.PI / 20;
  const speed = 3;
  let n1;
  let t = 0;
  const repulsionRadius = 10;
  let radius = 10;

  const getNeighbours = position => (
    nodes.slice(0, -20).filter(node => (
      node.position().dist(position) < repulsionRadius * 2
    ))
  );

  const addWobble = (direction, wobbleFactor, noiseCoord) => (
    direction
    .copy()
    .rotate(
      s.map(
        s.noise(noiseCoord), 0, 1, -1 * wobbleFactor, wobbleFactor
      )
    )
  );

  const findNextNodePosition = (lastNode, speedFactor) => (
    lastNode
      .position()
      .copy()
      .add(
        lastNode.direction().copy().mult(speedFactor)
      )
  )

  s.setup = () => {
    s.createCanvas(width, height);
    s.frameRate(20);
    s.background('#fff');

    // s.randomSeed(1);
    // s.noiseSeed(9);

    // s.randomSeed(4);
    // s.noiseSeed(10);

    s.randomSeed(5);
    s.noiseSeed(14);

    // s.randomSeed(5);
    // s.noiseSeed(15);

    s.fill(0);

    n1 = new Node(start, initialDirection, radius);
    nodes.push(n1);
  };

  s.draw = () => {
    s.background('#fff');
    const lastNode = nodes[nodes.length - 1];
    const lastDirection = lastNode.direction();

    let newPosition = findNextNodePosition(lastNode, speed);

    const neighbours = getNeighbours(newPosition);
    let betterPositionFound = false;
    let dead = false;
    let attempts = 0;

    if (neighbours.length > 0) {
      // we're inside the repulsion radius of one or more nodes
      while (!betterPositionFound) {
        // create a new attempted direction by rotating the direction of the last node a bit
        let attemptedDirection = addWobble(lastDirection, wobble * 6, attempts + t);

        // find the new attempted position after the wobble
        lastNode.setDirection(attemptedDirection);
        let attemptedNewPosition = findNextNodePosition(lastNode, speed);

        // see if this still leaves us in the replusion radius of any nodes
        const newNeighbours = getNeighbours(attemptedNewPosition);

        if (newNeighbours.length === 0) {
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
          dead = true;
          break;
        }
      }
    }

    if (dead) {
      console.log('dead');
      s.noLoop();
    }

    // create the direction for the new node based on the last direction
    const newDirection = addWobble(lastNode.direction(), wobble, t);

    // create the new node
    radius *= 0.997;
    const newNode = new Node(
      newPosition,
      newDirection,
      radius,
    );

    nodes.push(newNode);
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].draw(s);
    }

    if (s.frameCount > 210) {
      s.noLoop();
    }

    t += 0.1;
  };
};

const myp5 = new p5(sketch, 'sketch');
