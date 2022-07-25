//-Функция управления размерами Canvas
//-Set canvas size function
function canvasSize(width, height) {
  canvas.width = width;
  canvas.height = height;
}
//-Функция очистки Canvas
//-Clear canvas function
function clearCanvas() {
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
  let dist = Math.floor(
    Math.hypot(ObjectOne.x - ObjectTwo.x, ObjectOne.y - ObjectTwo.y)
  );
  // console.log(dist);
  if (dist < ObjectOne.size + ObjectTwo.size) {
    eventfunction();
  }
}
//-Функция обратная обратная crash()
//-Reverse of crash() func
function evade(ObjectOne, ObjectTwo, eventfunction) {
  let dist = Math.floor(
    Math.hypot(ObjectOne.x - ObjectTwo.x, ObjectOne.y - ObjectTwo.y)
  );
  // console.log(dist);
  if (dist > ObjectOne.size + ObjectTwo.size) {
    eventfunction();
  }
}
function generateNumber(difficulty) {
  return Math.floor(Math.random() * difficulty + 99);
}
function randomAnswer() {
  let needChangeAnswer = () => {
    return Math.floor(Math.random() * 10);
  };
  if (needChangeAnswer() >= 5) {
    return Math.floor(Math.random() * 22);
  } else return 0;
}
function refreshApp(d) {
  question.a = generateNumber(d);
  question.b = generateNumber(d);
  intrigue = randomAnswer();
  questionText.text = `${question.a}+${question.b - intrigue}`;
  questionAnswer.text = question.answer();
}
