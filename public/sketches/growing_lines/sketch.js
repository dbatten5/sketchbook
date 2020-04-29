import Node from './node.js';
import Branch from './branch.js';

const sketch = (s) => {
  const width = s.windowWidth;
  const height = s.windowHeight
  const origin = s.createVector(width / 2, height / 2);

  s.noiseSeed(28);
  // s.randomSeed(8);

  // const start = s.createVector(width / 2, height / 2);
  // const initialDirection = s.createVector(s.random(-1, 1), s.random(-1, 1)).normalize();

  const start = s.createVector(0, 150);
  const initialDirection = s.createVector(0, -1);

  const wobble = s.PI / 20;
  const speed = 5;
  let n1;
  let radius = 10;
  const repulsionRadius = 2 * radius;
  const branches = [];

  const settings = {
    repulsionRadius,
    speed,
    wobble,
  };

  s.setup = () => {
    s.translate(origin);
    s.createCanvas(width, height);
    s.frameRate(20);
    s.background('#fff');

    s.fill(0);

    const b1 = new Branch(s, start, initialDirection, radius, settings);
    branches.push(b1);
  };

  s.draw = () => {
    s.translate(origin);
    s.background('#fff');

    const allNodes = branches.map(b => b.nodes).flat();

    for (var i = 0; i < branches.length; i++) {
      const branch = branches[i];
      branch.iterate(allNodes);
      branch.render();

      if (branch.nodes.length % 15 === 0) {
        const currentNode = branch.currentNode();
        const angle = s.PI / 2 + s.random(-s.PI / 10, s.PI / 10);
        const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        const newBranch = new Branch(
          s,
          currentNode.position(),
          currentNode.direction().copy().rotate(plusOrMinus * angle),
          currentNode.radius() * 0.7,
          settings,
        );
        branches.push(newBranch);
      }
    }

    if (s.frameCount > 400) {
      s.noLoop();
    }
  };
};

const myp5 = new p5(sketch, 'sketch');
