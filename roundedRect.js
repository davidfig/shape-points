const arc = require('./arc')

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
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
module.exports = function roundedRect(x, y, width, height, radius, pointsInArc)
{
    pointsInArc = pointsInArc || 5
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
            points.push(...arc(x + width / 2 - radius.topRight, y - height / 2 + radius.topRight, 3 * Math.PI / 2, Math.PI * 2, radius.topRight, pointsInArc))
        }
        points.push(
            x + width / 2, y - height / 2 + radius.topRight,
            x + width / 2, y + height / 2 - radius.bottomRight
        )
        if (radius.bottomRight)
        {
            points.push(...arc(x + width / 2 - radius.bottomRight, y + height / 2 - radius.bottomRight, 0, Math.PI / 2, radius.bottomRight, pointsInArc))
        }
        points.push(
            x + width / 2 - radius.bottomRight, y + height / 2,
            x - width / 2 + radius.bottomLeft, y + height / 2
        )
        if (radius.bottomLeft)
        {
            points.push(...arc(x - width / 2 + radius.bottomLeft, y + height / 2 - radius.bottomLeft, Math.PI / 2, Math.PI, radius.bottomLeft, pointsInArc))
        }
        points.push(
            x - width / 2, y + height / 2 - radius.bottomLeft,
            x - width / 2, y - height / 2 + radius.topLeft
        )
        if (radius.topLeft)
        {
            points.push(...arc(x - width / 2 + radius.topLeft, y - height / 2 + radius.topLeft, Math.PI, 3 * Math.PI / 2, radius.topLeft, pointsInArc))
        }
        return points
    }
    return [
        x - width / 2 + radius, y - height / 2,
        x + width / 2 - radius, y - height / 2,
        ...arc(x + width / 2 - radius, y - height / 2 + radius, 3 * Math.PI / 2, 2 * Math.PI, radius, pointsInArc),
        x + width / 2, y - height / 2 + radius,
        x + width / 2, y + height / 2 - radius,
        ...arc(x + width / 2 - radius, y + height / 2 - radius, 0, Math.PI / 2, radius, pointsInArc),
        x + width / 2 - radius, y + height / 2,
        x - width / 2 + radius, y + height / 2,
        ...arc(x - width / 2 + radius, y + height / 2 - radius, Math.PI / 2, Math.PI, radius, pointsInArc),
        x - width / 2, y + height / 2 - radius,
        x - width / 2, y - height / 2 + radius,
        ...arc(x - width / 2 + radius, y - height / 2 + radius, Math.PI, 3 * Math.PI / 2, radius, pointsInArc),
    ]
}