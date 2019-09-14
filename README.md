# shape-points
Generate points for simple shapes and curves: arcs, rectangles, rounded rectangles, circles, ellipses, bezierCurveTo, bezierCurveThrough (i.e., bezier curves through specific points)

## rationale

I needed to find the points of a rounded rectangle. Then I had fun adding lots of other shapes and curves.

## installation

```
yarn add shape-points
```
or
```
npm i shape-points
```
## programmatic example
```js
import * as ShapePoints from 'shape-points'

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
https://davidfig.github.io/shape-points/jsdoc/

## License  
MIT License  
(c) 2018 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
