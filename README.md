# shape-points
Generate points for simple shapes and curves: arcs, rectangles, rounded rectangles, circles, ellipses, bezierCurveTo, bezierCurveThrough (i.e., bezier curves through specific points)

## rationale

I needed to find the points of a rounded rectangle. Then I had fun adding lots of other shapes and curves.

## installation

    npm i shape-points

## programmatic example

    const ShapePoints = require('shape-points')
    ShapePoints.pointsInArc = 10 // sets number of points for arcs
    
    const points = ShapePoints.roundedRect(125, 100, 200, 100, 30)

## live example
https://davidfig.github.io/shape-points/

## API
```
/**
 * calculate points for rectangle
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function rect(x, y, width, height)

/**
 * calculate points for arc
 * @param {number} x
 * @param {number} y
 * @param {number} start angle (radians)
 * @param {number} end angle (radians)
 * @param {number} radius
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function arc(x, y, start, end, radius)

/**
 * calculate points for a rounded rectangle with one corner radius, or 4 separate corner radii
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number|object} radius
 * @param {number} [radius.topLeft]
 * @param {number} [radius.topRight]
 * @param {number} [radius.bottomLeft]
 * @param {number} [radius.bottomRight]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function roundedRect(x, y, width, height, radius)

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
function line(x1, y1, x2, y2, thickness)

/**
 * calculate points for a circle (calculates using pointsInArc * 4)
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function circle(x, y, radius)

/**
 * calculate points for a ellipse (calculates using pointsInArc * 4)
 * @param {number} x
 * @param {number} y
 * @param {number} rx
 * @param {number} ry
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function ellipse(x, y, rx, ry)

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
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function bezierCurveTo(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2)

/**
 * Calculate points for smooth bezier curves passing through a series of points
 * based on https://www.particleincell.com/2012/bezier-splines/
 * @param {number} x1 - starting point
 * @param {number} y1
 * @param {number} [x2]
 * @param {number} [y2]
 * ...
 * @param {number} xn - ending point
 * @param {number} yn
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function bezierCurveThrough()
```
## License  
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
