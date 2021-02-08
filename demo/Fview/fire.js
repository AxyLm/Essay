function Fire(pos) {
    this.div = document.createElement("div");
    this.pos = pos;
}
Fire.prototype = {
    init: function () {
        document.getElementById('mode').appendChild(this.div)
        this.div.className = "fire";
        this.div.style.left = this.pos.x + "px";
        this.div.style.bottom = -this.div.offsetHeight + "px";
        return this;
    },
    move: function () {
        startMove(this.div, { top: this.pos.y }, function () {
            this.div.remove();
            this.explode();
        }.bind(this));
    },
    explode: function () {
        let count = rand(20, 50);
        for (let i = 1; i < count; i++) {

            new Spark(this.pos).init().move();
        }
    }
}
function Spark(pos) {
    this.div = document.createElement("div");
    this.pos = pos;
}
Spark.prototype = {
    init: function () {
        document.getElementById('mode').appendChild(this.div)
        this.div.className = "spark";
        this.div.style.left = this.pos.x + "px";
        this.div.style.top = this.pos.y + "px";
        this.div.style.backgroundColor = getColor()
        return this;
    },
    move: function () {
        let speedX = rand(-10, 10);
        let speedY = rand(-8, 8);
        this.timer = setInterval(function () {
            this.div.style.left = this.div.offsetLeft + speedX + "px";
            this.div.style.top = this.div.offsetTop + speedY++ + "px";
            //当烟花落地后  删除烟花
            if (this.div.offsetTop > window.innerHeight) {
                clearInterval(this.timer);
                this.div.remove();
            }
        }.bind(this), 30)

    }
}
