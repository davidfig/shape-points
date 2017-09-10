const Angle = require('yy-angle')

let _pointsInArc = 5

/**
 * points in rectangle
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
 * points in arc
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

function roundedRectEach(x, y, width, height, radii)
{
    radii.topLeft = radii.topLeft || 0
    radii.topRight = radii.topRight || 0
    radii.bottomLeft = radii.bottomLeft || 0
    radii.bottomRight = radii.bottomRight || 0
    const points = [
        x - width / 2 + radii.topLeft, y - height / 2,
        x + width / 2 - radii.topRight, y - height / 2
    ]
    if (radii.topRight)
    {
        points.push(...arc(x + width / 2 - radii.topRight, y - height / 2 + radii.topRight, 3 * Math.PI / 2, 0, radii.topRight))
    }
    points.push(
        x + width / 2, y - height / 2 + radii.topRight,
        x + width / 2, y + height / 2 - radii.bottomRight
    )
    if (radii.bottomRight)
    {
        points.push(...arc(x + width / 2 - radii.bottomRight, y + height / 2 - radii.bottomRight, 0, Math.PI / 2, radii.bottomRight))
    }
    points.push(
        x + width / 2 - radii.bottomRight, y + height / 2,
        x - width / 2 + radii.bottomLeft, y + height / 2
    )
    if (radii.bottomLeft)
    {
        points.push(...arc(x - width / 2 + radii.bottomLeft, y + height / 2 - radii.bottomLeft, Math.PI / 2, Math.PI, radii.bottomLeft))
    }
    points.push(
        x - width / 2, y + height / 2 - radii.bottomLeft,
        x - width / 2, y - height / 2 + radii.topLeft
    )
    if (radii.topLeft)
    {
        points.push(...arc(x - width / 2 + radii.topLeft, y - height / 2 + radii.topLeft, Math.PI, 3 * Math.PI / 2, radii.topLeft))
    }
    return points
}

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
{
    if (isNaN(radius))
    {
        return roundedRectEach(x, y, width, height, radius)
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
 * circle
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function circle(x, y, radius)
{
    const points = []
    const interval = Math.PI * 2 / (_pointsInArc * 4)
    for (let i = 0; i < _pointsInArc * 4 - interval * 2; i += interval)
    {
        points.push(x + Math.cos(i) * radius, y + Math.sin(i) * radius)
    }
    return points
}

/**
 * Calculate points for a bezier curve
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
 * Calculate bezier curve(s) that pass through a series of points
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
{
    function updateCoordinate(K)
    {
        const p1 = []
        const p2 = []
        let n = K.length - 1

        /* rhs vector */
        const a = []
        const b = []
        const c = []
        const r = []

        /* left most segment */
        a[0] = 0
        b[0] = 2
        c[0] = 1
        r[0] = K[0] + 2 * K[1]

        /* internal segments */
        for (let i = 1; i < n - 1; i++)
        {
            a[i] = 1
            b[i] = 4
            c[i] = 1
            r[i] = 4 * K[i] + 2 * K[i + 1]
        }

        /* right segment */
        a[n - 1] = 2
        b[n - 1] = 7
        c[n - 1] = 0
        r[n - 1] = 8 * K[n - 1] + K[n]

        /* solves Ax=b with the Thomas algorithm (from Wikipedia) */
        for (let i = 1; i < n; i++)
        {
            const m = a[i] / b[i - 1]
            b[i] -= m * c[i - 1]
            r[i] -= m * r[i - 1]
        }

        p1[n - 1] = r[n - 1] / b[n - 1]
        for (let i = n - 2; i >= 0; --i)
            p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i]

        /* we have p1, now compute p2 */
        for (let i = 0; i < n - 1; i++)
            p2[i] = 2 * K[i + 1] - p1[i + 1]

        p2[n - 1] = 0.5 * (K[n] + p1[n - 1])
        return [p1, p2]
    }

    const xs = [], ys = []
    for (let i = 0; i < arguments.length; i += 2)
    {
        xs.push(arguments[i])
        ys.push(arguments[i + 1])
    }

    // not enough points
    if (arguments.length <= 4)
    {
        return
    }

    // two points creates a line
    if (arguments.length === 4)
    {
        return [arguments[0], arguments[1], arguments[2], arguments[3]]
    }

    const results = []
    const xResults = updateCoordinate(xs)
    const yResults = updateCoordinate(ys)
    const x = arguments[0]
    const y = arguments[1]
    results.push(x, y)
    let lastX = x, lastY = y
    for (let i = 0; i < arguments.length - 1; i += 2)
    {
        const index = i / 2
        const x2 = arguments[i + 2]
        const y2 = arguments[i + 3]
        results.push(...bezierCurveTo(lastX, lastY, xResults[0][index], yResults[0][index], xResults[1][index], yResults[1][index], x2, y2))
        lastX = x2
        lastY = y2
    }
    return results
}

module.exports = {
    arc,
    rect,
    roundedRect,
    line,
    circle,
    bezierCurveTo,
    bezierCurveThrough,
    get pointsInArc()
    {
        return _pointsInArc
    },
    set pointsInArc(value)
    {
        _pointsInArc = value
    }
}