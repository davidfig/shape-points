/**
 * calculate points for a line with a certain thickness (either one thickness or a starting and ending thickness)
 * @module shape-points/line
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number|object} [thickness]
 * @param {number} thickness.start
 * @param {number} thickness.end
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
export function line(x1, y1, x2, y2, thickness)
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

