//-Создаём Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvasSize(innerWidth, innerHeight);
const objectsRendering = new Array();
let mapCycle = objectsRendering.push(new Mapcycle(1000,'#2f242c', Infinity)); //- 2f242c
//-Камера центрирована и двигается в сторону клика, а также измеряется дистанция между заданными обьектами
let cameraX = 0 - innerWidth / 2;
let cameraY = 700 - innerHeight / 2;
let clientX;
let clientY;
let movementAngle;
let angleX = 0;
let angleY = 0;
let player = new PlayerClass(innerWidth / 2 +cameraX, innerHeight / 2 +cameraY, 120, skinOptions.selectedColor, playerNickName, Infinity);
let enemy = new PlayerClass(0, -700, 120, 'green', 'enemy', Infinity);
//-
let qangle = {x: 0, y: 0};
let clickTarget;
let tridentAngle;
let keyBoardBtn = {q: false, w: false, reloadQ: 0, reloadW: 0};
let tridentMove = {x: 0, y: 0};
let trident = {x: 0, y: 0};
let tridentPlayer = new Trident(player.x,player.y,0);
let lerpActive = 1;
let tridentCollisionModel = new PlayerClass(tridentPlayer.x, tridentPlayer.y, 45, 'white', 'collision', Infinity);
//-
canvas.addEventListener('click', (event) => {
    clientY = event.clientY;
    clientX = event.clientX;
    console.log(event);
    movementAngle = Math.atan2(clientY - innerHeight / 2, clientX - innerWidth / 2);
    tridentAngle = Math.floor(Math.atan2(clientY - innerHeight / 2, clientX - innerWidth / 2) *100) /100;
    if( keyBoardBtn.q == false) {
        tridentPlayer.rotate = tridentAngle;
    };
    
    angleX = Math.floor(Math.cos(movementAngle) * 100) / 100;
    angleY = Math.floor(Math.sin(movementAngle) * 100) / 100;
    clickTarget = new PlayerClass(clientX +cameraX, clientY +cameraY, 20, 'white', 'click', Infinity);
    console.log(tridentAngle);
});
//-Функция отслеживания нажатия кнопки Q и W
window.addEventListener('keyup', (event) => {
    if (keyBoardBtn.q == false) {
    if (event.code == 'KeyQ') {
        qangle.x = angleX;
        qangle.y = angleY;
        keyBoardBtn.q = true;
        console.log('Q');
    };
};
if (keyBoardBtn.w == false) {
    if (event.code == 'KeyW') {
        keyBoardBtn.w = true;
        console.log('W');
    };
};
});
//-Функция отрисовки всех элементов
function drawAll() {
    clearCanvas();
    background('black');
    ctx.translate(-cameraX, -cameraY);
    camera(clickTarget); //-
    render(objectsRendering);
    render(player);
    render(tridentPlayer);
    render(enemy);
    // render(tridentCollisionModel); визуализациия коллизии
    update();
    crash(tridentCollisionModel,enemy, hit);
//-Специальная функция для зацикливания requestAnimationFrame
    requestAnimationFrame(drawAll);
};
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
window.onload = drawAll();