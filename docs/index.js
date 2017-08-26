const ShapePoints = require('..')
const Angle = require('yy-angle')

const canvas = document.createElement('canvas')
canvas.width = canvas.height = 500
document.body.appendChild(canvas)
const c = canvas.getContext('2d')

function draw(points)
{
    c.beginPath()
    c.moveTo(points[0], points[1])
    for (let i = 2; i < points.length; i += 2)
    {
        c.lineTo(points[i], points[i + 1])
    }
    c.closePath()
    c.strokeStyle = 'black'
    c.stroke()
}

function circle(x, y, radius)
{
    c.beginPath()
    c.arc(x, y, radius, 0, Math.PI * 2)
    c.stroke()
}

draw(ShapePoints.roundedRect(250, 250, 200, 100, 30))

c.beginPath()
const points = 5
const angle1 = 3 * Math.PI / 2
const angle2 = 0
const radius = 20
let x = 200 - radius
let y = 10 + radius
let angle = angle1

circle(x, y, 10)

circle(x + Math.cos(angle1) * radius, y + Math.sin(angle1) * radius, 5)
circle(x + Math.cos(angle2) * radius, y + Math.sin(angle2) * radius, 5)

c.moveTo(10, 10)
c.lineTo(200 - radius, 10)

const interval = Angle.differenceAnglesSign(angle2, angle1) * Angle.differenceAngles(angle2, angle1) / points
for (let i = 0; i < points; i++)
{
    c.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius)
    angle += interval
}
c.strokeStyle = 'red'
c.stroke()