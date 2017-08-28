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

### function rect(x, y, width, height)
get points for a rectangle
 - {number} x - center of rectangle
 - {number} y - center of rectangle
 - {number} width
 - {number} height
 - @returns {number[]} array of points in form of [x1, y1, x2, y2, ... xn, yn]

### function arc(x, y, start, end, radius)
get points for an arc
 - {number} x - center of arc
 - {number} y - center of arc
 - {number} start - angle start in radians
 - {number} end - angle end in radians
 - {number} radius
 - @returns {number[]} array of points in form of [x1, y1, x2, y2, ... xn, yn] 

### function roundedRect(x, y, width, height, radius)
get points for a rounded rect
 - {number} x - center of rect
 - {number} y - center of rect
 - {number} width of rectangle
 - {number} height of rectangle
 - {number|object} radius of corner(s)
 - {number} radius.topLeft
 - {number} radius.topRight
 - {number} radius.bottomLeft
 - {number} radius.bottomRight  
 - @returns {number[]} array of points in form of [x1, y1, x2, y2, ... xn, yn] 

### pointsInArc
sets/gets the number of points in the arc
 - {number} pointsInArc

## license  
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)