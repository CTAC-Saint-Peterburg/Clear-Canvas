//-Создаём Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvasSize(1000, 1000);
const objectsRendering = new Array();
//-Функция отрисовки всех элементов
function drawAll() {
    clearCanvas();
    background('black');
    render(objectsRendering);
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
//-Функция отривоки массива с встроенной функцией draw()
function render(array) {
for(let i = 0; i < array.length; i++) {
    array[i].draw();
}
};
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
window.onload = drawAll();