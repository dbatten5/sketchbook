/* eslint-disable no-param-reassign */
import p5 from 'p5/lib/p5.min';
import Attractor from './attractor';
import Node from './node';
import Structure from './structure';

const sketch = (s) => {
  const origin = s.createVector(s.windowWidth / 2, s.windowHeight / 2);

  const attractors = [];
  const nodes = [];
  let structure;

  // s.randomSeed(13);

  s.randomSeed(20);

  s.setup = () => {
    s.background('fff');
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.translate(origin.x, origin.y);

    const density = 30;
    const skew = 5;
    const limits = 350;

    for (let i = 0; i < density; i++) {
      for (let j = 0; j < density; j++) {
        const x = s.map(i, 0, density, -limits, limits);
        const y = s.map(j, 0, density, -limits, limits);
        const p = s.createVector(
          x + s.random(-skew, skew),
          y + s.random(-skew, skew),
        );
        const attractor = new Attractor(s, p);
        attractors.push(attractor);
      }
    }

    const na1 = s.createVector(
      -s.random(-limits, limits),
      s.random(-limits, limits),
    );
    const node1 = new Node(s, na1, null);
    nodes.push(node1);

    const na2 = s.createVector(-s.random(-limits, limits), s.random(-limits, limits));
    const node2 = new Node(s, na2, null);
    nodes.push(node2);

    const na3 = s.createVector(-s.random(-limits, limits), s.random(-limits, limits));
    const node3 = new Node(s, na3, null);
    nodes.push(node3);

    structure = new Structure(s, attractors, nodes, {});

    s.frameRate(20);
  };

  s.draw = () => {
    s.background('fff');

    s.translate(origin.x, origin.y);

    s.stroke('#c41616');

    structure.iterate();

    if (s.frameCount === 150) {
      s.noLoop();
    }
  };
};

// eslint-disable-next-line new-cap, no-unused-vars
const myp5 = new p5(sketch, 'sketch');
