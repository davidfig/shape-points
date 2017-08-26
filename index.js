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

function roundedRect(x, y, width, height, radius)
{
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