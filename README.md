# shape-points
Generate coordinates for simple geometric shapes, such as arcs and rounded rectangles

## rationale

I needed to find the points of a rounded rectangle.

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
 * points in rectangle
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function rect(x, y, width, height)

/**
 * points in arc
 * @param {number} x
 * @param {number} y
 * @param {number} start angle (radians)
 * @param {number} end angle (radians)
 * @param {number} radius
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function arc(x, y, start, end, radius)

/**
 * rounded rectangle
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
 * line with thickness
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
 * circle
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function circle(x, y, radius)
```
## License  
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)