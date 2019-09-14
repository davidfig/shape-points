/**
 * calculate points for rectangle
 * @module shape-points/rect
 * @param {number} x (center)
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function rect(x, y, width, height)
{
    return [
        x - width / 2, y - height / 2,
        x + width / 2, y - height / 2,
        x + width / 2, y + height / 2,
        x - width / 2, y + height / 2
    ]
}

/**
 * calculate points for arc
 * @module shape-points/arc
 * @param {number} x
 * @param {number} y
 * @param {number} start angle (radians)
 * @param {number} end angle (radians)
 * @param {number} radius
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function arc(x, y, start, end, radius, pointsInArc)
{
    pointsInArc = pointsInArc || 5;
    const points = [];
    let angle = start;
    const interval = (end - start) / pointsInArc;
    for (let count = 0; count < pointsInArc; count++)
    {
        points.push(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
        angle += interval;
    }
    return points
}

/**
 * calculate points for a rounded rectangle with one corner radius, or 4 separate corner radii
 * @module shape-points/roundedRect
 * @param {number} x (center)
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {(number|object)} radius
 * @param {number} [radius.topLeft]
 * @param {number} [radius.topRight]
 * @param {number} [radius.bottomLeft]
 * @param {number} [radius.bottomRight]
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function roundedRect(x, y, width, height, radius, pointsInArc)
{
    pointsInArc = pointsInArc || 5;
    if (isNaN(radius))
    {
        radius.topLeft = radius.topLeft || 0;
        radius.topRight = radius.topRight || 0;
        radius.bottomLeft = radius.bottomLeft || 0;
        radius.bottomRight = radius.bottomRight || 0;
        const points = [
            x - width / 2 + radius.topLeft, y - height / 2,
            x + width / 2 - radius.topRight, y - height / 2
        ];
        if (radius.topRight)
        {
            points.push(...arc(x + width / 2 - radius.topRight, y - height / 2 + radius.topRight, 3 * Math.PI / 2, Math.PI * 2, radius.topRight, pointsInArc));
        }
        points.push(
            x + width / 2, y - height / 2 + radius.topRight,
            x + width / 2, y + height / 2 - radius.bottomRight
        );
        if (radius.bottomRight)
        {
            points.push(...arc(x + width / 2 - radius.bottomRight, y + height / 2 - radius.bottomRight, 0, Math.PI / 2, radius.bottomRight, pointsInArc));
        }
        points.push(
            x + width / 2 - radius.bottomRight, y + height / 2,
            x - width / 2 + radius.bottomLeft, y + height / 2
        );
        if (radius.bottomLeft)
        {
            points.push(...arc(x - width / 2 + radius.bottomLeft, y + height / 2 - radius.bottomLeft, Math.PI / 2, Math.PI, radius.bottomLeft, pointsInArc));
        }
        points.push(
            x - width / 2, y + height / 2 - radius.bottomLeft,
            x - width / 2, y - height / 2 + radius.topLeft
        );
        if (radius.topLeft)
        {
            points.push(...arc(x - width / 2 + radius.topLeft, y - height / 2 + radius.topLeft, Math.PI, 3 * Math.PI / 2, radius.topLeft, pointsInArc));
        }
        return points
    }
    return [
        x - width / 2 + radius, y - height / 2,
        x + width / 2 - radius, y - height / 2,
        ...arc(x + width / 2 - radius, y - height / 2 + radius, 3 * Math.PI / 2, 2 * Math.PI, radius, pointsInArc),
        x + width / 2, y - height / 2 + radius,
        x + width / 2, y + height / 2 - radius,
        ...arc(x + width / 2 - radius, y + height / 2 - radius, 0, Math.PI / 2, radius, pointsInArc),
        x + width / 2 - radius, y + height / 2,
        x - width / 2 + radius, y + height / 2,
        ...arc(x - width / 2 + radius, y + height / 2 - radius, Math.PI / 2, Math.PI, radius, pointsInArc),
        x - width / 2, y + height / 2 - radius,
        x - width / 2, y - height / 2 + radius,
        ...arc(x - width / 2 + radius, y - height / 2 + radius, Math.PI, 3 * Math.PI / 2, radius, pointsInArc),
    ]
}

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
function line(x1, y1, x2, y2, thickness)
{
    thickness = thickness || 0;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const perp = angle - Math.PI / 2;
    const half = isNaN(thickness) ? { start: thickness.start / 2, end: thickness.end / 2 } : { start: thickness / 2, end: thickness / 2 };
    return [
        x1 - Math.cos(perp) * half.start, y1 - Math.sin(perp) * half.start,
        x2 - Math.cos(perp) * half.end, y2 - Math.sin(perp) * half.end,
        x2 + Math.cos(perp) * half.end, y2 + Math.sin(perp) * half.end,
        x1 + Math.cos(perp) * half.start, y1 + Math.sin(perp) * half.start
    ]
}

/**
 * calculate points for a circle (calculates using pointsInArc * 4)
 * @module shape-points/circle
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function circle(x, y, radius, pointsInArc)
{
    pointsInArc = pointsInArc || 5;
    const points = [];
    const interval = Math.PI * 2 / (pointsInArc * 4);
    for (let i = 0; i < Math.PI * 2; i += interval)
    {
        points.push(x + Math.cos(i) * radius, y + Math.sin(i) * radius);
    }
    return points
}

/**
 * calculate points for a ellipse (calculates using pointsInArc * 4)
 * @module shape-points/ellipse
 * @param {number} x
 * @param {number} y
 * @param {number} rx
 * @param {number} ry
 * @param {number} [pointsInArc=5]
 * @returns {array} [x1, y1, x2, y2, ... xn, yn]
 */
