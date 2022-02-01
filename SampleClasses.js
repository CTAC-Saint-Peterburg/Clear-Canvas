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
}