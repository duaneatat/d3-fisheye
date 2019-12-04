# d3-fisheye

A fisheye module that includes the option to smoothly transition out of the fisheye effect rather than the abrupt discontinuity at the edge of Sarkar-Brown-based implementations. See https://observablehq.com/@duaneatat/smoothed-fisheye for details.


## Installing

`npm install d3-fisheye` or `yarn add d3-fisheye`

## API Reference

Example:

```
var fisheye = d3Fisheye.radial()
  .radius(250)
  .distortion(4)
  .smoothingRatio(0.8);

  fisheye.focus([10, 50]);
  fisheye([10, 100]); // [10, 138]
```

The `smoothingRatio` option is the fraction of the radius that is used to smoothly transition back out of the fisheye effect. A value of `0` would result in the usual Sarkar-Brown fisheye effect, e.g. [here](https://bost.ocks.org/mike/fisheye/) and [here](https://bl.ocks.org/mbostock/2962761).


