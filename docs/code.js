// all import example
import * as ShapePoints from '..'
import { quadraticCurveTo } from '..'

import forkMe from 'fork-me-github'
import highlight from './highlight'

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

    control(300, 250, 300 + 50, 250, 300, 250 + 75)
    draw(ShapePoints.ellipse(300, 250, 50, 75))

    control(400, 250, 400, 200, 480, 190, 450, 250)
    draw(ShapePoints.bezierCurveTo(400, 250, 400, 200, 480, 190, 450, 250), true)

    control(510, 250, 580, 200, 630, 240, 555, 320)
    draw(ShapePoints.bezierCurveThrough(510, 250, 580, 200, 630, 240, 555, 320), true)

    control(700, 250, 750, 200, 800, 250)
    draw(quadraticCurveTo(700, 250, 750, 200, 800, 250), true)
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
    forkMe()
    highlight()
}