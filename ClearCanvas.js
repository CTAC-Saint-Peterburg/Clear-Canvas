//-Создаём Canvas
//-Creating a Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvasSize(innerWidth, innerHeight);
let towns = new Array();
let boxSample = new Box(200, 200, 200, 0, 'tomato', 'Hello, click on me!', Infinity);
let boxSampleA = new Box(900, 0, 300, 0, 'pink', 'Hover the mouse over the edges', Infinity);
let strategicMap = new GlobalMap(0, 0, 0);
let townLondon = new Town('London', 1100, 1300, false, 1);
let townEdinburg = new Town('Edinburg', 800, 200, false, 2);
let townDublin = new Town('Dublin', 500, 800, false, 3);
let testArmy = new Army(300, 700, undefined, undefined, undefined, undefined, undefined, false);
//-Камера центрирована и двигается в сторону клика
//-The camera is centered and moves towards the click
let cameraX = 0;
let cameraY = 0;
let clientX;
let clientY;
let movementAngle;
let angleX = 0;
let angleY = 0;
let strategicCamY = false;
let strategicCamX = false;
let mouseM;
canvas.addEventListener('click', (event) => {
    if((event.clientX + cameraX) >= (testArmy.x) && (event.clientX + cameraX) < (testArmy.x + 120)) {
        if((event.clientY + cameraY) >= (testArmy.y) && (event.clientY + cameraY) < (testArmy.y + 300)) {
    console.log('hurray!');
    testArmy.grab = !testArmy.grab;
        }    
}
})
canvas.addEventListener('mousemove', (event) => {
    mouseM = event;
    // console.log(event.clientY);
    if (event.clientY <= 80 || event.clientY > (canvas.height- 200)) {
        strategicCamY = true;
    } else {
        strategicCamY = false;
    } 
    if (event.clientX <= 50 || event.clientX > (canvas.width- 100)) {
        strategicCamX = true;
    } else strategicCamX = false;
})
canvas.addEventListener('mousemove', (event) => {
    if(strategicCamY || strategicCamX) {
    clientY = event.clientY;
    clientX = event.clientX;
    movementAngle = Math.atan2(clientY - canvas.height / 2, clientX - canvas.height / 2);
    angleX = Math.floor(Math.cos(movementAngle) * 100) / 100;
    angleY = Math.floor(Math.sin(movementAngle) * 100) / 100;
    console.log(angleX);
}});
//-Функция отрисовки всех элементов
//Function of rendering all elements
function drawAll() {
    clearCanvas();
    background('black');
    camera();
    ctx.translate(-cameraX, -cameraY);
    setTowns();
    render(boxSample);
    render(boxSampleA);
    render(strategicMap);
    render(towns);
    render(testArmy);
    lifeCycle(boxSample);
//-Специальная функция для зацикливания requestAnimationFrame
    requestAnimationFrame(drawAll);
};
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
//-We run the function of rendering all elements on Canvas after loading the page
window.onload = drawAll();