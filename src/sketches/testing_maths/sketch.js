import p5 from 'p5/lib/p5.min.js';

const sketch = (s) => {
  const draw = (vector) => {
    s.point(vector.x, vector.y);
  };

  const origin = s.createVector(s.windowWidth / 2, s.windowHeight / 2);
  const scale = 100;
  const points = [];

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.translate(origin.x, origin.y);

    let counter = 0;
    for (var j = -3; j < 4; j++) {
      for (var i = -3; i < 4; i++) {
        const point = s.createVector(i, j).mult(scale);
        s.strokeWeight(5);
        points.push(point);
        draw(point);
        s.text(`${counter}`, point.x, point.y + 20);
        s.text(`${point.x}, ${point.y}`, point.x, point.y + 35);
        counter ++;
      }
    }

    // const d = s.createVector(1, -1).normalize().mult(scale);
    // s.line(0, 0, d.x, d.y);

    const d = s.createVector(-0.1, -1).normalize().mult(scale);
    s.line(0, 0, d.x, d.y);

    console.log('23');
    console.log('26', d.angleBetween(points[8].copy().sub(points[23])));
    console.log('32', d.angleBetween(points[32].copy().sub(points[23])));
    console.log('36', d.angleBetween(points[36].copy().sub(points[23])));
    console.log('37', d.angleBetween(points[37].copy().sub(points[23])));
    console.log('37', d.angleBetween(points[36].copy().sub(points[23])));
    // console.log('19', d.angleBetween(points[19].copy().sub(d)));
    // console.log('11', d.angleBetween(points[11].copy().sub(d)));
    // console.log('25', d.angleBetween(points[25].copy().sub(d)));
    // console.log('32', d.angleBetween(points[32].copy().sub(d)));

    // console.log('18', d.angleBetween(points[18].copy().sub(d)));
    // console.log('19', d.angleBetween(points[19].copy().sub(d)));
    // console.log('11', d.angleBetween(points[11].copy().sub(d)));
    // console.log('25', d.angleBetween(points[25].copy().sub(d)));
    // console.log('32', d.angleBetween(points[32].copy().sub(d)));

  };

  s.draw = () => {
  };
};

const myp5 = new p5(sketch, 'sketch');