function ellipse(x, y, rx, ry, pointsInArc)
{
    pointsInArc = pointsInArc || 5;
    const points = [];
    const interval = Math.PI * 2 / (pointsInArc * 4);
    for (let i = 0; i < Math.PI * 2; i += interval)
    {
        points.push(x - rx * Math.sin(i), y - ry * Math.cos(i));
    }
    return points
}

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
function bezierCurveTo(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2, pointsInArc)
{
    pointsInArc = pointsInArc || 5;
    const points = [];
    const interval = 1 / pointsInArc;
    for (let t = 0; t <= 1; t += interval)
    {
        const B0_t = Math.pow(1 - t, 3),
            B1_t = 3 * t * Math.pow(1 - t, 2),
            B2_t = 3 * Math.pow(t, 2) * (1 - t),
            B3_t = Math.pow(t, 3);

        points.push(
            (B0_t * x1) + (B1_t * cp1x) + (B2_t * cp2x) + (B3_t * x2),
            (B0_t * y1) + (B1_t * cp1y) + (B2_t * cp2y) + (B3_t * y2)
        );
    }
    return points
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var fitCurve = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    {
        factory(module);
    }
})(commonjsGlobal, function (module) {

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    // ==ClosureCompiler==
    // @output_file_name fit-curve.min.js
    // @compilation_level SIMPLE_OPTIMIZATIONS
    // ==/ClosureCompiler==

    /**
     *  @preserve  JavaScript implementation of
     *  Algorithm for Automatically Fitting Digitized Curves
     *  by Philip J. Schneider
     *  "Graphics Gems", Academic Press, 1990
     *
     *  The MIT License (MIT)
     *
     *  https://github.com/soswow/fit-curves
     */

    /**
     * Fit one or more Bezier curves to a set of points.
     *
     * @param {Array<Array<Number>>} points - Array of digitized points, e.g. [[5,5],[5,50],[110,140],[210,160],[320,110]]
     * @param {Number} maxError - Tolerance, squared error between points and fitted curve
     * @returns {Array<Array<Array<Number>>>} Array of Bezier curves, where each element is [first-point, control-point-1, control-point-2, second-point] and points are [x, y]
     */
    function fitCurve(points, maxError, progressCallback) {
        if (!Array.isArray(points)) {
            throw new TypeError("First argument should be an array");
        }
        points.forEach(function (point) {
            if (!Array.isArray(point) || point.length !== 2 || typeof point[0] !== 'number' || typeof point[1] !== 'number') {
                throw Error("Each point should be an array of two numbers");
            }
        });
        // Remove duplicate points
        points = points.filter(function (point, i) {
            return i === 0 || !(point[0] === points[i - 1][0] && point[1] === points[i - 1][1]);
        });

        if (points.length < 2) {
            return [];
        }

        var len = points.length;
        var leftTangent = createTangent(points[1], points[0]);
        var rightTangent = createTangent(points[len - 2], points[len - 1]);

        return fitCubic(points, leftTangent, rightTangent, maxError, progressCallback);
    }

    /**
     * Fit a Bezier curve to a (sub)set of digitized points.
     * Your code should not call this function directly. Use {@link fitCurve} instead.
     *
     * @param {Array<Array<Number>>} points - Array of digitized points, e.g. [[5,5],[5,50],[110,140],[210,160],[320,110]]
     * @param {Array<Number>} leftTangent - Unit tangent vector at start point
     * @param {Array<Number>} rightTangent - Unit tangent vector at end point
     * @param {Number} error - Tolerance, squared error between points and fitted curve
     * @returns {Array<Array<Array<Number>>>} Array of Bezier curves, where each element is [first-point, control-point-1, control-point-2, second-point] and points are [x, y]
     */
    function fitCubic(points, leftTangent, rightTangent, error, progressCallback) {
        var MaxIterations = 20; //Max times to try iterating (to find an acceptable curve)

        var bezCurve, //Control points of fitted Bezier curve
        u, //Parameter values for point
        uPrime, //Improved parameter values
        maxError, prevErr, //Maximum fitting error
        splitPoint, prevSplit, //Point to split point set at if we need more than one curve
        centerVector, toCenterTangent, fromCenterTangent, //Unit tangent vector(s) at splitPoint
        beziers, //Array of fitted Bezier curves if we need more than one curve
        dist, i;

        //console.log('fitCubic, ', points.length);

        //Use heuristic if region only has two points in it
        if (points.length === 2) {
            dist = maths.vectorLen(maths.subtract(points[0], points[1])) / 3.0;
            bezCurve = [points[0], maths.addArrays(points[0], maths.mulItems(leftTangent, dist)), maths.addArrays(points[1], maths.mulItems(rightTangent, dist)), points[1]];
            return [bezCurve];
        }

        //Parameterize points, and attempt to fit curve
        u = chordLengthParameterize(points);

        var _generateAndReport = generateAndReport(points, u, u, leftTangent, rightTangent, progressCallback);

        bezCurve = _generateAndReport[0];
        maxError = _generateAndReport[1];
        splitPoint = _generateAndReport[2];


        if (maxError < error) {
            return [bezCurve];
        }
        //If error not too large, try some reparameterization and iteration
        if (maxError < error * error) {

            uPrime = u;
            prevErr = maxError;
            prevSplit = splitPoint;

            for (i = 0; i < MaxIterations; i++) {

                uPrime = reparameterize(bezCurve, points, uPrime);

                var _generateAndReport2 = generateAndReport(points, u, uPrime, leftTangent, rightTangent, progressCallback);

                bezCurve = _generateAndReport2[0];
                maxError = _generateAndReport2[1];
                splitPoint = _generateAndReport2[2];


                if (maxError < error) {
                    return [bezCurve];
                }
                //If the development of the fitted curve grinds to a halt,
                //we abort this attempt (and try a shorter curve):
                else if (splitPoint === prevSplit) {
                        var errChange = maxError / prevErr;
                        if (errChange > .9999 && errChange < 1.0001) {
                            break;
                        }
                    }

                prevErr = maxError;
                prevSplit = splitPoint;
            }
        }

        //Fitting failed -- split at max error point and fit recursively
        beziers = [];

        //To create a smooth transition from one curve segment to the next,
        //we calculate the tangent of the points directly before and after the center,
        //and use that same tangent both to and from the center point.
        centerVector = maths.subtract(points[splitPoint - 1], points[splitPoint + 1]);
        //However, should those two points be equal, the normal tangent calculation will fail.
        //Instead, we calculate the tangent from that "double-point" to the center point, and rotate 90deg.
        if (centerVector[0] === 0 && centerVector[1] === 0) {
            //toCenterTangent = createTangent(points[splitPoint - 1], points[splitPoint]);
            //fromCenterTangent = createTangent(points[splitPoint + 1], points[splitPoint]);

            //[x,y] -> [-y,x]: http://stackoverflow.com/a/4780141/1869660
            centerVector = maths.subtract(points[splitPoint - 1], points[splitPoint]).reverse();
            centerVector[0] = -centerVector[0];
        }
        toCenterTangent = maths.normalize(centerVector);
        //To and from need to point in opposite directions:
        fromCenterTangent = maths.mulItems(toCenterTangent, -1);

        /*
        Note: An alternative to this "divide and conquer" recursion could be to always
              let new curve segments start by trying to go all the way to the end,
              instead of only to the end of the current subdivided polyline.
              That might let many segments fit a few points more, reducing the number of total segments.
                However, a few tests have shown that the segment reduction is insignificant
              (240 pts, 100 err: 25 curves vs 27 curves. 140 pts, 100 err: 17 curves on both),
              and the results take twice as many steps and milliseconds to finish,
              without looking any better than what we already have.
        */
        beziers = beziers.concat(fitCubic(points.slice(0, splitPoint + 1), leftTangent, toCenterTangent, error, progressCallback));
        beziers = beziers.concat(fitCubic(points.slice(splitPoint), fromCenterTangent, rightTangent, error, progressCallback));
        return beziers;
    }
    function generateAndReport(points, paramsOrig, paramsPrime, leftTangent, rightTangent, progressCallback) {
        var bezCurve, maxError, splitPoint;

        bezCurve = generateBezier(points, paramsPrime, leftTangent, rightTangent);
        //Find max deviation of points to fitted curve.
        //Here we always use the original parameters (from chordLengthParameterize()),
        //because we need to compare the current curve to the actual source polyline,
        //and not the currently iterated parameters which reparameterize() & generateBezier() use,
        //as those have probably drifted far away and may no longer be in ascending order.

        var _computeMaxError = computeMaxError(points, bezCurve, paramsOrig);

        maxError = _computeMaxError[0];
        splitPoint = _computeMaxError[1];


        if (progressCallback) {
            progressCallback({
                bez: bezCurve,
                points: points,
                params: paramsOrig,
                maxErr: maxError,
                maxPoint: splitPoint
            });
        }

        return [bezCurve, maxError, splitPoint];
    }

    /**
     * Use least-squares method to find Bezier control points for region.
     *
     * @param {Array<Array<Number>>} points - Array of digitized points
     * @param {Array<Number>} parameters - Parameter values for region
     * @param {Array<Number>} leftTangent - Unit tangent vector at start point
     * @param {Array<Number>} rightTangent - Unit tangent vector at end point
     * @returns {Array<Array<Number>>} Approximated Bezier curve: [first-point, control-point-1, control-point-2, second-point] where points are [x, y]
     */
    function generateBezier(points, parameters, leftTangent, rightTangent) {
        var bezCurve,
            //Bezier curve ctl pts
        A,
            a,
            //Precomputed rhs for eqn
        C,
            X,
            //Matrices C & X
        det_C0_C1,
            det_C0_X,
            det_X_C1,
            //Determinants of matrices
        alpha_l,
            alpha_r,
            //Alpha values, left and right

        epsilon,
            segLength,
            i,
            len,
            tmp,
            u,
            ux,
            firstPoint = points[0],
            lastPoint = points[points.length - 1];

        bezCurve = [firstPoint, null, null, lastPoint];
        //console.log('gb', parameters.length);

        //Compute the A's
        A = maths.zeros_Xx2x2(parameters.length);
        for (i = 0, len = parameters.length; i < len; i++) {
            u = parameters[i];
            ux = 1 - u;
            a = A[i];

            a[0] = maths.mulItems(leftTangent, 3 * u * (ux * ux));
            a[1] = maths.mulItems(rightTangent, 3 * ux * (u * u));
        }

        //Create the C and X matrices
        C = [[0, 0], [0, 0]];
        X = [0, 0];
        for (i = 0, len = points.length; i < len; i++) {
            u = parameters[i];
            a = A[i];

            C[0][0] += maths.dot(a[0], a[0]);
            C[0][1] += maths.dot(a[0], a[1]);
            C[1][0] += maths.dot(a[0], a[1]);
            C[1][1] += maths.dot(a[1], a[1]);

            tmp = maths.subtract(points[i], bezier.q([firstPoint, firstPoint, lastPoint, lastPoint], u));

            X[0] += maths.dot(a[0], tmp);
            X[1] += maths.dot(a[1], tmp);
        }

        //Compute the determinants of C and X
        det_C0_C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1];
        det_C0_X = C[0][0] * X[1] - C[1][0] * X[0];
        det_X_C1 = X[0] * C[1][1] - X[1] * C[0][1];

        //Finally, derive alpha values
        alpha_l = det_C0_C1 === 0 ? 0 : det_X_C1 / det_C0_C1;
        alpha_r = det_C0_C1 === 0 ? 0 : det_C0_X / det_C0_C1;

        //If alpha negative, use the Wu/Barsky heuristic (see text).
        //If alpha is 0, you get coincident control points that lead to
        //divide by zero in any subsequent NewtonRaphsonRootFind() call.
        segLength = maths.vectorLen(maths.subtract(firstPoint, lastPoint));
        epsilon = 1.0e-6 * segLength;
        if (alpha_l < epsilon || alpha_r < epsilon) {
            //Fall back on standard (probably inaccurate) formula, and subdivide further if needed.
            bezCurve[1] = maths.addArrays(firstPoint, maths.mulItems(leftTangent, segLength / 3.0));
            bezCurve[2] = maths.addArrays(lastPoint, maths.mulItems(rightTangent, segLength / 3.0));
        } else {
            //First and last control points of the Bezier curve are
            //positioned exactly at the first and last data points
            //Control points 1 and 2 are positioned an alpha distance out
            //on the tangent vectors, left and right, respectively
            bezCurve[1] = maths.addArrays(firstPoint, maths.mulItems(leftTangent, alpha_l));
            bezCurve[2] = maths.addArrays(lastPoint, maths.mulItems(rightTangent, alpha_r));
        }

        return bezCurve;
    }
    /**
     * Given set of points and their parameterization, try to find a better parameterization.
     *
     * @param {Array<Array<Number>>} bezier - Current fitted curve
     * @param {Array<Array<Number>>} points - Array of digitized points
     * @param {Array<Number>} parameters - Current parameter values
     * @returns {Array<Number>} New parameter values
     */
    function reparameterize(bezier, points, parameters) {
        /*
        var j, len, point, results, u;
        results = [];
        for (j = 0, len = points.length; j < len; j++) {
            point = points[j], u = parameters[j];
              results.push(newtonRaphsonRootFind(bezier, point, u));
        }
        return results;
        //*/
        return parameters.map(function (p, i) {
            return newtonRaphsonRootFind(bezier, points[i], p);
        });
    }
    /**
     * Use Newton-Raphson iteration to find better root.
     *
     * @param {Array<Array<Number>>} bez - Current fitted curve
     * @param {Array<Number>} point - Digitized point
     * @param {Number} u - Parameter value for "P"
     * @returns {Number} New u
     */
    function newtonRaphsonRootFind(bez, point, u) {
        /*
            Newton's root finding algorithm calculates f(x)=0 by reiterating
            x_n+1 = x_n - f(x_n)/f'(x_n)
            We are trying to find curve parameter u for some point p that minimizes
            the distance from that point to the curve. Distance point to curve is d=q(u)-p.
            At minimum distance the point is perpendicular to the curve.
            We are solving
            f = q(u)-p * q'(u) = 0
            with
            f' = q'(u) * q'(u) + q(u)-p * q''(u)
            gives
            u_n+1 = u_n - |q(u_n)-p * q'(u_n)| / |q'(u_n)**2 + q(u_n)-p * q''(u_n)|
        */

        var d = maths.subtract(bezier.q(bez, u), point),
            qprime = bezier.qprime(bez, u),
            numerator = /*sum(*/maths.mulMatrix(d, qprime) /*)*/
        ,
            denominator = maths.sum(maths.addItems(maths.squareItems(qprime), maths.mulMatrix(d, bezier.qprimeprime(bez, u))));

        if (denominator === 0) {
            return u;
        } else {
            return u - numerator / denominator;
        }
    }
    /**
     * Assign parameter values to digitized points using relative distances between points.
     *
     * @param {Array<Array<Number>>} points - Array of digitized points
     * @returns {Array<Number>} Parameter values
     */
    function chordLengthParameterize(points) {
        var u = [],
            currU,
            prevU,
            prevP;

        points.forEach(function (p, i) {
            currU = i ? prevU + maths.vectorLen(maths.subtract(p, prevP)) : 0;
            u.push(currU);

            prevU = currU;
            prevP = p;
        });
        u = u.map(function (x) {
            return x / prevU;
        });

        return u;
    }
    /**
     * Find the maximum squared distance of digitized points to fitted curve.
     *
     * @param {Array<Array<Number>>} points - Array of digitized points
     * @param {Array<Array<Number>>} bez - Fitted curve
     * @param {Array<Number>} parameters - Parameterization of points
     * @returns {Array<Number>} Maximum error (squared) and point of max error
     */
    function computeMaxError(points, bez, parameters) {
        var dist, //Current error
        maxDist, //Maximum error
        splitPoint, //Point of maximum error
        v, //Vector from point to curve
        i, count, point, t;

        maxDist = 0;
        splitPoint = points.length / 2;

        var t_distMap = mapTtoRelativeDistances(bez, 10);

        for (i = 0, count = points.length; i < count; i++) {
            point = points[i];
            //Find 't' for a point on the bez curve that's as close to 'point' as possible:
            t = find_t(bez, parameters[i], t_distMap, 10);

            v = maths.subtract(bezier.q(bez, t), point);
            dist = v[0] * v[0] + v[1] * v[1];

            if (dist > maxDist) {
                maxDist = dist;
                splitPoint = i;
            }
        }

        return [maxDist, splitPoint];
    }
    //Sample 't's and map them to relative distances along the curve:
    var mapTtoRelativeDistances = function mapTtoRelativeDistances(bez, B_parts) {
        var B_t_curr;
        var B_t_dist = [0];
        var B_t_prev = bez[0];
        var sumLen = 0;

        for (var i = 1; i <= B_parts; i++) {
            B_t_curr = bezier.q(bez, i / B_parts);

            sumLen += maths.vectorLen(maths.subtract(B_t_curr, B_t_prev));

            B_t_dist.push(sumLen);
            B_t_prev = B_t_curr;
        }

        //Normalize B_length to the same interval as the parameter distances; 0 to 1:
        B_t_dist = B_t_dist.map(function (x) {
            return x / sumLen;
        });
        return B_t_dist;
    };

    function find_t(bez, param, t_distMap, B_parts) {
        if (param < 0) {
            return 0;
        }
        if (param > 1) {
            return 1;
        }

        /*
            'param' is a value between 0 and 1 telling us the relative position
            of a point on the source polyline (linearly from the start (0) to the end (1)).
            To see if a given curve - 'bez' - is a close approximation of the polyline,
            we compare such a poly-point to the point on the curve that's the same
            relative distance along the curve's length.
              But finding that curve-point takes a little work:
            There is a function "B(t)" to find points along a curve from the parametric parameter 't'
            (also relative from 0 to 1: http://stackoverflow.com/a/32841764/1869660
                                        http://pomax.github.io/bezierinfo/#explanation),
            but 't' isn't linear by length (http://gamedev.stackexchange.com/questions/105230).
              So, we sample some points along the curve using a handful of values for 't'.
            Then, we calculate the length between those samples via plain euclidean distance;
            B(t) concentrates the points around sharp turns, so this should give us a good-enough outline of the curve.
            Thus, for a given relative distance ('param'), we can now find an upper and lower value
            for the corresponding 't' by searching through those sampled distances.
            Finally, we just use linear interpolation to find a better value for the exact 't'.
              More info:
                http://gamedev.stackexchange.com/questions/105230/points-evenly-spaced-along-a-bezier-curve
                http://stackoverflow.com/questions/29438398/cheap-way-of-calculating-cubic-bezier-length
                http://steve.hollasch.net/cgindex/curves/cbezarclen.html
                https://github.com/retuxx/tinyspline
        */
        var lenMax, lenMin, tMax, tMin, t;

        //Find the two t-s that the current param distance lies between,
        //and then interpolate a somewhat accurate value for the exact t:
        for (var i = 1; i <= B_parts; i++) {

            if (param <= t_distMap[i]) {
                tMin = (i - 1) / B_parts;
                tMax = i / B_parts;
                lenMin = t_distMap[i - 1];
                lenMax = t_distMap[i];

                t = (param - lenMin) / (lenMax - lenMin) * (tMax - tMin) + tMin;
                break;
            }
        }
        return t;
    }

    /**
     * Creates a vector of length 1 which shows the direction from B to A
     */
    function createTangent(pointA, pointB) {
        return maths.normalize(maths.subtract(pointA, pointB));
    }

    /*
        Simplified versions of what we need from math.js
        Optimized for our input, which is only numbers and 1x2 arrays (i.e. [x, y] coordinates).
    */

    var maths = function () {
        function maths() {
            _classCallCheck(this, maths);
        }

        maths.zeros_Xx2x2 = function zeros_Xx2x2(x) {
            var zs = [];
            while (x--) {
                zs.push([0, 0]);
            }
            return zs;
        };

        maths.mulItems = function mulItems(items, multiplier) {
            //return items.map(x => x*multiplier);
            return [items[0] * multiplier, items[1] * multiplier];
        };

        maths.mulMatrix = function mulMatrix(m1, m2) {
            //https://en.wikipedia.org/wiki/Matrix_multiplication#Matrix_product_.28two_matrices.29
            //Simplified to only handle 1-dimensional matrices (i.e. arrays) of equal length:
            //  return m1.reduce((sum,x1,i) => sum + (x1*m2[i]),
            //                   0);
            return m1[0] * m2[0] + m1[1] * m2[1];
        };

        maths.subtract = function subtract(arr1, arr2) {
            //return arr1.map((x1, i) => x1 - arr2[i]);
            return [arr1[0] - arr2[0], arr1[1] - arr2[1]];
        };

        maths.addArrays = function addArrays(arr1, arr2) {
            //return arr1.map((x1, i) => x1 + arr2[i]);
            return [arr1[0] + arr2[0], arr1[1] + arr2[1]];
        };

        maths.addItems = function addItems(items, addition) {
            //return items.map(x => x+addition);
            return [items[0] + addition, items[1] + addition];
        };

        maths.sum = function sum(items) {
            return items.reduce(function (sum, x) {
                return sum + x;
            });
        };

        maths.dot = function dot(m1, m2) {
            return maths.mulMatrix(m1, m2);
        };

        maths.vectorLen = function vectorLen(v) {
            var a = v[0],
                b = v[1];
            return Math.sqrt(a * a + b * b);
        };

        maths.divItems = function divItems(items, divisor) {
            //return items.map(x => x/divisor);
            return [items[0] / divisor, items[1] / divisor];
        };

        maths.squareItems = function squareItems(items) {
            //return items.map(x => x*x);
            var a = items[0],
                b = items[1];
            return [a * a, b * b];
        };

        maths.normalize = function normalize(v) {
            return this.divItems(v, this.vectorLen(v));
        };

        return maths;
    }();

    var bezier = function () {
        function bezier() {
            _classCallCheck(this, bezier);
        }

        bezier.q = function q(ctrlPoly, t) {
            var tx = 1.0 - t;
            var pA = maths.mulItems(ctrlPoly[0], tx * tx * tx),
                pB = maths.mulItems(ctrlPoly[1], 3 * tx * tx * t),
                pC = maths.mulItems(ctrlPoly[2], 3 * tx * t * t),
                pD = maths.mulItems(ctrlPoly[3], t * t * t);
            return maths.addArrays(maths.addArrays(pA, pB), maths.addArrays(pC, pD));
        };

        bezier.qprime = function qprime(ctrlPoly, t) {
            var tx = 1.0 - t;
            var pA = maths.mulItems(maths.subtract(ctrlPoly[1], ctrlPoly[0]), 3 * tx * tx),
                pB = maths.mulItems(maths.subtract(ctrlPoly[2], ctrlPoly[1]), 6 * tx * t),
                pC = maths.mulItems(maths.subtract(ctrlPoly[3], ctrlPoly[2]), 3 * t * t);
            return maths.addArrays(maths.addArrays(pA, pB), pC);
        };

        bezier.qprimeprime = function qprimeprime(ctrlPoly, t) {
            return maths.addArrays(maths.mulItems(maths.addArrays(maths.subtract(ctrlPoly[2], maths.mulItems(ctrlPoly[1], 2)), ctrlPoly[0]), 6 * (1.0 - t)), maths.mulItems(maths.addArrays(maths.subtract(ctrlPoly[3], maths.mulItems(ctrlPoly[2], 2)), ctrlPoly[1]), 6 * t));
        };

        return bezier;
    }();

    module.exports = fitCurve;
});
});

