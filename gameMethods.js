let player;

function startGame() {
    player = new playable(100, 100, "red", 500, 500);
    myMap.start();
}

let myMap = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1080;
        this.canvas.height = 1080;
        this.context = this.canvas.getContext("2d");
        document.getElementById("container").appendChild(this.canvas);
        this.interval = setInterval(updateMap, 20);
    },
    pause: function() {
        clearInterval(this.interval);
        this.interval = null;
        changeTitle();
    },
    play: function() {
        if (this.interval !== null) return;

        this.interval = setInterval(updateMap, 20);
        changeTitle();
    },
    clear: function() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
}

function playable(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myMap.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myMap.canvas.height - this.height;
        if (this.y > rockbottom) {
            const forceHitted = this.gravitySpeed;
            this.y = rockbottom;
            if (forceHitted >= 7) {
                this.gravitySpeed = (this.gravitySpeed - 3) * -1;
            } else {
                this.gravitySpeed = 0;
            }
        }
    }
    this.updateParams = function() {
        g.value = this.gravity.toFixed(2);
        gs.value = this.gravitySpeed.toFixed(2);
        py.value = this.y.toFixed(2);
        px.value = this.x.toFixed(2);
        sw.value = this.width.toFixed(2);
        sh.value = this.height.toFixed(2);
    }
}

function accelerate(n) {
    player.gravity = n;
}

function updateMap() {
    myMap.clear();
    player.newPos();
    player.update();
    player.updateParams();
}

function changeTitle() {
    const title = document.getElementById("title");

    if (title.innerText === "Playing!") {
        title.innerText = "Paused!";
    } else {
        title.innerText = "Playing!"
    }
}