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
function timer() {
  myTimer.countdown = new Date().getTime() + 60000;
}
function saveProgress() {
  if (scores.text >= 2000) {
    let x = Number(localStorage.getItem("coins"));
    localStorage.setItem(
      "coins",
      (x += Math.floor(Number(scores.text) / 2000))
    );
  }
  if (
    localStorage.getItem("scores") < scores.text ||
    localStorage.getItem("scores") == null
  ) {
    localStorage.setItem("scores", scores.text);
  } else return scores.text;
}
function mobileScreen() {
  const verySmallScreen = 900;
  const pcScreen = 1080;
  const littleMobileScreen = 2000;
  const bigMobileScren = 3000;
  if (verySmallScreen > innerHeight) {
    //      time.x -= 5;
    //      time.y += 60;
    time.size = 30;
    //-
    //      totalScore.y += 80;
    totalScore.size = "20px";
    //-
    scores.size = "46px";
    //      scores.y += 160;
    //-
    comboText.y += 70;
    comboText.size = "32px";
    //-
    combo.y += 70;
    //      combo.x += 50;
    combo.size = 30;
    //-
    questionText.size = "75px";
    //-
    equality.size = "75px";
    equality.y -= 15;
    //-
    questionAnswer.size = "46px";
    questionAnswer.y -= 20;
    //-
    yesAnswer.x += 30;
    yesAnswer.size = 50;
    yesAnswer.fontSize = "48px";
    //-
    noAnswer.size = 50;
    noAnswer.x -= 30;
    noAnswer.fontSize = "48px";
    //-
    openScreen.textSize = 12;
    openScreen.secondTextSize = 12;
  } else if (pcScreen > innerHeight) {
    console.log("PC");
    yesAnswer.y -= 30;
    noAnswer.y -= 30;
  } else if (littleMobileScreen > innerHeight) {
    time.x -= 5;
    time.y += 60;
    time.size = 70;
    //-
    totalScore.y += 80;
    totalScore.size = "48px";
    //-
    scores.size = "140px";
    scores.y += 160;
    //-
    comboText.y -= 150;
    comboText.size = "64px";
    //-
    combo.y -= 100;
    combo.x += 50;
    combo.size = 80;
    //-
    questionText.size = "140px";
    //-
    equality.size = "100px";
    //-
    questionAnswer.size = "100px";
    questionAnswer.y += 30;
    //-
    yesAnswer.x -= 50;
    yesAnswer.size = 120;
    yesAnswer.y -= 30;
    //-
    noAnswer.size = 120;
    noAnswer.x += 50;
    noAnswer.y -= 30;
    //-
    openScreen.textSize = 46;
    console.log("littleMobile");
  } else if (bigMobileScren > innerHeight) {
    time.x -= 5;
    time.y += 60;
    time.size = 70;
    //-
    totalScore.y += 80;
    totalScore.size = "48px";
    //-
    scores.size = "140px";
    scores.y += 160;
    //-
    comboText.y -= 150;
    comboText.size = "64px";
    //-
    combo.y -= 100;
    combo.x += 50;
    combo.size = 80;
    //-
    questionText.size = "140px";
    //-
    equality.size = "100px";
    //-
    questionAnswer.size = "100px";
    questionAnswer.y += 30;
    //-
    yesAnswer.x -= 50;
    yesAnswer.size = 120;
    yesAnswer.y -= 30;
    //-
    noAnswer.size = 120;
    noAnswer.x += 50;
    noAnswer.y -= 30;
    //-
    openScreen.textSize = 46;
    console.log("bigMobile");
  }
}
function spawnParticles(color, particleSkin) {
  particles = [];
  for (let i = 0; i < 6; i++) {
    particles.push(
      new Particle(
        canvas.width / 2,
        canvas.height / 2,
        20,
        `${color}`,
        Math.floor(Math.random() * 100),
        particleSkin
      )
    );
  }
}
function resetShopButton() {
  shopButton.style.display = "";
}
function shopScrollSkin(direction) {
  if (direction === "left") {
    scrollSkin >= 1 ? (scrollSkin += -1) : (scrollSkin = 3);
    previewSkin.innerText = particleSkins[scrollSkin].avatar;
    pName.innerText = particleSkins[scrollSkin].name;
    pPrice.innerText = particleSkins[scrollSkin].price;
  } else if (direction === "right") {
    scrollSkin <= 2 ? (scrollSkin += 1) : (scrollSkin = 0);
    previewSkin.innerText = particleSkins[scrollSkin].avatar;
    pName.innerText = particleSkins[scrollSkin].name;
    pPrice.innerText = particleSkins[scrollSkin].price;
  }
}
function acceptButton() {
  //sCD - shopCartData hot fix
  let sCD = localStorage.getItem("shop");
  sCD = sCD.split(",").map(Number);
  let x = sCD.filter((x) => x == scrollSkin);
  if (x == scrollSkin) {
    chosenSkin = scrollSkin;
  } else return;
}
function buyButton() {
  let coins = localStorage.getItem("coins");
  let shopCartData = localStorage.getItem("shop");
  //
  //
  if (coins >= particleSkins[scrollSkin].price) {
    //
    let coinsUpdate = coins - particleSkins[scrollSkin].price;
    //
    localStorage.setItem("coins", coinsUpdate);
    //
    particleSkins[scrollSkin].price = 0;
    pPrice.innerText = particleSkins[scrollSkin].price;
    //
    if (shopCartData.includes(String(scrollSkin))) {
      // console.log("already sold");
    } else {
      localStorage.setItem("shop", [shopCartData, scrollSkin]);
    }
    //
  }
  console.log("cannot buy");
}
