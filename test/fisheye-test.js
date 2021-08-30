const tape = require("tape");
const d3Fisheye = require("../");

tape("d3Fisheye.radial() without smoothing", (test) => {
  const sarkarBrown = d3Fisheye
    .radial()
    .radius(10)
    .distortion(2)
    .smoothing(0)
    .focus([0, 0]);
  const [, y] = sarkarBrown([0, 9]);

  test.equal(y.toFixed(2), "9.64");
  test.end();
});

tape("d3Fisheye.radial() with smoothing", (test) => {
  const fisheye = d3Fisheye
    .radial()
    .radius(10)
    .distortion(2)
    .smoothing(0.5)
    .focus([0, 0]);
  const [, y] = fisheye([0, 9]);

  test.equal(y.toFixed(2), "9.05");
  test.end();
});

tape("d3Fisheye.circular() with smoothing", (test) => {
  const fisheye = d3Fisheye
    .circular()
    .radius(10)
    .distortion(2)
    .smoothing(0.5)
    .focus([0, 0]);
  const [, y] = fisheye([0, 9]);

  test.equal(y.toFixed(2), "9.05");
  test.end();
});

tape("d3Fisheye.circular() outside of radius", (test) => {
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

tape("d3Fisheye.circular() at focus", (test) => {
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

tape("d3Fisheye.circular() with smoothing z value", (test) => {
  const fisheye = d3Fisheye
    .circular()
    .radius(10)
    .distortion(2)
    .smoothing(0.5)
    .focus([0, 0]);
  const [, , z] = fisheye([1, 4]);

  test.equal(z.toFixed(2), "1.38");
  test.end();
});

tape("d3Fisheye.circular() z value at focus equals distortion", (test) => {
  const distortion = 4;
  const fisheye = d3Fisheye
    .circular()
    .radius(10)
    .distortion(4)
    .smoothing(0.5)
    .focus([0, 0]);
  const [, , z] = fisheye([0, 0]);

  test.equal(z, distortion);
  test.end();
});

tape("d3Fisheye.circular() z value beyond radius equals 1", (test) => {
  const fisheye = d3Fisheye
    .circular()
    .radius(10)
    .distortion(4)
    .smoothing(0.5)
    .focus([0, 0]);
  const [, , z] = fisheye([20, 20]);

  test.equal(z, 1);
  test.end();
});

tape("d3Fisheye.radial() inverse", (test) => {
  const radius = 100;
  const fisheye = d3Fisheye
    .radial()
    .radius(radius)
    .distortion(3)
    .smoothing(0.31)
    .focus([0, 0]);

  const epsilon = 0.0000001;
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * 4 * radius - 2 * radius;
    const y = Math.random() * 4 * radius - 2 * radius;
    const [ix, iy] = fisheye(fisheye([x, y]), true);

    test.equal(Math.abs(x - ix) < epsilon, true);
    test.equal(Math.abs(y - iy) < epsilon, true);
  }
  test.end();
});
