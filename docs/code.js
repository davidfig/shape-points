const ShapePoints = require('..')
let c

function test()
{
    control(125, 100)
    draw(ShapePoints.roundedRect(125, 100, 150, 100, 30))

    control(300, 100)
    draw(ShapePoints.roundedRect(300, 100, 100, 100, { topLeft: 30, bottomLeft: 60 }))

    control(450, 100)
    draw(ShapePoints.roundedRect(450, 100, 100, 100, { topRight: 60, bottomRight: 30 }))

    control(600, 100)
    draw(ShapePoints.rect(600, 100, 100, 75))

    control(700, 50, 750, 125)
    draw(ShapePoints.line(700, 50, 750, 125, 25))

    control(775, 50, 825, 125)
    draw(ShapePoints.line(775, 50, 825, 125, { start: 10, end: 50 }))

    control(125, 250)
    draw(ShapePoints.circle(125, 250, 75))

    control(250, 250, 300, 250, 250, 200, 330, 190)
    draw(ShapePoints.bezierCurveTo(250, 250, 250, 200, 330, 190, 300, 250), true)

    control(380, 250, 425, 320, 450, 200, 500, 240)
    draw(ShapePoints.bezierCurveThrough(380, 250, 425, 320, 450, 200, 500, 240), true)

    control(600, 250, 600 + 50, 250, 600, 250 + 75)
    draw(ShapePoints.ellipse(600, 250, 50, 75))

    let i = 200

    control(0 + i, 0 + i, 204 + i, -63 + i, 303 + i, -98 + i, 424 + i, -96 +i, 1500 + i, 0+i)
    draw(ShapePoints.bezierCurveThrough(0 + i, 0 + i, 204 + i, -63 + i, 303 + i, -98 + i, 424 + i, -96 + i, 1500 + i, 0 + i))
}

function control()
{
    for (let i = 0; i < arguments.length; i += 2)
    {
        circle(arguments[i], arguments[i + 1], 5, 'green')
    }
}

function point(x, y)
{
    circle(x, y, 3, 'red')
}

function circle(x, y, radius, color)
{
    c.beginPath()
    c.strokeStyle = color
    c.arc(x, y, radius, 0, Math.PI * 2)
    c.stroke()
}

function draw(points, noClose)
{
    c.strokeStyle = 'black'
    c.beginPath()
    c.moveTo(points[0], points[1])
    for (let i = 2; i < points.length; i += 2)
    {
        c.lineTo(points[i], points[i + 1])
    }
    if (!noClose)
    {
        c.closePath()
    }
    c.stroke()
    for (let i = 0; i < points.length; i += 2)
    {
        point(points[i], points[i + 1])
    }
}

window.onload = function ()
{
    const canvas = document.getElementById('canvas')
    canvas.width = 1000
    canvas.height = 400
    c = canvas.getContext('2d')

    test()
    require('fork-me-github')('https://github.com/davidfig/shape-points')
    require('./highlight')()
}