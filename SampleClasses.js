class Cycle {
  constructor(x, y, size, color, text, lifeCycle) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.text = text;
    this.lifeCycle = lifeCycle;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.fillStyle = "#004777";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x, this.y);
    ctx.closePath();
    this.lifeCycle -= 1;
  }
}

class Triangle {
  constructor(x, y, size, rotate, color, text, lifeCycle) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotate = rotate;
    this.color = color;
    this.text = text;
    this.lifeCycle = lifeCycle;
  }
  draw() {
    let height = this.size * (Math.sqrt(3) / 2); //200 * Math.cos(Math.PI / 6);
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotate * Math.PI) / 180);
    ctx.translate(-this.x, -this.y);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.size / 2, this.y + height);
    ctx.lineTo(this.x - this.size / 2, this.y + height);
    ctx.lineTo(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    this.lifeCycle -= 1;
  }
}

class Box {
  constructor(x, y, size, rotate, color, text, lifeCycle) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotate = rotate;
    this.color = color;
    this.text = text;
    this.lifeCycle = lifeCycle;
  }
  draw() {
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotate * Math.PI) / 180);
    ctx.translate(-this.x, -this.y);
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.fillStyle = "#004777";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x + this.size / 2, this.y + this.size / 2);
    ctx.closePath();
    this.lifeCycle -= 1;
  }
}
class TextTime {
  constructor(x, y, size, color, text) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.text = text;
    this.saveStatus = true;
  }
  draw() {
    let distance = myTimer.countdown - new Date().getTime();
    let showTimer = {
      m: Math.floor(distance / 30000),
      s: Math.floor(distance / 2 / 500),
    };
    if (showTimer.m < 0) {
      if (this.saveStatus) {
        saveProgress();
        resetShopButton();

        gameStart = false;
        openScreen.gameOver = true;
        this.saveStatus = false;
      }
    }
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.font = `bold ${this.size}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText("Time:", this.x, this.y);
    ctx.font = `bold ${this.size + 4}px Arial`;
    ctx.fillText(
      `${showTimer.m}:${showTimer.s}`,
      this.x + 80 + this.size * 1.2,
      this.y
    );
    ctx.closePath();
  }
}
class TextMessage {
  constructor(x, y, size, color, text) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.text = text;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.font = `bold ${this.size} Arial`;
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x, this.y);
    ctx.closePath();
  }
}
class AnswerBubble {
  constructor(x, y, size, color, text, fontSize, lineWidth) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.text = text;
    this.fontSize = fontSize;
    this.lineWidth = lineWidth;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.lineWidth = 5;
    ctx.fillStyle = this.color;
    ctx.font = `bold ${this.fontSize} Arial`;
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x, this.y + 20);
    ctx.closePath();
  }
}
class TextCombo {
  constructor(x, y, size, color, count) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.count = count;
    this.animFrames = 200;
    this.framesCounter = -1;
  }
  draw() {
    ctx.beginPath();
    ctx.save();
    ctx.translate(canvas.width / 2 - 60, canvas.height / 2 - 200);
    ctx.rotate((-20 * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.font = `bold ${this.size + this.animFrames / 10}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText("X" + this.count, this.x, this.y);
    ctx.restore();
    ctx.closePath();
    if (this.animFrames <= 0) {
      this.framesCounter = 1;
    } else if (this.animFrames >= 200) {
      this.framesCounter = -1;
    }
    this.animFrames += this.framesCounter * 2;
  }
}
class FullScreen {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = innerHeight * 2;
    this.textSize = 20;
    this.secondTextSize = 26;
    this.animFrames = 200;
    this.framesCounter = -1;
    this.gameOver = false;
  }
  draw() {
    if (!gameStart) {
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0d1b1e";
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = "#ebe660";
      ctx.font = `bold ${this.textSize + this.animFrames / 5}px Arial`;
      ctx.textAlign = "center";
      ctx.fillText(
        `${this.gameOver == false ? "Tap to Start🧠" : "Restart😉"}`,
        canvas.width / 2,
        canvas.height / 2
      );
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = "#c8c5d2";
      ctx.font = `bold ${this.secondTextSize + this.textSize / 2}px Arial`;
      ctx.textAlign = "center";
      ctx.fillText(
        `${this.gameOver == false ? "Your best score: " : "Your score: "}${
          this.gameOver == false
            ? localStorage.getItem("scores")
            : scores.text +
              " " +
              "Best score:" +
              " " +
              localStorage.getItem("scores")
        }`,
        canvas.width / 2,
        canvas.height / 3 + 50
      );
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = "#ebe660";
      ctx.font = `bold ${this.secondTextSize * 2}px Arial`;
      ctx.textAlign = "center";
      ctx.fillText(
        `Coins: ${localStorage.getItem("coins") + "💰"}`,
        canvas.width / 2,
        canvas.height / 4
      );
      ctx.closePath();
      if (this.animFrames <= 0) {
        this.framesCounter = 1;
      } else if (this.animFrames >= 200) {
        this.framesCounter = -1;
      }
      this.animFrames += this.framesCounter * 2;
    } else return;
  }
}
class Particle {
  constructor(x, y, size, color, sign, particleSkin) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.sign = sign >= 50 ? -1 : 1;
    this.xVector = Math.random() * 3 * this.sign;
    this.yVector = Math.random() * 3 * this.sign;
    this.animFrames = 200;
    this.particleSkin = particleSkin;
  }
  draw() {
    if (this.animFrames > 0) {
      if (this.particleSkin == 0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.closePath();
      } else if (this.particleSkin == 1) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = `bold ${70}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("🐹", this.x, this.y);
        ctx.closePath();
      } else if (this.particleSkin == 2) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = `bold ${70}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("👽", this.x, this.y);
        ctx.closePath();
      } else if (this.particleSkin == 3) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = `bold ${70}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("👑", this.x, this.y);
        ctx.closePath();
      }
      this.x += this.xVector;
      this.y += this.yVector;
      this.animFrames += -1;
    }
    return;
  }
}
class UserInterface {
  constructor(settingsOBJ, renderArray) {
    this.renderStatus = settingsOBJ.renderStatus;
    this.x = settingsOBJ.x;
    this.y = settingsOBJ.y;
    this.sizeX = settingsOBJ.sizeX;
    this.sizeY = settingsOBJ.sizeY;
    this.color = settingsOBJ.color;
    this.renderArray = renderArray;
    this.renderArray.forEach((element) => {
      element.x += this.x;
      element.y += this.y;
    });
    //state manager
    this.stateManagerFuncSettings = function () {
      if (settingsOBJ != this.x) {
        this.renderArray.forEach((element) => {
          element.x -= settingsOBJ.x;
          element.y -= settingsOBJ.y;
          element.x += this.x;
          element.y += this.y;
        });
        settingsOBJ.x = this.x;
        settingsOBJ.y = this.y;
        settingsOBJ.color = this.color;
        settingsOBJ.sizeX = this.sizeX;
        settingsOBJ.sizeY = this.sizeY;
      }
    };
    //
    this.stateManagerFuncArray = function () {
      if (this.renderArray != renderArray) {
        this.renderArray = renderArray;
      }
    };
    //-
  }
  draw() {
    if (this.renderStatus) {
      this.stateManagerFuncSettings();
      this.stateManagerFuncArray();
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.sizeX, this.sizeY);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      render(this.renderArray);
    } else return;
  }
}
