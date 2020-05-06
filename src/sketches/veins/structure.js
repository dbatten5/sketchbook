import KDBush from 'kdbush';
import Node from './node';
import defaults from './defaults';

class Structure {
  constructor(p5, attractors, nodes, settings = {}) {
    this.p5 = p5;
    this.attractors = attractors;
    this.nodes = nodes;
    this.settings = { ...defaults, ...settings };
  }

  generateSpatialIndex() {
    return new KDBush(
      this.nodes,
      (p) => p.position.x,
      (p) => p.position.y,
    );
  }

  setInfluencedNodes() {
    const { attractors, nodes, settings: { attractionRadius, killZone } } = this;

    const tree = this.generateSpatialIndex();

    for (const attractor of attractors) {
      // ignore inactive attractors
      if (attractor.active) {
        continue;
      }

      // find all nodes which are influenced by this attractor
      const closestNodes = tree.within(
        attractor.position.x,
        attractor.position.y,
        attractionRadius,
      );

      // if nothing within the influence zone
      if (closestNodes.length === 0) {
        continue;
      }

      // find the closest one
      const closestNodeIndex = closestNodes.reduce((acc, curr) => {
        return nodes[curr].position.dist(attractor.position) < nodes[acc].position.dist(attractor.position)
          ? curr : acc;
      }, 0);
      const closestNode = nodes[closestNodeIndex];

      // if the closest is within the kill zone
      if (closestNode.position.dist(attractor.position) < killZone) {
        // kill the attractor
        attractor.dead = true;
        continue;
      }

      // set the attractor as an influencer of the closest node
      closestNode.influencedBy.push(attractor);
    }
  }

  generateNewNodes() {
    const { nodes, p5, settings: { maxThickness, thicknessIncrement } } = this;

    const newNodes = [];

    for (const node of nodes) {
      // only interested in nodes under the influence
      if (node.influencedBy.length === 0) {
        continue;
      }

      // find the new position
      const newPosition = node.getNextPosition();

      // create node and new position
      const newNode = new Node(p5, newPosition, node, this.settings);
      node.setChild(newNode);

      // add to collection of new nodes
      newNodes.push(newNode);

      // set the penultimate node to no longer be the tip
      node.isTip = false;

      // thicken the veins
      let currentNode = newNode;
      while (currentNode.parent) {
        if (currentNode.parent.thickness < maxThickness) {
          currentNode.parent.thickness += thicknessIncrement;
          currentNode = currentNode.parent;
        } else {
          break;
        }
      }
    }

    return newNodes;
  }

  iterate() {
    const { nodes } = this;

    this.setInfluencedNodes();

    const newNodes = this.generateNewNodes();

    this.nodes = nodes.concat(newNodes);

    // draw all the nodes
    for (const node of this.nodes) {
      node.draw();
      node.influencedBy = [];
    }
  }
}

export default Structure;
