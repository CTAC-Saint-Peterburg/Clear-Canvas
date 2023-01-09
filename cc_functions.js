//-Функция управления размерами Canvas
//-Set canvas size function
function canvas_size(width, height) {
  canvas.width = width;
  canvas.height = height;
}

//-Функция очистки Canvas
//-Clear canvas function
function canvas_clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//-Фукция управления цвета фона Canvas (используй формат строки для цвета)
//-Set background color function (use string format for "color")
function background(color) {
  ctx.beginPath();
  ctx.resetTransform();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}

function camera() {
  camera_coords.x += velocity.x;
  camera_coords.y += velocity.y;
  ctx.translate(-camera_coords.x, -camera_coords.y);
}

//-Функция отривоки массива или обьекта с встроенной функцией draw()
//-The function of drawing an array or object with a built-in function draw()
function render(data) {
  try {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        data[i].draw();
      }
    } else {
      data.draw();
    }
  } catch {
    console.log("Error: " + JSON.stringify(data));
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