/**
 * Calculate points for smooth bezier curves passing through a series of points
 * uses https://github.com/soswow/fit-curve/blob/master/src/fit-curve.js
 * uses ShapePoints.curveError=50 for error value
 * @module shape-points/bezierCurveThrough
 * @param {(number|number[])} x1 - starting point or array of points [x1, y1, x2, y2, ... xn, yn]
 * @param {number} [y1]
 * @param {number} [x2]
 * @param {number} [y2]
 * @param {number} [xn] - ending point
 * @param {number} [yn]
 * @param {object} [options]
 * @param {number} [options.pointsInArc=5]
 * @param {number} [options.curveError=50]
 * @returns {number[]} [x1, y1, x2, y2, ... xn, yn]
 */
function bezierCurveThrough()
{
    let pointsInArc = 5, curveError = 50;
    const points = [];
    if (Array.isArray(arguments[0]))
    {
        const array = arguments[0];
        for (let i = 0; i < array.length; i += 2)
        {
            points.push([array[i], array[i + 1]]);
        }
        if (arguments.length === 2)
        {
            pointsInArc = arguments[1].pointsInArc;
            curveError = arguments[1].curveError;
        }
    }
    else
    {
        let length = arguments.length;
        if (arguments.length % 2 === 1)
        {
            length--;
            pointsInArc = arguments[length].pointsInArc;
            curveError = arguments[length].curveError;
        }
        for (let i = 0; i < length; i += 2)
        {
            points.push([arguments[i], arguments[i + 1]]);
        }
    }

    // two points creates a line
    if (points.length === 2)
    {
        return [points[0][0], points[0][1], points[1][0], points[1][1]]
    }

    // not enough points
    if (points.length < 4)
    {
        return []
    }

    const results = [];
    const curves = fitCurve(points, curveError);
    for (let i = 0; i < curves.length; i++)
    {
        const c = curves[i];
        results.push(...bezierCurveTo(c[0][0], c[0][1], c[1][0], c[1][1], c[2][0], c[2][1], c[3][0], c[3][1], pointsInArc));
    }
    return results
}

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
function quadraticCurveTo(x1, y1, cp1x, cp1y, x2, y2, pointsInArc)
{
    pointsInArc = pointsInArc || 5;
    const points = [];
    const interval = 1 / pointsInArc;
    for (let t = 0; t <= 1; t += interval)
    {
        const B0_t = Math.pow(1 - t, 2),
            B1_t = 2 * t * (1 - t),
            B2_t = Math.pow(t, 2);

        points.push(
            (B0_t * x1) + (B1_t * cp1x) + (B2_t * x2),
            (B0_t * y1) + (B1_t * cp1y) + (B2_t * y2)
        );
    }
    return points
}

export { arc, bezierCurveThrough, bezierCurveTo, circle, ellipse, line, quadraticCurveTo, rect, roundedRect };
//# sourceMappingURL=shape-points.es.js.map