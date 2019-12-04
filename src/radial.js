export default function() {
  var radius = 200,
    smoothingRatio = 0,
    distortion = 3,
    center = { x: 0, y: 0 },
    A1,
    A2,
    dw;

  function fisheye(point) {
    if (smoothingRatio === 1 || distortion === 0) return point;

    var x = point.length ? point[0] : point.x;
    var y = point.length ? point[1] : point.y;

    var fx = center.length ? center[0] : center.x;
    var fy = center.length ? center[1] : center.y;

    var dx = x - fx;
    var dy = y - fy;

    if (Math.abs(dx) > radius || Math.abs(dy) > radius) {
      return point;
    }

    var dr = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    if (Math.abs(dr) > radius || dr == 0) {
      return point;
    }

    var theta = Math.atan2(dy, dx);
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);

    var rescaled = dr / radius;
    var newPoint = { x: 0, y: 0 };
    var newR = fisheyeContinuous(rescaled);

    newPoint.x = fx + cos * radius * newR;
    newPoint.y = fy + sin * radius * newR;

    return point.length ? [newPoint.x, newPoint.y] : newPoint;
  }

  function fisheyeContinuous(x) {
    if (x <= 1 - smoothingRatio) {
      return (A2 * x * (dw + 1)) / (dw * x + 1);
    } else {
      return (A1 * Math.pow(x - 1, 2)) / 2 + x;
    }
  }

  function recalculate() {
    var constants = solveForConstants();
    A1 = constants[0];
    A2 = constants[1];
    dw = constants[2];

    return fisheye;
  }

  function solveForConstants() {
    if (smoothingRatio === 0 || smoothingRatio === 1) {
      return [0, 1, distortion];
    }
    var xw = 1 - smoothingRatio;
    var d = distortion;
    var A1 =
      (2 *
        xw *
        (d * xw -
          Math.sqrt(
            Math.pow(d, 2) * Math.pow(xw, 2) + d * Math.pow(xw, 2) + d + 1
          ) +
          1)) /
      (Math.pow(xw, 3) - 3 * Math.pow(xw, 2) + 3 * xw - 1);
    var A2 =
      (xw *
        (Math.pow(d, 2) * xw +
          d * Math.pow(xw, 2) +
          2 * d * xw -
          d *
            Math.sqrt(
              Math.pow(d, 2) * Math.pow(xw, 2) + d * Math.pow(xw, 2) + d + 1
            ) -
          d +
          Math.pow(xw, 2) +
          xw -
          Math.sqrt(
            Math.pow(d, 2) * Math.pow(xw, 2) + d * Math.pow(xw, 2) + d + 1
          ) -
          1)) /
      (2 * d * Math.pow(xw, 2) -
        d * xw -
        d +
        Math.pow(xw, 3) +
        Math.pow(xw, 2) -
        2 * xw);
    var dw =
      (d * xw + Math.sqrt((d + 1) * (d * Math.pow(xw, 2) + 1)) - 1) /
      (xw * (xw + 1));
    return [A1, A2, dw];
  }

  fisheye.radius = function(_) {
    if (!arguments.length) return radius;
    radius = +_;
    return recalculate();
  };

  fisheye.smoothingRatio = function(_) {
    if (!arguments.length) return smoothingRatio;
    smoothingRatio = +_;
    return recalculate();
  };

  fisheye.distortion = function(_) {
    if (!arguments.length) return distortion;
    distortion = +_;
    return recalculate();
  };

  fisheye.center = function(_) {
    if (!arguments.length) return center;
    center = _;
    return fisheye;
  };

  fisheye.focus = fisheye.center;
  fisheye.fisheyeRadial = fisheye;

  fisheye.fisheyeFunction = function(x) {
    if (x <= 0 || x >= 1) return x;

    return fisheyeContinuous(x);
  };

  return recalculate();
}
