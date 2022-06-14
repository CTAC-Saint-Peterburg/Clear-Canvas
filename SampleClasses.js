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
        ctx.arc(this.x,this.y, this.size, 0, 2* Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.fillStyle = '#004777';
        ctx.font = "30px Arial";
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x, this.y);
        ctx.closePath();
        this.lifeCycle -= 1;
    }
};

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
        let height = this.size * (Math.sqrt(3)/2); //200 * Math.cos(Math.PI / 6);
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate * Math.PI / 180);
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
};

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
        ctx.rotate(this.rotate * Math.PI / 180);
        ctx.translate(-this.x, -this.y);
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.fillStyle = '#004777';
        ctx.font = "30px Arial";
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x + this.size / 2, this.y + this.size /2);
        ctx.closePath();
        this.lifeCycle -= 1;
    }
};
class GlobalMap {
    constructor(x,y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw() {
        let img = new Image();
        img.src = './assets/UK-Ireland.jpg';
            ctx.beginPath();
            ctx.drawImage(img, this.x, this.y);
            ctx.closePath();
        
    }
}
class Town {
    constructor(name, x, y, isCapital, townStage) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.isCapital = isCapital;
        this.townStage = townStage;
    }
    draw() {
        let img = new Image();
        img.src = townStageFunc(this.townStage);
        ctx.beginPath();
        ctx.drawImage(img, this.x, this.y);
        ctx.fillStyle = 'tomato';
        ctx.font = "40px Arial";
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x + 250 / 2, this.y + 580 /2);
        ctx.closePath();
    }
}