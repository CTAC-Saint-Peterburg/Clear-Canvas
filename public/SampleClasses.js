class PlayerClass {
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
        if (keyBoardBtn.q == false) {
            trident.x = player.x;
            trident.y = player.y;
        };
        if(keyBoardBtn.q == true) {
        tridentMove.x += qangle.x * 3;
        tridentMove.y += qangle.y * 3;
        keyBoardBtn.reloadQ += 1;
        if(keyBoardBtn.reloadQ >= 150) {
            trident.x = player.x;
            trident.y = player.y;
            tridentMove.x = 0;
            tridentMove.y = 0;
            keyBoardBtn.reloadQ = 0;
            tridentPlayer.rotate = tridentAngle;
            keyBoardBtn.q = false;
        }
        };
        ctx.beginPath();
        ctx.save()
        //-костыль для мультиплеера
        let proxTraslate = {x: trident.x + tridentMove.x, y: trident.y + tridentMove.y};
        tridentTranslateData = proxTraslate;
        ctx.translate(proxTraslate.x, proxTraslate.y);
        //-----
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
class EnemyTrident {
    constructor(x,y,rotate) {
        this.x = x;
        this.y = y;
        this.rotate = rotate;
    }
    draw() {
        ctx.beginPath();
        ctx.save();
        ctx.translate(enemyTridentTranslate.x, enemyTridentTranslate.y);
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
};
class GUI {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
    draw() {
        //first arc
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.size, 0, 2* Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        //second arc
        ctx.beginPath();
        ctx.arc(this.x + 160,this.y, this.size, 0, 2* Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        //text
        ctx.beginPath();
        ctx.fillStyle = '#004777';
        ctx.font = "40px Arial";
        ctx.fillText('Q', this.x, this.y + this.size * 2);
        ctx.fillText('W', this.x + 160, this.y + this.size * 2);
        ctx.textAlign = 'center';
        ctx.closePath();
        if (keyBoardBtn.q == false) {
        //trident icon
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + 40);
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.lineTo(this.x, this.y - 35);
        ctx.moveTo(this.x + 25, this.y -5);
        ctx.lineTo(this.x - 25, this.y -5);
        ctx.moveTo(this.x + 25, this.y -5);
        ctx.lineTo(this.x + 25, this.y -35);
        ctx.moveTo(this.x - 25, this.y -5);
        ctx.lineTo(this.x - 25, this.y -35);
        ctx.strokeStyle = 'rgba(39, 41, 50, 0.3)';
        ctx.stroke();
        ctx.closePath();
        }
        if (keyBoardBtn.q == true) {
            let counter;
            if (keyBoardBtn.reloadQ <=50) counter = 3;
            if (keyBoardBtn.reloadQ <=100 && keyBoardBtn.reloadQ > 50) counter = 2;
            if (keyBoardBtn.reloadQ <=150 && keyBoardBtn.reloadQ > 100) counter = 1;
            ctx.beginPath();
            ctx.fillStyle = '#004777';
            ctx.font = "80px Arial";
            ctx.fillText(counter, this.x, this.y + 25);
            ctx.textAlign = 'center';
            ctx.closePath();
        }
        if(keyBoardBtn.w == false) {
        //boost icon
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        //>
        ctx.moveTo(this.x + 170, this.y);
        ctx.lineTo(this.x + 140, this.y -15);
        ctx.moveTo(this.x + 170, this.y);
        ctx.lineTo(this.x + 140, this.y +15);
        ctx.moveTo(this.x + 170, this.y);
        //>>
        ctx.moveTo(this.x + 190, this.y);
        ctx.lineTo(this.x + 160, this.y -20);
        ctx.moveTo(this.x + 190, this.y);
        ctx.lineTo(this.x + 160, this.y +20);
        ctx.strokeStyle = 'rgba(39, 41, 50, 0.3)';
        ctx.stroke();
        ctx.closePath();
        }
        if (keyBoardBtn.w == true) {
            let counter;
            if (keyBoardBtn.reloadW <=33) counter = 3;
            if (keyBoardBtn.reloadW <=66 && keyBoardBtn.reloadW > 33) counter = 2;
            if (keyBoardBtn.reloadW <=100 && keyBoardBtn.reloadW > 66) counter = 1;
            ctx.beginPath();
            ctx.fillStyle = '#004777';
            ctx.font = "80px Arial";
            ctx.fillText(counter, this.x + 160, this.y + 25);
            ctx.textAlign = 'center';
            ctx.closePath();
        }
    }
};

