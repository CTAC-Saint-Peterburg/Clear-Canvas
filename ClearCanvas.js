//-Создаём Canvas
//-Creating a Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvasSize(innerWidth, innerHeight);
let cameraX = 0;
let cameraY = 0;
let gameStart = false;
let difficulty = "900";
let screenResize = {
  font: 0,
  x: 0,
  y: 0,
  time: {
    x: 0,
    y: 0,
  },
  totalScore: {
    font: 0,
    x: 0,
    y: 0,
  },
};
let question = {
  a: generateNumber(difficulty),
  b: generateNumber(difficulty),
  answer: () => question.a + question.b,
};
//- Обьекты
//- Стартовый и конечный экран
let openScreen = new FullScreen();
//- Переменная таймер
let myTimer = {
  countdown: undefined,
};
//- 1 Time: 1:59
let time = new TextTime(canvas.width / 2 - 50, 80, 50, "#fefefe", "1:49");
// - 2 Total Score
let totalScore = new TextMessage(
  canvas.width / 2 + 10,
  120,
  "24px",
  "#c8c5d2",
  "Total scores"
);
// - 3 scores value 0
let scores = new TextMessage(canvas.width / 2 + 10, 170, "50px", "#ebe660", 0);
// - 4 Combo text
let comboText = new TextMessage(
  canvas.width / 2 - 80,
  canvas.height / 2 - 250,
  "28px",
  "#d5207a",
  "Combo"
);
// - 5 Combo value x0
let combo = new TextCombo(0, 0, 40, "#da2b3f", 0);
let intrigue = randomAnswer();
let questionText = new TextMessage(
  canvas.width / 2 + 5,
  canvas.height / 2,
  "90px",
  "#ffffff",
  `${question.a}+${question.b - intrigue}`
);
// - 6 =
let equality = new TextMessage(
  canvas.width / 2,
  canvas.height / 2 + 80,
  "90px",
  "#ffffff",
  "="
);
// - 7 answer
let questionAnswer = new TextMessage(
  canvas.width / 2,
  canvas.height / 2 + 130,
  "60px",
  "#da2b3f",
  question.answer()
);
// - 8 Yes circle
let yesAnswer = new AnswerBubble(
  canvas.width / 2 - 130,
  canvas.height / 2 + (canvas.height / 100) * 30,
  80,
  "#ebe660",
  "Y",
  "60px",
  5
);
// - 9 No circle
let noAnswer = new AnswerBubble(
  canvas.width / 2 + 130,
  canvas.height / 2 + (canvas.height / 100) * 30,
  80,
  "#da2b3f",
  "N",
  "60px",
  5
);
//--------------------
let screenClick = {
  x: undefined,
  y: undefined,
  size: 10,
};
canvas.addEventListener("click", (e) => {
  screenClick.x = e.clientX;
  screenClick.y = e.clientY;
  if (!gameStart) {
    crash(openScreen, screenClick, () => {
      timer();
      console.log("Игра началась");
      openScreen.gameOver = false;
      scores.text = 0;
      combo.count = 0;
      gameStart = true;
    });
  } else if (gameStart) {
    crash(yesAnswer, screenClick, () => {
      console.log("yes!");
      if (questionAnswer.text == questionAnswer.text - intrigue) {
        scores.text += 100 + 50 * combo.count;
        combo.count += 1;
        refreshApp(difficulty);
      } else refreshApp(difficulty), (combo.count = 0);
    });
    crash(noAnswer, screenClick, () => {
      console.log("no");
      if (questionAnswer.text != questionAnswer.text - intrigue) {
        scores.text += 100 + 50 * combo.count;
        combo.count += 1;
        refreshApp(difficulty);
      } else refreshApp(difficulty), (combo.count = 0);
    });
  }
});
//-Функция отрисовки всех элементов
//Function of rendering all elements
function drawAll() {
  clearCanvas();
  background("#0d1b1e");
  ctx.translate(-cameraX, -cameraY);
  render(time);
  render(totalScore);
  render(scores);
  render(comboText);
  render(combo);
  render(questionText);
  render(equality);
  render(questionAnswer);
  render(yesAnswer);
  render(noAnswer);
  render(openScreen);
  //-Специальная функция для зацикливания requestAnimationFrame
  requestAnimationFrame(drawAll);
}
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
//-We run the function of rendering all elements on Canvas after loading the page
(window.onload = mobileScreen()), drawAll();
