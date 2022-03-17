//-Функция управления размерами Canvas
function canvasSize(width, height) {
    canvas.width = width;
    canvas.height = height;
};
//-Функция очистки Canvas
function clearCanvas() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
};
//-Фукция управления цвета фона Canvas
function background(color) {
    ctx.beginPath();
    ctx.resetTransform();
    ctx.fillStyle = color;
    ctx.fillRect (0, 0, canvas.width, canvas.height);
    ctx.closePath();
};
//-Функция движения камеры
function camera(target) {
    if(target == undefined) return;
    let dist = Math.hypot(player.x - target.x, player.y - target.y);
    // console.log(dist); //проблема
    if (dist > 3) {
        cameraX += angleX * lerpActive;
        cameraY += angleY * lerpActive;
        player.x += angleX * lerpActive;
        player.y += angleY * lerpActive;
        controlUI.x += angleX * lerpActive;
        controlUI.y += angleY * lerpActive;
        }
        if(keyBoardBtn.w == true) {
            keyBoardBtn.reloadW += 1;
            lerpActive = 3;
            if(keyBoardBtn.reloadW >= 100) {
                lerpActive = 1;
                keyBoardBtn.reloadW = 0;
                keyBoardBtn.w = false;
            }
        }
}
//-Функция отривоки массива или обьекта с встроенной функцией draw()
function render(data) {
if (Array.isArray(data)) {
for(let i = 0; i < data.length; i++) {
    data[i].draw();
}
} else {
    data.draw();
}
};
//-Функция фильтрации массива по параметру жизненного цикла объекта
function lifeCycle(data) {
    if (Array.isArray(data)) {
    for(let i = data.length - 1; i >= 0; i--) {
        if(data[i].lifeCycle <= 0) {
        data.splice(i, 1);
    }
    }
} else if (data.lifeCycle <= 0) {
    data.draw = () => {};
}
};
function crash(ObjectOne, ObjectTwo, eventfunction) {
    let dist = Math.hypot(ObjectOne.x - ObjectTwo.x, ObjectOne.y - ObjectTwo.y);
    // console.log(dist);
    if (dist < ObjectOne.size + ObjectTwo.size) { eventfunction() };
};
function evade(ObjectOne, ObjectTwo, eventfunction) {
    let dist = Math.hypot(ObjectOne.x - ObjectTwo.x, ObjectOne.y - ObjectTwo.y);
    // console.log(dist);
    if (dist > ObjectOne.size + ObjectTwo.size) { eventfunction() };
};
function update() { 
    if(keyBoardBtn.q == false) {
    tridentCollisionModel.x = trident.x + angleX * 300;
    tridentCollisionModel.y = trident.y + angleY * 300;
    } else if (keyBoardBtn.q == true) {
        tridentCollisionModel.x += qangle.x * 3;
        tridentCollisionModel.y += qangle.y * 3;
    }
};
function hit() {
    enemy.lifeCycle = 0;
    gameOver();
};
//-needFix
let outCountdown = 100;
//---
function outOfMap() {
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.rect(0 +cameraX, 0 +cameraY, innerWidth, innerHeight);
        ctx.fillStyle = 'rgba(255, 99, 71, 0.5)';
        ctx.fill();
        ctx.fillStyle = 'orange';
        ctx.font = "40px Arial";
        ctx.textAlign = 'center';
        ctx.fillText("Return to the battlefield", innerWidth / 2 +cameraX, innerHeight / 3 +cameraY);
        ctx.fillStyle = 'white';
        ctx.font = "30px Arial";
        ctx.textAlign = 'center';
        ctx.fillText(outCountdown, innerWidth / 2 +cameraX, innerHeight / 2 +cameraY);
        ctx.closePath();
        outCountdown--;
        if (outCountdown < 0) {
            gameOver();
        }
};
let test;
function multiplayer() {
test = {
    x: 'hello',
    p: localId,
};
socket.on('kk', (kok)=> {
    if (kok.p == 1) {
    alert(kok.x);
    } else if (kok.p == 2) {
        alert('hurray');
    }
});
socket.emit('kk', test);
};
function gameSetup() {
    console.log("Загрузка и настройка завершина...");
    socket.on('listenServerSetup', setup);
};
function setup(playerSetup) {
    localId = playerSetup.localId;
    console.log('подключён к серверу:' + playerSetup.currentRoom);
    if (playerSetup.Pcords == 0) {
        cameraY = 700 - innerHeight / 2;
        player.y = innerHeight / 2 +cameraY;
    } else if (playerSetup.Pcords == 1) {
        cameraY = -700 - innerHeight / 2;
        player.y = innerHeight / 2 +cameraY;
        controlUI.y = -400;
    }
    socket.emit('listenServerSetup');
};