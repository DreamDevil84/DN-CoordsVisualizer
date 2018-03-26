var infoText = document.getElementById("infoText");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.setAttribute("width", 256);
canvas.setAttribute("height", 256);

var data = [];
var layer = 0;
var running = false;

function getData(path) {
    let request = new XMLHttpRequest();
    request.open("GET", path);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            data = JSON.parse(this.responseText);
            // console.log(data[layer]);
            drawCanvas(data[layer+60]);
        }
    }
}

function drawCanvas(a) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = "#FFFFFF";
    for (let y = 0; y < a.length; y++) {
        // console.log(a[y]);
        ctx.fillRect(a[y][1], a[y][0], 1, 1);
    }
}

function nextLayer() {
    if (layer >= data.length - 1) {
        layer = 0;
    } else {
        layer++;
    }
    drawCanvas(data[layer]);
}

function animateOngoing() {
    nextLayer();
    if (running === true) {
        window.requestAnimationFrame(animateOngoing);
    }
}

function animateControl() {
    running = !running;
    if (running === true) {
        console.log("Starting animation");
        window.requestAnimationFrame(animateOngoing);
    }
}