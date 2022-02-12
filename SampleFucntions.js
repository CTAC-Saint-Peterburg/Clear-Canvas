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
    // console.log(dist);
    if(dist > 3) { //Bug можно найти точку которая обойдёт проверку
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