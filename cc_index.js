canvas_size(1000, 1000);
const objectsRendering = new Array();
objectsRendering.push(
  new Cycle(
    500,
    500,
    100,
    "tomato",
    "Hello, I will disappear in a few seconds",
    180
  )
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

//-Функция отрисовки всех элементов
//Function of rendering all elements
function drawAll() {
  canvas_clear();
  background("yellow");
  camera();
  render(boxSample);
  render(objectsRendering);
  lifeCycle(objectsRendering);
  //-Специальная функция для зацикливания requestAnimationFrame
  requestAnimationFrame(drawAll);
}
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
//-We run the function of rendering all elements on Canvas after loading the page
window.onload = drawAll();
