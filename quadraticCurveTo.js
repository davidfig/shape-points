/**
 * calculate points in a quadratic curve
 * @module shape-points/quadraticCurveTo
 * @param {number} x1 - starting point
 * @param {number} y1
 * @param {number} cp1x - control point
 * @param {number} cp1y
 * @param {number} x2 - ending point
 * @param {number} y2
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
export function quadraticCurveTo(x1, y1, cp1x, cp1y, x2, y2, pointsInArc)
{
    pointsInArc = pointsInArc || 5
    const points = []
    const interval = 1 / pointsInArc
    for (let t = 0; t <= 1; t += interval)
    {
        const B0_t = Math.pow(1 - t, 2),
            B1_t = 2 * t * (1 - t),
            B2_t = Math.pow(t, 2)

        points.push(
            (B0_t * x1) + (B1_t * cp1x) + (B2_t * x2),
            (B0_t * y1) + (B1_t * cp1y) + (B2_t * y2)
        )
    }
    return points
}