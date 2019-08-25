'use strict';

var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');


//load images;
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
// audio files
var fly = new Audio();
var scor = new Audio();

fly.src = 'sounds/fly.mp3';
scor.src = 'sounds/score.mp3';
fly.volume = 0.2;
scor.volume = 0.2;
bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
fg.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth.png';


// some variables
var gap = 75;
var constant = pipeNorth.height + gap;
var bX = 20;
var bY = 150;
var score = 0;
var gravity = 1.2;
// onkey down
document.addEventListener('click', moveUp);

function moveUp() {
    bY -= 25;
    fly.play();
}

//pipe coordinates

var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

//draw images
function draw() {
    console.log(fly);
    console.log('dibujando');
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        pipe[i].x--;

        if (pipe[i].x === 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        //    detect collision
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width &&
            (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant || bY + bird.height >= cvs.height - fg.height)) {
            location.reload();
        }

        if (pipe[i].x === 5) {
            score++;
            scor.play();
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, bX, bY);

    bY += gravity;
    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText('Puntuación: ' + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}

draw();