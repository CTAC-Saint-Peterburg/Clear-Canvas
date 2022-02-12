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
        ctx.shadowBlur = 0;
        ctx.arc(this.x,this.y, this.size, 0, 2* Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#283d3b';
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = '#d6efff';
        ctx.font = "35px Arial";
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x, this.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeText(this.text, this.x, this.y);
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
        ctx.shadowBlur = 0;
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
        ctx.shadowBlur = 0;
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
class Mapcycle {
    constructor(size, color, lifeCycle) {
        this.x = 0;
        this.y = 0;
        this.size = size;
        this.color = color;
        this.lifeCycle = lifeCycle;
    }
    draw() {
        ctx.beginPath();
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 15;
        ctx.arc(this.x,this.y, this.size, 0, 2* Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 50;
        ctx.strokeStyle = 'orange';
        ctx.stroke();
        ctx.closePath();
        this.lifeCycle -= 1;
    }
};
class Trident {
    constructor(x,y,rotate) {
        this.x = x;
        this.y = y;
        this.rotate = rotate;
    }
    draw() {
        if(keyBoardBtn.q == true) {
        tridentMove.x += qangle.x * 3;
        tridentMove.y += qangle.y * 3;
        keyBoardBtn.reloadQ += 1;
        if(keyBoardBtn.reloadQ >= 150) {
            tridentMove.x = 0;
            tridentMove.y = 0;
            keyBoardBtn.reloadQ = 0;
            keyBoardBtn.q = false;
        }
        };
        ctx.beginPath();
        ctx.save()
        ctx.translate(this.x + tridentMove.x, this.y + tridentMove.y);
        ctx.rotate(this.rotate - 1.55); //-нужно переделать
        ctx.moveTo(0, 160);
        ctx.lineWidth = 15;
        ctx.lineCap = 'round';
        ctx.lineTo(0, 120 + 160);
        ctx.lineTo(40, 120 + 160);
        ctx.moveTo(0, 120 + 160);
        ctx.lineTo(-40, 120 +160);
        ctx.moveTo(0, 120 + 160);
        ctx.lineTo(0, 180 + 160);
        ctx.moveTo(40, 120 + 160);
        ctx.lineTo(40, 180 + 160);
        ctx.moveTo(-40, 120 + 160);
        ctx.lineTo(-40, 180 + 160);
        ctx.strokeStyle = 'tomato';
        ctx.stroke();
        ctx.restore();
        ctx.closePath();
    }
}

