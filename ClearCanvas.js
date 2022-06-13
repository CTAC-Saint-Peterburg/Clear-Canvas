//-Создаём Canvas
//-Creating a Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvasSize(innerWidth, innerHeight);
const objectsRendering = new Array();
let sampleCycle = objectsRendering.push(new Cycle(500, 500, 100, 'tomato', 'Hello, I am sample', Infinity));
let boxSample = new Box(200, 200, 200, 0, 'tomato', 'Hello, click on me!', Infinity);
let boxSampleA = new Box(900, 0, 300, 0, 'pink', 'Hover the mouse over the edges', Infinity);
//-Камера центрирована и двигается в сторону клика
//-The camera is centered and moves towards the click
let cameraX = 0;
let cameraY = 0;
let clientX;
let clientY;
let movementAngle;
let angleX = 0;
let angleY = 0;
let testCamY = false;
let testCamX = false;
canvas.addEventListener('mousemove', (event) => {
    console.log(event.clientY);
    if (event.clientY <= 80 || event.clientY > (canvas.height- 200)) {
    testCamY = true;
    } else {
        testCamY = false;
    } 
    if (event.clientX <= 50 || event.clientX > (canvas.width- 100)) {
        testCamX = true;
    } else testCamX = false;
})
canvas.addEventListener('mousemove', (event) => {
    if(testCamY || testCamX) {
    clientY = event.clientY;
    clientX = event.clientX;
    movementAngle = Math.atan2(clientY - canvas.height / 2, clientX - canvas.height / 2);
    angleX = Math.cos(movementAngle);
    angleY = Math.sin(movementAngle);
    // console.log(angleX);
}});
function camera() {
    if (testCamY || testCamX) {
    cameraX += angleX;
    cameraY += angleY;
    }
}
//-Функция отрисовки всех элементов
//Function of rendering all elements
function drawAll() {
    clearCanvas();
    background('black');
    camera();
    ctx.translate(-cameraX, -cameraY);
    render(boxSample);
    render(boxSampleA);
    lifeCycle(boxSample);
//-Специальная функция для зацикливания requestAnimationFrame
    requestAnimationFrame(drawAll);
};
//-Функция управления размерами Canvas
//-Set canvas size function
function canvasSize(width, height) {
    canvas.width = width;
    canvas.height = height;
};
//-Функция очистки Canvas
//-Clear canvas function
function clearCanvas() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
};
//-Фукция управления цвета фона Canvas (используй формат строки для цвета)
//-Set background color function (use string format for "color")
function background(color) {
    ctx.beginPath();
    ctx.resetTransform();
    ctx.fillStyle = color;
    ctx.fillRect (0, 0, canvas.width, canvas.height);
    ctx.closePath();
};
//-Функция отривоки массива или обьекта с встроенной функцией draw()
//-The function of drawing an array or object with a built-in function draw()
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
//-Filtering function by object lifecycle parameter
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
//-Функция обработки столкновения двух кругов и вызова вложенной функции при регистрации
//-The function of handling the collision of two circles and calling a nested function during registration
function crash(ObjectOne, ObjectTwo, eventfunction) {
    let dist = Math.hypot(ObjectOne.x - ObjectTwo.x, ObjectOne.y - ObjectTwo.y);
    // console.log(dist);
    if (dist < ObjectOne.size + ObjectTwo.size) { eventfunction() };
};
//-Функция обратная обратная crash()
//-Reverse of crash() func
function evade(ObjectOne, ObjectTwo, eventfunction) {
    let dist = Math.hypot(ObjectOne.x - ObjectTwo.x, ObjectOne.y - ObjectTwo.y);
    // console.log(dist);
    if (dist > ObjectOne.size + ObjectTwo.size) { eventfunction() };
};
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
//-We run the function of rendering all elements on Canvas after loading the page
window.onload = drawAll();