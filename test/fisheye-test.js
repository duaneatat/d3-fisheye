const tape = require('tape');
const d3Fisheye = require('../');

tape('d3Fisheye.radial() without smoothing', test => {
  const sarkarBrown = d3Fisheye
    .radial()
    .radius(10)
    .distortion(2)
    .smoothing(0)
    .focus([0, 0]);
  const [, y] = sarkarBrown([0, 9]);

  test.equal(y.toFixed(2), '9.64');
  test.end();
});

tape('d3Fisheye.radial() with smoothing', test => {
  const fisheye = d3Fisheye
    .radial()
    .radius(10)
    .distortion(2)
    .smoothing(0.5)
    .focus([0, 0]);
  const [, y] = fisheye([0, 9]);

  test.equal(y.toFixed(2), '9.05');
  test.end();
});

tape('d3Fisheye.circular() with smoothing', test => {
  const fisheye = d3Fisheye
    .circular()
    .radius(10)
    .distortion(2)
    .smoothing(0.5)
    .focus([0, 0]);
  const [, y] = fisheye([0, 9]);

  test.equal(y.toFixed(2), '9.05');
  test.end();
});

tape('d3Fisheye.circular() outside of radius', test => {
  const fisheye = d3Fisheye
    .circular()
    .radius(10)
    .distortion(2)
    .smoothing(0.5)
    .focus([0, 0]);
  const [x, y] = fisheye([20, 20]);

  test.equal(x, 20);
  test.equal(y, 20);
  test.end();
});

tape('d3Fisheye.circular() at focus', test => {
  const fisheye = d3Fisheye
    .circular()
    .radius(10)
    .distortion(2)
    .smoothing(0.5)
    .focus([0, 0]);
  const [x, y] = fisheye([0, 0]);

  test.equal(x, 0);
  test.equal(y, 0);
  test.end();
});
