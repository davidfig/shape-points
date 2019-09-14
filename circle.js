/**
 * calculate points for a circle (calculates using pointsInArc * 4)
 * @module shape-points/circle
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
export function circle(x, y, radius, pointsInArc)
{
    pointsInArc = pointsInArc || 5
    const points = []
    const interval = Math.PI * 2 / (pointsInArc * 4)
    for (let i = 0; i < Math.PI * 2; i += interval)
    {
        points.push(x + Math.cos(i) * radius, y + Math.sin(i) * radius)
    }
    return points
}