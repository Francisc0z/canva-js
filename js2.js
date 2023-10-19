let canvas2 = document.getElementById("canva2");
let ctx = canvas2.getContext("2d");
let snakeHeadW = 10;
let snakeHeadH = 10;
let snakeX = (canvas2.width-snakeHeadW)/2;
let snakeY = (canvas2.height-snakeHeadH)/2;

let bodyX = (canvas2.width-snakeHeadW)/2;;
let bodyY = (canvas2.height-snakeHeadH)/2;;

let x = canvas2.width/2;
let y = canvas2.height-30;
let dx = 0;
let dy = 0;
let rightPressed = false;
let leftPressed = false;
let topPressed = false;
let bottomPressed = false;
let deadAvaible = false;
let score = 0;
function drawSnake() {
    ctx.beginPath();
    ctx.rect(snakeX, snakeY, snakeHeadW, snakeHeadH);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
bodyParts = [
    {
        bodyX: bodyX,
        bodyY: bodyY
    },
    {
        bodyX: bodyX,
        bodyY: bodyY
    },
]
function drawBody() {
    for (let index = 0; index < bodyParts.length; index++) {
        ctx.beginPath();
        ctx.rect(bodyParts[index].bodyX, bodyParts[index].bodyY, snakeHeadW, snakeHeadH);
        ctx.fillStyle = "green";
        if (index == bodyParts.length - 1) {
            ctx.fillStyle = "#FF6961";
        }
        ctx.fill();
        ctx.closePath();
    }
}

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
        topPressed = false;
        bottomPressed = false;
        leftPressed  = false;
    }
    else if(e.keyCode == 38) {
        topPressed = true;
        rightPressed = false;
        bottomPressed = false;
        leftPressed  = false;
    }
    else if(e.keyCode == 40) {
        bottomPressed = true;
        rightPressed = false;
        topPressed = false;
        leftPressed  = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
        rightPressed = false;
        topPressed = false;
        bottomPressed  = false;
    }
}

function movementSnake(){
    let prevX = snakeX;
    let prevY = snakeY;

    if (rightPressed) {
        snakeX += snakeHeadW;
        deadAvaible = true

    } else if (leftPressed) {
        deadAvaible = true

        snakeX -= snakeHeadW;
    } else if (topPressed) {
        deadAvaible = true

        snakeY -= snakeHeadH;
    } else if (bottomPressed) {
        deadAvaible = true

        snakeY += snakeHeadH;
    }
    for (let i = 0; i < bodyParts.length; i++) {
        const tempX = bodyParts[i].bodyX;
        const tempY = bodyParts[i].bodyY;
        bodyParts[i].bodyX = prevX;
        bodyParts[i].bodyY = prevY;
        prevX = tempX;
        prevY = tempY;
    }

};

let random_pointX = Math.floor((Math.random() * canvas2.width) + 1);
let random_pointY = Math.floor((Math.random() * canvas2.height) + 1);

function drawFood(random_pointX, random_pointY) {
    ctx.beginPath();
    ctx.rect(random_pointX, random_pointY , snakeHeadW -2, snakeHeadH -3);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
} 
function drawGameOver() {
    ctx.font = "40px Arial";
    ctx.fillStyle = "#FF6961";
    ctx.fillText("GAME OVER!", canvas2.width / 4, canvas2.height / 1.8);
}
function collisionDetection() {
    if(snakeX > random_pointX &&
        snakeX < random_pointX + snakeHeadW &&
        snakeY > random_pointY &&
        snakeY < random_pointY + snakeHeadH){
        random_pointX = Math.floor((Math.random() * canvas2.width) + 1);
        random_pointY = Math.floor((Math.random() * canvas2.height) + 1);
        score++;
        let previusStartPosition = bodyParts[bodyParts.length - 1]; 
        bodyParts.push({
            bodyX: previusStartPosition.bodyX,
            bodyY: previusStartPosition.bodyY
        });
    }
    if (deadAvaible && snakeX == bodyParts[bodyParts.length - 1].bodyX && snakeY == bodyParts[bodyParts.length - 1].bodyY ) {
        drawGameOver();
        alert("Game over");
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}


function draw() {
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    drawSnake();
    movementSnake();
    collisionDetection();
    drawFood(random_pointX, random_pointY);
    drawBody();
    drawScore();
}

setInterval(draw, 100);