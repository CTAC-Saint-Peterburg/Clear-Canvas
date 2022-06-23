function camera() {
    if (strategicCamY || strategicCamX) {
    cameraX += angleX;
    cameraY += angleY;
    }
}
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
function townStageFunc(data) {
    switch(data) {
        case 1:
            return './assets/town1.png';
        case 2: 
            return './assets/town2.png';
        case 3:
            return './assets/town3.png';
    };
};
function grabStatus(event) {
    armies.forEach(army => {
        if((event.clientX + cameraX) >= (army.x) && (event.clientX + cameraX) < (army.x + 120)) {
            if((event.clientY + cameraY) >= (army.y) && (event.clientY + cameraY) < (army.y + 300)) {
        console.log('hurray!');
        army.grab = !army.grab;
        console.log(army.grab);
            }    
    }
    });
}
function setTowns() {
    towns = [];
    towns.push(townLondon,townEdinburg,townDublin);
};
function setArmies() {
    armies = [];
    armies.push(testArmy, testArmyTwo);
};