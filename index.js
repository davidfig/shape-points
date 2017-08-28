const Angle = require('yy-angle')

let _pointsInArc = 5

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
 * Adjustable rounded rectangle
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {object} radii
 * @param {number} [radii.topLeft]
 * @param {number} [radii.topRight]
 * @param {number} [radii.bottomLeft]
 * @param {number} [radii.bottomRight]
 */
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
 * Normal rounded rectangle
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number|object} radius
 * @param {number} [radius.topLeft]
 * @param {number} [radius.topRight]
 * @param {number} [radius.bottomLeft]
 * @param {number} [radius.bottomRight]
 */
function roundedRect(x, y, width, height, radius)
{
    if (isNaN(radius))
    {
        return roundedRectEach(x, y, width, height, radius)
    }
    const points = [
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
    return points
}

module.exports = {
    arc,
    roundedRect,
    get pointsInArc()
    {
        return _pointsInArc
    },
    set pointsInArc(value)
    {
        _pointsInArc = value
    }
}