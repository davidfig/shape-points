/**
 * Calculate points for a bezier curve with a starting point and two control points
 * from https://stackoverflow.com/a/15399173/1955997
 * @module shape-points/bezierCurveTo
 * @param {number} x1 - starting point (usually a moveTo)
 * @param {number} y1 - starting point
 * @param {number} cp1x - first control point
 * @param {number} cp1y - first control point
 * @param {number} cp2x - second control point
 * @param {number} cp2y - second control point
 * @param {number} x2 - ending point
 * @param {number} y2 - ending point
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
export function bezierCurveTo(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2, pointsInArc)
{
    pointsInArc = pointsInArc || 5
    const points = []
    const interval = 1 / pointsInArc
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
