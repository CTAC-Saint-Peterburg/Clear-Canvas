//-Создаём Canvas
//-Creating a Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvasSize(500, 1060);
let cameraX = 0;
let cameraY = 0;
let time = new TextTime(220, 100, undefined, "#fefefe", "1:49");
let totalScore = new TextMessage(250, 150, "30px", "#c8c5d2", "Total scores");
let scores = new TextMessage(250, 220, "72px", "#ebe660", 0);
let comboText = new TextMessage(80, 330, "36px", "#d5207a", "Combo");
let difficulty = "900";
let screenClick = {
  x: undefined,
  y: undefined,
  size: 10,
};
canvas.addEventListener("click", (e) => {
  screenClick.x = e.clientX;
  screenClick.y = e.clientY;
  crash(yesAnswer, screenClick, () => {
    console.log("yes!");
    if (questionAnswer.text == questionAnswer.text - intrigue) {
      scores.text += 100;
      refreshApp(difficulty);
    } else refreshApp(difficulty);
  });
  crash(noAnswer, screenClick, () => {
    console.log("no");
    if (questionAnswer.text != questionAnswer.text - intrigue) {
      scores.text += 100;
      refreshApp(difficulty);
    } else refreshApp(difficulty);
  });
});
let question = {
  a: generateNumber(difficulty),
  b: generateNumber(difficulty),
  answer: () => question.a + question.b,
};
let intrigue = randomAnswer();
let questionText = new TextMessage(
  250,
  580,
  "90px",
  "#ffffff",
  `${question.a}+${question.b - intrigue}`
);
let equality = new TextMessage(250, 660, "90px", "#ffffff", "=");
let questionAnswer = new TextMessage(
  250,
  710,
  "60px",
  "#da2b3f",
  question.answer()
);
let combo = new TextCombo(0, 430, 40, "#da2b3f", 0);
let yesAnswer = new AnswerBubble(120, 830, 80, "#ebe660", "Y");
let noAnswer = new AnswerBubble(380, 830, 80, "#da2b3f", "N");
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
  //-Специальная функция для зацикливания requestAnimationFrame
  requestAnimationFrame(drawAll);
}
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
//-We run the function of rendering all elements on Canvas after loading the page
window.onload = drawAll();
