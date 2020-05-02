import p5 from 'p5/lib/p5.min.js';

const sketch = (s) => {
  const points = [];
  const rows = 15;
  const scale = 60;

  const rotation = s.PI / 2;
  const skew = 0.0005;

  s.setup = () => {
    s.background('fff');
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.stroke(0);
    s.strokeWeight(3);
    s.translate(s.windowWidth / 2, s.windowHeight / 2);
    s.noFill();
    s.strokeWeight(1);
    let counter = 0;
    for (var j = -rows; j < rows+ 1; j++) {
      for (var i = -rows; i < rows + 1; i++) {
        const vector = s.createVector(i, j).mult(scale);
        const point = s.createVector(
          vector.mag() * s.cos(vector.heading() + rotation * (skew * vector.mag())),
          vector.mag() * s.sin(vector.heading() + rotation * (skew * vector.mag())),
        );
        points.push(point);
      }
    }

    const colorChoices = [
      [45, 15],
      [22, 42],
      [5, 55],
      [0, 61],
    ];
    s.colorMode(s.HSB);
    s.noStroke();
    for (var i = 0; i < points.length - (2 * rows + 1); i++) {
      if ((i + 1) % (2 * rows + 1) === 0) {
        continue;
      }

      const r = Math.floor(s.random(0,4))
      s.fill(colorChoices[r][0], colorChoices[r][1], s.random(50, 100));

      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + (2 * rows + 2)];
      const p4 = points[i + (2 * rows + 1)];
      s.quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
    }
  };

  s.draw = () => {
  };
};

const myp5 = new p5(sketch, 'sketch');
