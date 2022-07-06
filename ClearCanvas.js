//-Создаём Canvas
//-Creating a Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvasSize(innerWidth, innerHeight);
let cameraX = 0;
let cameraY = 0;
let angleX = 0;
let angleY = 0;
let towns = new Array();
let armies = new Array();
let strategicMap = new GlobalMap(0, 0, 0);
let townLondon = new Town('London', 1100, 1300, false, 1);
let townEdinburg = new Town('Edinburg', 800, 200, false, 2);
let townDublin = new Town('Dublin', 500, 800, false, 3);
let testArmy = new Army(300, 700, 'army 1', undefined, undefined, undefined, undefined, false);
let testArmyTwo = new Army(1000, 800, 'army 2', undefined, undefined, undefined, undefined, false);
let testUi = new UI(canvas.width /2 - 400, 200, 800, 600, false, 1, {title: 'Menu'}, {color: 'red', textColor: 'white',});
//-Камера центрирована и двигается в сторону клика
//-The camera is centered and moves towards the click
let clientX;
let clientY;
let movementAngle;

let strategicCamY = false;
let strategicCamX = false;
let mouseM;
canvas.addEventListener('click', (event) => {
    focusUI(event);
     grabStatus(event);
});
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
    setArmies();
    render(strategicMap);
    render(towns);
    render(armies);
    render(testUi);
//-Специальная функция для зацикливания requestAnimationFrame
    requestAnimationFrame(drawAll);
};
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
//-We run the function of rendering all elements on Canvas after loading the page
window.onload = drawAll();