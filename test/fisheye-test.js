var tape = require('tape'),
  d3Fisheye = require('../');

tape('d3Fisheye.radial() without smoothing', function(test) {
  var sarkarBrown = d3Fisheye
    .radial()
    .radius(10)
    .distortion(2)
    .focus([0, 0]);
  var point = sarkarBrown([0, 9]);

  test.equal(point[1].toFixed(2), '9.64');
  test.end();
});

tape('d3Fisheye.radial() with smoothing', function(test) {
  var sarkarBrown = d3Fisheye
    .radial()
    .radius(10)
    .distortion(2)
    .smoothingRatio(0.5)
    .focus([0, 0]);
  var point = sarkarBrown([0, 9]);

  test.equal(point[1].toFixed(2), '9.05');
  test.end();
});

tape('d3Fisheye.circular() with smoothing', function(test) {
  var sarkarBrown = d3Fisheye
    .circular()
    .radius(10)
    .distortion(2)
    .smoothingRatio(0.5)
    .focus([0, 0]);
  var point = sarkarBrown([0, 9]);

  test.equal(point[1].toFixed(2), '9.05');
  test.end();
});

tape('d3Fisheye.circular() outside of radius', function(test) {
  var sarkarBrown = d3Fisheye
    .circular()
    .radius(10)
    .distortion(2)
    .smoothingRatio(0.5)
    .focus([0, 0]);
  var point = sarkarBrown([20, 20]);

  test.equal(point[0], 20);
  test.equal(point[1], 20);
  test.end();
});

tape('d3Fisheye.circular() at focus', function(test) {
  var sarkarBrown = d3Fisheye
    .circular()
    .radius(10)
    .distortion(2)
    .smoothingRatio(0.5)
    .focus([0, 0]);
  var point = sarkarBrown([0, 0]);

  test.equal(point[0], 0);
  test.equal(point[1], 0);
  test.end();
});
