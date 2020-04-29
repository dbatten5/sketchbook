import Path2 from './path.js';
import Node from './node.js';
import RBush from 'rbush';

const sketch = (s) => {
  const origin = s.createVector(s.windowWidth / 2, s.windowHeight / 2);

  const scale = 150;
  const initialPos = s.createVector(0, 1).mult(scale);
  const initialDirection = s.createVector(0, -1);
  let strokeWeight = 9;

  const paths = [];

  const settings = {};

  s.randomSeed(19);
  s.noiseSeed(134);

  s.setup = () => {
    s.background('#fff');
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.translate(origin.x, origin.y);
    s.noFill();

    const tree = new RBush();

    const initialNode = new Node(initialPos, initialDirection, 5);
    const p1 = new Path(s, initialNode, {
      strokeWeight,
    });

    paths.push(p1);
  };

  s.draw = () => {
    s.background('#fff');
    s.translate(origin.x, origin.y);
    s.stroke(0);
    s.noFill();

    const allNodes = paths.map(p => p.nodes).flat();

    s.frameRate(10);

    for (var i = 0; i < paths.length; i++) {
      const path = paths[i];

      path.iterate();
      path.draw();

      // if (path.branchable()) {
      //   const initialNode = new Node(
      //     path.penultimateNode().getPosition().copy(),
      //     path.penultimateNode().getDirection().copy(),
      //   );
      //   const angle = s.PI / 3 + s.random(-s.PI / 8, s.PI / 8);
      //   initialNode.getDirection().rotate(path.getBranchDirection() * angle)
      //   const newPath = new Path(
      //     s,
      //     initialNode,
      //     {
      //       strokeWeight: path.getStrokeWeight() * 0.7,
      //     },
      //   );
      //   paths.push(newPath);
      //   path.switchBranchDirection();
      // }
    }

    if (s.frameCount > 200) {
      s.noLoop();
    }
  };
};

const myp5 = new p5(sketch, 'sketch');
