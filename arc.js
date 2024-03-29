/**
 * calculate points for arc
 * @module shape-points/arc
 * @param {number} x
 * @param {number} y
 * @param {number} start angle (radians)
 * @param {number} end angle (radians)
 * @param {number} radius
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
export function arc(x, y, start, end, radius, pointsInArc)
{
    pointsInArc = pointsInArc > 1 ? pointsInArc : 5
    const points = []
    let angle = start
    const interval = (end - start) / (pointsInArc - 1)
    for (let count = 0; count < pointsInArc; count++)
    {
        points.push(x + radius * Math.cos(angle), y + radius * Math.sin(angle))
        angle += interval
    }
    return points
}

