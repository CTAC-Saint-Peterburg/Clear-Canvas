canvas_size(1000, 1000);
const objectsRendering = new Array();
objectsRendering.push(
  new Cycle(500, 500, 100, "tomato", "Hello, I am sample", Infinity)
);
let boxSample = new Box(
  200,
  200,
  200,
  0,
  "tomato",
  "Hello, click on me!",
  Infinity
);
//-Камера центрирована и двигается в сторону клика
//-The camera is centered and moves towards the click
const camera_coords = { x: 0, y: 0 };
let client_coords = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };
let movementAngle;
canvas.addEventListener("click", (event) => {
  client_coords.y = event.clientY;
  client_coords.x = event.clientX;
  movementAngle = Math.atan2(
    client_coords.y - canvas.height / 2,
    client_coords.x - canvas.height / 2
  );
  console.log(client_coords);
  //  angleX round to hundredths
  velocity.x = Math.round((velocity.x = Math.cos(movementAngle) * 100)) / 100;
  velocity.y = Math.round((velocity.y = Math.sin(movementAngle) * 100)) / 100;
  console.log(velocity);
});
function camera() {
  camera_coords.x += velocity.x;
  camera_coords.y += velocity.y;
  ctx.translate(-camera_coords.x, -camera_coords.y);
}
//-Функция отрисовки всех элементов
//Function of rendering all elements
function drawAll() {
  canvas_clear();
  background("yellow");
  camera();
  render(boxSample);
  render(objectsRendering);
  lifeCycle(boxSample);
  //-Специальная функция для зацикливания requestAnimationFrame
  requestAnimationFrame(drawAll);
}

//-Функция отривоки массива или обьекта с встроенной функцией draw()
//-The function of drawing an array or object with a built-in function draw()
function render(data) {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i].draw();
    }
  } else {
    data.draw();
  }
}
//-Функция фильтрации массива по параметру жизненного цикла объекта
//-Filtering function by object lifecycle parameter
function lifeCycle(data) {
  if (Array.isArray(data)) {
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].lifeCycle <= 0) {
        data.splice(i, 1);
      }
    }
  } else if (data.lifeCycle <= 0) {
    data.draw = () => {};
  }
}
//-Функция обработки столкновения двух кругов и вызова вложенной функции при регистрации
//-The function of handling the collision of two circles and calling a nested function during registration
function crash(ObjectOne, ObjectTwo, eventfunction) {
  let dist = Math.hypot(ObjectOne.x - ObjectTwo.x, ObjectOne.y - ObjectTwo.y);
  // console.log(dist);
  if (dist < ObjectOne.size + ObjectTwo.size) {
    eventfunction();
  }
}
//-Функция обратная обратная crash()
//-Reverse of crash() func
function evade(ObjectOne, ObjectTwo, eventfunction) {
  let dist = Math.hypot(ObjectOne.x - ObjectTwo.x, ObjectOne.y - ObjectTwo.y);
  // console.log(dist);
  if (dist > ObjectOne.size + ObjectTwo.size) {
    eventfunction();
  }
}
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
//-We run the function of rendering all elements on Canvas after loading the page
window.onload = drawAll();
