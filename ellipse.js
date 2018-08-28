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
{
    pointsInArc = pointsInArc || 5
    const points = []
    const interval = Math.PI * 2 / (pointsInArc * 4)
    for (let i = 0; i < Math.PI * 2; i += interval)
    {
        points.push(x - rx * Math.sin(i), y - ry * Math.cos(i))
    }
    return points
}

