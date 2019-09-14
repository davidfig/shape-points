/**
 * calculate points for rectangle
 * @module shape-points/rect
 * @param {number} x (center)
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
export function rect(x, y, width, height)
{
    return [
        x - width / 2, y - height / 2,
        x + width / 2, y - height / 2,
        x + width / 2, y + height / 2,
        x - width / 2, y + height / 2
    ]
}