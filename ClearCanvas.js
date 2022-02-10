//-Создаём Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvasSize(innerWidth, innerHeight);
const objectsRendering = new Array();
let mapCycle = objectsRendering.push(new Mapcycle(1000,'#2f242c', Infinity)); //- 2f242c
let sampleCycle = objectsRendering.push(new Cycle(0, -700, 120, 'tomato', 'enemy', Infinity));
let boxSample = new Box(200, 200, 200, 0, 'tomato', 'Hello, click on me!', Infinity);
let trident = objectsRendering.push(new Trident(0,0,0));
//-Камера центрирована и двигается в сторону клика, а также измеряется дистанция между заданными обьектами
let cameraObject;
let cameraX = 0 - innerWidth / 2;
let cameraY = 700 - innerHeight / 2;
let clientX;
let clientY;
let movementAngle;
let angleX = 0;
let angleY = 0;
let clickTarget;
let tridentAngle;
let keyBoardBtn = {q: false, w: false, reloadQ: 0, reloadW: 0};
let tridentMove = {x: 0, y: 0};
canvas.addEventListener('click', (event) => {
    clientY = event.clientY;
    clientX = event.clientX;
    console.log(event);
    movementAngle = Math.atan2(clientY - innerHeight / 2, clientX - innerWidth / 2);
    tridentAngle = Math.floor(Math.atan2(clientY - innerHeight / 2, clientX - innerWidth / 2) *100) /100;
    angleX = Math.floor(Math.cos(movementAngle) * 100) / 100;
    angleY = Math.floor(Math.sin(movementAngle) * 100) / 100;
    clickTarget = new Cycle(clientX +cameraX, clientY +cameraY, 20, 'white', 'click', Infinity);
    console.log(tridentAngle);
});
//-Функция отслеживания нажатия кнопки Q и W
window.addEventListener('keyup', (event) => {
    if (event.code == 'KeyQ') {
        keyBoardBtn.q = true;
        console.log('Q');
    };
    if (event.code == 'KeyW') {
        keyBoardBtn.w = true;
        console.log('W');
    };
});
//-Функция отрисовки всех элементов
function drawAll() {
    clearCanvas();
    background('black');
    ctx.translate(-cameraX, -cameraY);
     cameraObject = new Cycle(innerWidth / 2 +cameraX, innerHeight / 2 +cameraY, 120, 'gold', 'Hi, I am camera!', Infinity);
     objectsRendering[2].rotate = tridentAngle;
    camera(clickTarget); //-
    render(objectsRendering);
    render(cameraObject);
    lifeCycle(cameraObject);
//-Специальная функция для зацикливания requestAnimationFrame
    requestAnimationFrame(drawAll);
};
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
window.onload = drawAll();