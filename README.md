# d3-fisheye

A d3 v4 fisheye plugin that implements a novel smoothing factor to remove the discontinuity at the edge of the radius. See https://observablehq.com/@duaneatat/smoothed-fisheye for more details.

## Installing

If you use NPM, `npm install d3-fisheye`. Otherwise, download the [latest release](https://github.com/d3/d3-fisheye/releases/latest).

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
