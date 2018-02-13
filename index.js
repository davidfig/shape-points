const Angle = require('yy-angle')
const Curve = require('fit-curve')

let _pointsInArc = 5
let _curveError = 50
/**
 * calculate points for rectangle
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function rect(x, y, width, height)
{
    return [
        x - width / 2, y - height / 2,
        x + width / 2, y - height / 2,
        x + width / 2, y + height / 2,
        x - width / 2, y + height / 2
    ]
}

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
{
    const points = []
    let angle = start
    const interval = Angle.differenceAnglesSign(end, start) * Angle.differenceAngles(end, start) / _pointsInArc
    for (let count = 0; count < _pointsInArc; count++)
    {
        points.push(x + radius * Math.cos(angle), y + radius * Math.sin(angle))
        angle += interval
    }
    return points
}

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
{
    if (isNaN(radius))
    {
        radius.topLeft = radius.topLeft || 0
        radius.topRight = radius.topRight || 0
        radius.bottomLeft = radius.bottomLeft || 0
        radius.bottomRight = radius.bottomRight || 0
        const points = [
            x - width / 2 + radius.topLeft, y - height / 2,
            x + width / 2 - radius.topRight, y - height / 2
        ]
        if (radius.topRight)
        {
            points.push(...arc(x + width / 2 - radius.topRight, y - height / 2 + radius.topRight, 3 * Math.PI / 2, 0, radius.topRight))
        }
        points.push(
            x + width / 2, y - height / 2 + radius.topRight,
            x + width / 2, y + height / 2 - radius.bottomRight
        )
        if (radius.bottomRight)
        {
            points.push(...arc(x + width / 2 - radius.bottomRight, y + height / 2 - radius.bottomRight, 0, Math.PI / 2, radius.bottomRight))
        }
        points.push(
            x + width / 2 - radius.bottomRight, y + height / 2,
            x - width / 2 + radius.bottomLeft, y + height / 2
        )
        if (radius.bottomLeft)
        {
            points.push(...arc(x - width / 2 + radius.bottomLeft, y + height / 2 - radius.bottomLeft, Math.PI / 2, Math.PI, radius.bottomLeft))
        }
        points.push(
            x - width / 2, y + height / 2 - radius.bottomLeft,
            x - width / 2, y - height / 2 + radius.topLeft
        )
        if (radius.topLeft)
        {
            points.push(...arc(x - width / 2 + radius.topLeft, y - height / 2 + radius.topLeft, Math.PI, 3 * Math.PI / 2, radius.topLeft))
        }
        return points
    }
    return [
        x - width / 2 + radius, y - height / 2,
        x + width / 2 - radius, y - height / 2,
        ...arc(x + width / 2 - radius, y - height / 2 + radius, 3 * Math.PI / 2, 0, radius),
        x + width / 2, y - height / 2 + radius,
        x + width / 2, y + height / 2 - radius,
        ...arc(x + width / 2 - radius, y + height / 2 - radius, 0, Math.PI / 2, radius),
        x + width / 2 - radius, y + height / 2,
        x - width / 2 + radius, y + height / 2,
        ...arc(x - width / 2 + radius, y + height / 2 - radius, Math.PI / 2, Math.PI, radius),
        x - width / 2, y + height / 2 - radius,
        x - width / 2, y - height / 2 + radius,
        ...arc(x - width / 2 + radius, y - height / 2 + radius, Math.PI, 3 * Math.PI / 2, radius),
    ]
}

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
{
    thickness = thickness || 0
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const perp = angle - Math.PI / 2
    const half = isNaN(thickness) ? { start: thickness.start / 2, end: thickness.end / 2 } : { start: thickness / 2, end: thickness / 2 }
    return [
        x1 - Math.cos(perp) * half.start, y1 - Math.sin(perp) * half.start,
        x2 - Math.cos(perp) * half.end, y2 - Math.sin(perp) * half.end,
        x2 + Math.cos(perp) * half.end, y2 + Math.sin(perp) * half.end,
        x1 + Math.cos(perp) * half.start, y1 + Math.sin(perp) * half.start
    ]
}

/**
 * calculate points for a circle (calculates using pointsInArc * 4)
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function circle(x, y, radius)
{
    const points = []
    const interval = Math.PI * 2 / (_pointsInArc * 4)
    for (let i = 0; i < Math.PI * 2; i += interval)
    {
        points.push(x + Math.cos(i) * radius, y + Math.sin(i) * radius)
    }
    return points
}

/**
 * calculate points for a ellipse (calculates using pointsInArc * 4)
 * @param {number} x
 * @param {number} y
 * @param {number} rx
 * @param {number} ry
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function ellipse(x, y, rx, ry)
{
    const points = []
    const interval = Math.PI * 2 / (_pointsInArc * 4)
    for (let i = 0; i < Math.PI * 2; i += interval)
    {
        points.push(x - rx * Math.sin(i), y - ry * Math.cos(i))
    }
    return points
}

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
{
    const points = []
    const interval = 1 / _pointsInArc
    for (let t = 0; t <= 1; t += interval)
    {
        const B0_t = Math.pow(1 - t, 3),
            B1_t = 3 * t * Math.pow(1 - t, 2),
            B2_t = 3 * Math.pow(t, 2) * (1 - t),
            B3_t = Math.pow(t, 3)

        points.push(
            (B0_t * x1) + (B1_t * cp1x) + (B2_t * cp2x) + (B3_t * x2),
            (B0_t * y1) + (B1_t * cp1y) + (B2_t * cp2y) + (B3_t * y2)
        )
    }
    return points
}


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
 * @returns {number[]} [x1, y1, x2, y2, ... xn, yn]
 */
function bezierCurveThrough()
{
    const points = []
    if (Array.isArray(arguments[0]))
    {
        const array = arguments[0]
        for (let i = 0; i < array.length; i += 2)
        {
            points.push([array[i], array[i + 1]])
        }
    }
    else
    {
        for (let i = 0; i < arguments.length; i += 2)
        {
            points.push([arguments[i], arguments[i + 1]])
        }
    }

    // two points creates a line
    if (points.length === 4)
    {
        return [points[0], points[1], points[2], points[3]]
    }

    // not enough points
    if (points.length < 4)
    {
        return
    }

    const results = []
    const curves = Curve(points, _curveError)
    for (let i = 0; i < curves.length; i++)
    {
        const c = curves[i]
        results.push(...bezierCurveTo(c[0][0], c[0][1], c[1][0], c[1][1], c[2][0], c[2][1], c[3][0], c[3][1]))
    }
    return results
}

module.exports = {
    arc,
    rect,
    roundedRect,
    line,
    circle,
    ellipse,
    bezierCurveTo,
    bezierCurveThrough,
    get pointsInArc()
    {
        return _pointsInArc
    },
    set pointsInArc(value)
    {
        _pointsInArc = value
    },
    get curveError()
    {
        return _curveError
    },
    set curveError(value)
    {
        _curveError = value
    }

}
