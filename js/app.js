var canvas;
var ctx;

// How many numbers should be on
// the side of the square once it's done
// making the spiral
var sideSize = 100;
var stepSize;
var posX;
var posY;
var posXLast;
var posYLast;
var posXLastPrime;
var posYLastPrime;
var intervalId;

onload = function () {

    wrapper = document.getElementsByClassName('canvas-wrapper')
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    fitToContainer(canvas);
    posX = Math.round(canvas.width / 2);
    posY = Math.round(canvas.height / 2);
    stepSize = Math.round(canvas.width / sideSize)
    intervalId = setInterval(draw, 0.01);
};

// Maybe this will fix the low definition canvas (unused for now)
function getHiPPIContext(cv, w, h) {
    let ratio = window.devicePixelRatio;
    console.log(ratio)
    cv.width = w * ratio;
    cv.height = h * ratio;
    cv.style.width = w + "px";
    cv.style.height = h + "px";
    return cv.getContext("2d").scale(ratio, ratio);
}

function fitToContainer(canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

function rotateVector(vec, ang) {
    ang = -ang * (Math.PI / 180);
    var cos = Math.cos(ang);
    var sin = Math.sin(ang);
    return new Array(Math.round(10000 * (vec[0] * cos - vec[1] * sin)) / 10000,
        Math.round(10000 * (vec[0] * sin + vec[1] * cos)) / 10000);
}

function isPrime(num) {
    if (num <= 3) return num > 1;
    if ((num % 2 === 0) || (num % 3 === 0)) return false;
    let count = 5;
    while (Math.pow(count, 2) <= num) {
        if (num % count === 0 || num % (count + 2) === 0) return false;
        count += 6;
    }
    return true;
}

var thisManySteps = 1;
var stepTracer = 0;
var stepTracerCounter = 1;
var direction = [1, 0]; // direction vector
var n = 1;

function draw() {

    // Stop condition
    if ((posX + (stepSize / 2) > canvas.width) ||
        (posX - (stepSize / 2) < 0) ||
        (posY + (stepSize / 2) > canvas.height) ||
        (posY - (stepSize / 2) < 0)) {
        clearInterval(intervalId);
        return null;
    }


    // Set line stroke and line width
    // ctx.strokeStyle = 'grey';
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.moveTo(posX + (stepSize / 2), posY + (stepSize / 2));
    // ctx.lineTo(posXLast + (stepSize / 2), posYLast + (stepSize / 2));
    // ctx.stroke();


    ctx.fillStyle = 'yellow';
    ctx.fillRect(posXLast, posYLast, stepSize, stepSize);

    if (isPrime(n)) {
        ctx.fillStyle = 'red';
        ctx.fillRect(posX, posY, stepSize, stepSize);
        // This is a quick hack to make sure that the squares are above the lines
        ctx.fillRect(posXLastPrime, posYLastPrime, stepSize, stepSize);
        posXLastPrime = posX;
        posYLastPrime = posY;
    }

    if (stepTracer == thisManySteps) {
        direction = rotateVector(direction, 90);
        if (stepTracerCounter == 2) {
            stepTracerCounter = 0;
            thisManySteps++;
        }
        stepTracer = 0;
        stepTracerCounter += 1;
    }

    posXLast = posX;
    posYLast = posY;

    posX += direction[0] * stepSize;
    posY += direction[1] * stepSize;
    stepTracer++;
    n++;


};


