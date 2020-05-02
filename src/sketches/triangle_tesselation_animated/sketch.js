import p5 from 'p5/lib/p5.min.js';

class Triangle {
  constructor(colour) {
    this.colour = colour;
  }
};

const sketch = (s) => {
  const width = s.windowWidth;
  const height = s.windowHeight
  const wonk = 20;
  const points = [];
  const rows = 12;
  const cols = 20;
  const sizeX = width / cols;
  const sizeY = height / rows;
  const buffer = 2;
  const triangles = [];
  const mouseForceScalar = 20;

  s.setup = () => {
    s.createCanvas(width, height);
    s.background('#fff');
    s.stroke('#020202');
    s.textSize(10);
    s.strokeWeight(1);

    for (var i = 0 - buffer; i < rows + buffer; i++) {
      for (var j = 0 - buffer; j < cols + buffer; j++) {
        const x = j * sizeX + s.random(-wonk, wonk);
        const y = i * sizeY + s.random(-wonk, wonk);
        points.push(s.createVector(x, y));
      }
    }

    s.noStroke();
    const colorChoices = [
      [45, 15],
      [22, 42],
      [5, 55],
      [0, 61],
    ];
    s.colorMode(s.HSB);
    for (var i = 0; i < points.length + 1; i++) {
      const r1 = Math.floor(s.random(0,4));
      var triangle = new Triangle([colorChoices[r1][0], colorChoices[r1][1], s.random(50, 100)]);
      triangles.push(triangle);

      const r2 = Math.floor(s.random(0,4));
      var triangle = new Triangle([colorChoices[r2][0], colorChoices[r2][1], s.random(50, 100)]);
      triangles.push(triangle);
    }
  };

  s.draw = () => {
    s.noFill();
    s.noStroke();
    const mouse = s.createVector(s.mouseX, s.mouseY);
    for (var i = 0; i < points.length - cols - 2 * buffer; i++) {
      if ((i + 1) % (cols + 2 * buffer) == 0) {
        continue;
      }

      if (mouse.dist(points[i]) < 30) {
        const dist = mouse.dist(points[i]);
        const force = points[i]
          .copy()
          .sub(mouse)
          .normalize()
          .mult(mouseForceScalar * (1 / dist));
        points[i].add(force);
      }

      s.fill(...triangles[2 * i].colour);
      s.triangle(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y,
        points[i + cols + 2 * buffer].x,
        points[i + cols + 2 * buffer].y,
      );

      s.fill(...triangles[2 * i + 1].colour);
      s.triangle(
        points[i + 1].x,
        points[i + 1].y,
        points[i + cols + 2 * buffer].x,
        points[i + cols + 2 * buffer].y,
        points[i + cols + 1 + 2 * buffer].x,
        points[i + cols + 1 + 2 * buffer].y,
      );
    }
  };
};

const myp5 = new p5(sketch, 'sketch');
