//-Создаём Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvasSize(1000, 1000);
const objectsRendering = new Array();
let sampleCycle = objectsRendering.push(new Cycle(500, 500, 100, 'tomato', 'Hello, I am sample', 300));
//-Функция отрисовки всех элементов
function drawAll() {
    clearCanvas();
    background('black');
    render(objectsRendering);
    lifeCycle(objectsRendering);
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
    for(let i = data.length - 1; i >= 0; i--) {
        if(data[i].lifeCycle <= 0) {
        data.splice(i, 1);
    }
    }
};
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
window.onload = drawAll();