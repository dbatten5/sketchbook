import p5 from 'p5/lib/p5.min.js';

const sketch = (s) => {
  s.setup = () => {
    const width = s.windowWidth;
    const height = s.windowHeight;

    s.createCanvas(width, height);
    s.background('#fff');
    s.fill('#ffe6e6');
    s.noStroke();

    for (var i = 0; i < width - 100; i+=200) {
      s.triangle(1287 - i, 120, 1000 - i, 400, 1287 - i, 400);
    }
  };

  s.draw = () => {
  };
};

const myp5 = new p5(sketch, 'sketch');
