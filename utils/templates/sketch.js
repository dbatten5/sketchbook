/* eslint-disable no-param-reassign */
import p5 from 'p5/lib/p5.min';

const sketch = (s) => {
  s.setup = () => {
    s.background('fff');
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
  };
};

// eslint-disable-next-line new-cap, no-unused-vars
const myp5 = new p5(sketch, 'sketch');
