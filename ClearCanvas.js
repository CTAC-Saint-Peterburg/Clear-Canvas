//-Создаём Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvasSize(1000, 1000);
const objectsRendering = new Array();
let sampleCycle = objectsRendering.push(new Cycle(500, 500, 110, 'tomato', 'click somewhere on screen', Infinity));
let boxSample = new Box(200, 200, 200, 0, 'tomato', 'Hello, click on me!', Infinity);
//-Камера центрирована и двигается в сторону клика, а также измеряется дистанция между заданными обьектами
let cameraObject;
let cameraX = 0;
let cameraY = 0;
let clientX;
let clientY;
let movementAngle;
let angleX = 0;
let angleY = 0;
canvas.addEventListener('click', (event) => {
    clientY = event.clientY;
    clientX = event.clientX;
    console.log(event);
    movementAngle = Math.atan2(clientY - canvas.height / 2, clientX - canvas.height / 2);
    angleX = Math.cos(movementAngle);
    angleY = Math.sin(movementAngle);
    let clickObject = new Cycle(event.clientX +cameraX, event.clientY +cameraY, 20, 'white', 'click', Infinity);
    objectsRendering.push(clickObject);
    console.log(angleX);
});
function camera() {
    let dist = Math.hypot(cameraObject.x - objectsRendering[objectsRendering.length-1].x, cameraObject.y - objectsRendering[objectsRendering.length-1].y);
    if(dist >=1) {
    cameraX += angleX;
    cameraY += angleY;
    }
    ctx.translate(-cameraX, -cameraY);
}
//-Функция отрисовки всех элементов
function drawAll() {
    clearCanvas();
    background('black');
     cameraObject = new Cycle(500 +cameraX, 500 +cameraY, 100, 'gold', 'Hi, I am camera!', Infinity);
    camera();
    render(cameraObject);
    render(objectsRendering);
    lifeCycle(cameraObject);
//-Специальная функция для зацикливания requestAnimationFrame
    requestAnimationFrame(drawAll);
};
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
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
window.onload = drawAll();