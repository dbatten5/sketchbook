import p5 from 'p5/lib/p5.min.js';

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

  s.setup = () => {
    s.createCanvas(width, height);
    s.stroke('#020202');
    s.textSize(10);
    s.strokeWeight(1);

    for (var i = 0 - buffer; i < rows + buffer; i++) {
      for (var j = 0 - buffer; j < cols + buffer; j++) {
        const x = j * sizeX + s.random(-wonk, wonk);
        const y = i * sizeY + s.random(-wonk, wonk);
        points.push([x, y]);
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
    for (var i = 0; i < points.length - cols - 2 * buffer; i++) {
      if ((i + 1) % (cols + 2 * buffer) == 0) {
        continue;
      }

      const r1 = Math.floor(s.random(0,4))
      s.fill(colorChoices[r1][0], colorChoices[r1][1], s.random(50, 100));
      s.triangle(
        points[i][0],
        points[i][1],
        points[i + 1][0],
        points[i + 1][1],
        points[i + cols + 2 * buffer][0],
        points[i + cols + 2 * buffer][1],
      )
      const r2 = Math.floor(s.random(0,4))
      s.fill(colorChoices[r2][0], colorChoices[r2][1], s.random(50, 100));
      s.triangle(
        points[i + 1][0],
        points[i + 1][1],
        points[i + cols + 2 * buffer][0],
        points[i + cols + 2 * buffer][1],
        points[i + cols + 1 + 2 * buffer][0],
        points[i + cols + 1 + 2 * buffer][1],
      )
    }
  };

  s.draw = () => {
  };
};

const myp5 = new p5(sketch, 'sketch');
