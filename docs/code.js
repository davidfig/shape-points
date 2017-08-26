const ShapePoints = require('..')

function circle(c, x, y, radius)
{
    c.beginPath()
    c.arc(x, y, radius, 0, Math.PI * 2)
    c.stroke()
}

function draw(c, points)
{
    c.strokeStyle = 'black'
    c.beginPath()
    c.moveTo(points[0], points[1])
    for (let i = 2; i < points.length; i += 2)
    {
        c.lineTo(points[i], points[i + 1])
    }
    c.closePath()
    c.stroke()
    c.strokeStyle = 'red'
    for (let i = 0; i < points.length; i += 2)
    {
        circle(c, points[i], points[i + 1], 3)
    }
}

window.onload = function ()
{
    const canvas = document.getElementById('canvas')
    canvas.width = 500
    canvas.height = 200
    const c = canvas.getContext('2d')

    draw(c, ShapePoints.roundedRect(125, 100, 200, 100, 30))

    require('./highlight')()
}