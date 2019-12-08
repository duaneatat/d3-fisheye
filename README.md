# d3-fisheye

A fisheye module that includes the option to smoothly transition out of the fisheye effect rather than the abrupt discontinuity at the edge of Sarkar-Brown-based implementations. See https://observablehq.com/@duaneatat/smoothed-fisheye for details.


## Installing

`npm install d3-fisheye` or `yarn add d3-fisheye`

## API Reference

See https://bl.ocks.org/duaneatat/315b00c4747e747054ba0287035794d6 for an example comparing fisheye with and without smoothing enabled.

Example:

```
const fisheye = d3Fisheye.radial()
  .radius(250)
  .distortion(4)
  .smoothing(0.5);

fisheye.focus([10, 50]);
console.log(fisheye([10, 100])); // [ 10.000000000000007, 168.48674177847914 ]
```

The `smoothing` option is the fraction of the radius that is used to smoothly transition back out of the fisheye effect. A value of `0` would result in the usual Sarkar-Brown fisheye effect, e.g. [here](https://bost.ocks.org/mike/fisheye/) and [here](https://bl.ocks.org/mbostock/2962761). A value of 1 would result in no fisheye effect at all. Default is 0.2.


