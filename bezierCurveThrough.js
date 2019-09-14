import Curve from 'fit-curve'

import { bezierCurveTo } from './bezierCurveTo'

/**
 * Calculate points for smooth bezier curves passing through a series of points
 * uses https://github.com/soswow/fit-curve/blob/master/src/fit-curve.js
 * uses ShapePoints.curveError=50 for error value
 * @module shape-points/bezierCurveThrough
 * @param {(number|number[])} x1 - starting point or array of points [x1, y1, x2, y2, ... xn, yn]
 * @param {number} [y1]
 * @param {number} [x2]
 * @param {number} [y2]
 * @param {number} [xn] - ending point
 * @param {number} [yn]
 * @param {object} [options]
 * @param {number} [options.pointsInArc=5]
 * @param {number} [options.curveError=50]
 * @returns {number[]} [x1, y1, x2, y2, ... xn, yn]
 */
export function bezierCurveThrough()
{
    let pointsInArc = 5, curveError = 50
    const points = []
    if (Array.isArray(arguments[0]))
    {
        const array = arguments[0]
        for (let i = 0; i < array.length; i += 2)
        {
            points.push([array[i], array[i + 1]])
        }
        if (arguments.length === 2)
        {
            pointsInArc = arguments[1].pointsInArc
            curveError = arguments[1].curveError
        }
    }
    else
    {
        let length = arguments.length
        if (arguments.length % 2 === 1)
        {
            length--
            pointsInArc = arguments[length].pointsInArc
            curveError = arguments[length].curveError
        }
        for (let i = 0; i < length; i += 2)
        {
            points.push([arguments[i], arguments[i + 1]])
        }
    }

    // two points creates a line
    if (points.length === 2)
    {
        return [points[0][0], points[0][1], points[1][0], points[1][1]]
    }

    // not enough points
    if (points.length < 4)
    {
        return []
    }

    const results = []
    const curves = Curve(points, curveError)
    for (let i = 0; i < curves.length; i++)
    {
        const c = curves[i]
        results.push(...bezierCurveTo(c[0][0], c[0][1], c[1][0], c[1][1], c[2][0], c[2][1], c[3][0], c[3][1], pointsInArc))
    }
    return results
}