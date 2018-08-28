# shape-points
Generate points for simple shapes and curves: arcs, rectangles, rounded rectangles, circles, ellipses, bezierCurveTo, bezierCurveThrough (i.e., bezier curves through specific points)

## rationale

I needed to find the points of a rounded rectangle. Then I had fun adding lots of other shapes and curves.

## installation

    npm i shape-points

## programmatic example
```js
const ShapePoints = require('shape-points')

// alternatively: 
// const roundedRect = require('shape-points').roundedRect

const points = ShapePoints.roundedRect(125, 100, 200, 100, 30)

// assuming a canvas context was set up
context.moveTo(points[0], points[1])
for (let i = 2; i < points.length; i += 2)
{
    context.lineTo(points[i], points[i + 1])
}
context.stroke()
```

## live example
https://davidfig.github.io/shape-points/

## API
```js
/**
 * calculate points for a line with a certain thickness (either one thickness or a starting and ending thickness)
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number|object} [thickness]
 * @param {number} thickness.start
 * @param {number} thickness.end
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
module.exports = function line(x1, y1, x2, y2, thickness)

/**
 * calculate points for rectangle
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
module.exports = function rect(x, y, width, height)

/**
 * calculate points for a circle (calculates using pointsInArc * 4)
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
module.exports = function circle(x, y, radius, pointsInArc)

/**
 * calculate points for a ellipse (calculates using pointsInArc * 4)
 * @param {number} x
 * @param {number} y
 * @param {number} rx
 * @param {number} ry
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
module.exports = function ellipse(x, y, rx, ry, pointsInArc)

/**
 * calculate points for arc
 * @param {number} x
 * @param {number} y
 * @param {number} start angle (radians)
 * @param {number} end angle (radians)
 * @param {number} radius
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
module.exports = function arc(x, y, start, end, radius, pointsInArc)

/**
 * Calculate points for a bezier curve with a starting point and two control points
 * from https://stackoverflow.com/a/15399173/1955997
 * @param {number} x1 - starting point (usually a moveTo)
 * @param {number} y1 - starting point
 * @param {number} cp1x - first control point
 * @param {number} cp1y - first control point
 * @param {number} cp2x - second control point
 * @param {number} cp2y - second control point
 * @param {number} x2 - ending point
 * @param {number} y2 - ending point
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
module.exports = function bezierCurveTo(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2, pointsInArc)

/**
 * Calculate points for smooth bezier curves passing through a series of points
 * uses https://github.com/soswow/fit-curve/blob/master/src/fit-curve.js
 * uses ShapePoints.curveError=50 for error value
 * @param {(number|number[])} x1 - starting point or array of points [x1, y1, x2, y2, ... xn, yn]
 * @param {number} [y1]
 * @param {number} [x2]
 * @param {number} [y2]
 * ...
 * @param {number} [xn] - ending point
 * @param {number} [yn]
 * @param {object} [options]
 * @param {number} [options.pointsInArc=5]
 * @param {number} [options.curveError=50]
 * @returns {number[]} [x1, y1, x2, y2, ... xn, yn]
 */
module.exports = function bezierCurveThrough()

```
## License  
MIT License  
(c) 2018 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
