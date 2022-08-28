//-Создаём Canvas
//-Creating a Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvasSize(innerWidth, innerHeight);
let cameraX = 0;
let cameraY = 0;
let gameStart = false;
let difficulty = "900";
let question = {
  a: generateNumber(difficulty),
  b: generateNumber(difficulty),
  answer: () => question.a + question.b,
};
//-скины партикля
if (localStorage.shop == undefined) {
  localStorage.setItem("shop", [0]);
}
//
let shopCartDataSetup = localStorage.getItem("shop");
shopCartDataSetup = shopCartDataSetup.split(",").map(Number);
console.log(shopCartDataSetup);
let particleSkins = [
  { yes: 0, no: 0, name: "Default", price: 0, avatar: "NO" },
  { yes: 1, no: 0, name: "Hamster", price: 3, avatar: "🐹" },
  { yes: 2, no: 0, name: "Alien", price: 10, avatar: "👽" },
  { yes: 3, no: 0, name: "Crown", price: 30, avatar: "👑" },
];
//
for (let i = 0; i < shopCartDataSetup.length; i++) {
  particleSkins[shopCartDataSetup[i]].price = 0;
}
//
let scrollSkin = 0;
let chosenSkin = 0;
previewSkin.innerText = particleSkins[scrollSkin].avatar;
pName.innerText = particleSkins[scrollSkin].name;
pPrice.innerText = particleSkins[scrollSkin].price;
//-сохранение информации
if (localStorage.length == 0) {
  localStorage.setItem("scores", 0);
  localStorage.setItem("coins", 0);
} else if (localStorage.getItem("coins") == null) {
  localStorage.setItem("coins", 0);
}
//
let particles = new Array();
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
//-ui test
// let bob = new Cycle(50, 50, 50, "gold", "1");
// let bobo = new Cycle(50, 150, 50, "gold", "2");
// let boboo = new Cycle(250, 50, 50, "gold", "3");
// let bip = new Array();
// bip.push(bob, bobo, boboo);
// let hru = new Div(
//   {
//     render: true,
//     x: 100,
//     y: 100,
//     width: 200,
//     height: 200,
//     color: "red",
//   },
//   bip
// );
//--------------------
canvas.addEventListener("click", (e) => {
  screenClick.x = e.clientX;
  screenClick.y = e.clientY;
  if (!gameStart) {
    crash(openScreen, screenClick, () => {
      timer();
      console.log("Игра началась");
      shopButton.style.display = "none";
      shopWindow.style.display = "none";
      openScreen.gameOver = false;
      scores.text = 0;
      combo.count = 0;
      gameStart = true;
      //костыль
      time.saveStatus = true;
      //
    });
  } else if (gameStart) {
    crash(yesAnswer, screenClick, () => {
      console.log("yes!");
      if (questionAnswer.text == questionAnswer.text - intrigue) {
        spawnParticles(
          "rgba(193, 223, 31, 0.4)",
          particleSkins[chosenSkin].yes
        );
        scores.text += 100 + 50 * combo.count;
        combo.count += 1;
        refreshApp(difficulty);
      } else
        spawnParticles("rgba(190, 80, 120, 0.3)", particleSkins[chosenSkin].no),
          refreshApp(difficulty),
          (combo.count = 0),
          scores.text > 0 && scores.text != 50 ? (scores.text -= 100) : "";
    });
    crash(noAnswer, screenClick, () => {
      console.log("no");
      if (questionAnswer.text != questionAnswer.text - intrigue) {
        spawnParticles(
          "rgba(193, 223, 31, 0.4)",
          particleSkins[chosenSkin].yes
        );
        scores.text += 100 + 50 * combo.count;
        combo.count += 1;
        refreshApp(difficulty);
      } else
        spawnParticles("rgba(190, 80, 120, 0.3)", particleSkins[chosenSkin].no),
          refreshApp(difficulty),
          (combo.count = 0),
          scores.text > 0 && scores.text != 50 ? (scores.text -= 100) : "";
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
  render(particles);
  render(openScreen);
  // render(hru);
  //-Специальная функция для зацикливания requestAnimationFrame
  requestAnimationFrame(drawAll);
}
//-Запускаем функцию отрисовки всех элементов на Canvas после загрузки страницы
//-We run the function of rendering all elements on Canvas after loading the page
(window.onload = mobileScreen()), drawAll();
