/* eslint-disable no-param-reassign */
import p5 from 'p5/lib/p5.min';
import KDBush from 'kdbush';
import Attractor from './attractor';
import Node from './node';

const sketch = (s) => {
  const origin = s.createVector(s.windowWidth / 2, s.windowHeight / 2);

  const attractors = [];
  let nodes = [];

  s.setup = () => {
    s.background('fff');
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.translate(origin.x, origin.y);

    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        const x = s.map(i, 0, 30, -350, 350);
        const y = s.map(j, 0, 30, -350, 350);
        const p = s.createVector(x + s.random(-5, 5), y + s.random(-5, 5));
        const attractor = new Attractor(s, p);
        attractors.push(attractor);
      }
    }

    const na1 = s.createVector(-150, 80);
    const node1 = new Node(s, na1)
    nodes.push(node1);

    // s.frameRate(5);
  };

  s.draw = () => {
    const tree = new KDBush(nodes, p => p.position.x, p => p.position.y);
    s.background('fff');
    s.translate(origin.x, origin.y);

    // for (const attractor of attractors) {
    //   // draw the attractor
    //   attractor.draw(s);
    // }

    for (const attractor of attractors) {
      // draw the attractor
      // attractor.draw(s);

      // ignore dead attractors
      if (attractor.dead) {
        continue;
      }

      // find all nodes which are influenced by this attractor
      const closestNodes = tree.within(attractor.position.x, attractor.position.y, 150);

      // if nothing within the influence zone
      if (closestNodes.length === 0) {
        continue;
      }

      // find the closest one
      const closestNodeIndex = closestNodes.reduce((acc, curr, i) => {
        return nodes[curr].position.dist(attractor.position) < nodes[acc].position.dist(attractor.position) ?
          curr : acc;
      }, 0);
      const closestNode = nodes[closestNodeIndex];

      // if the closest is within the kill zone
      if (closestNode.position.dist(attractor.position) < 10) {
        // kill the attractor
        attractor.dead = true;
        continue;
      }

      // add the attractor to the influencedBy array for that node
      closestNode.influencedBy.push(attractor);
    }

    const newNodes = [];
    for (const node of nodes) {
      // only interested in nodes under the influence
      if (node.influencedBy.length === 0) {
        continue;
      }

      // find normalized average direction for all its influencing attractors
      const direction = node.getAverageAttractionDirection();

      // scale by predefined amount
      direction.mult(7);

      // find the new position
      const newPosition = node.position.copy().add(direction)

      // create node and new position
      const newNode = new Node(s, newPosition);

      // add to collection of new nodes
      newNodes.push(newNode);
    }

    nodes = nodes.concat(newNodes);

    // draw all the nodes
    for (const node of nodes) {
      node.draw();
      node.influencedBy = [];
    }

    if (s.frameCount === 35) {
      s.noLoop();
    }
  };
};

// eslint-disable-next-line new-cap, no-unused-vars
const myp5 = new p5(sketch, 'sketch');
