// DOM Elements
const body = document.body
const canvas = document.getElementById('canvas')

// Canvas Context
const ctx = canvas.getContext('2d')

// General Styles
body.style.margin = '0'
canvas.style.border = '1px solid black'
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Make Start Game Button
const startGameBtn = document.createElement('button')
startGameBtn.textContent = "Click To Start Game"
startGameBtn.style.position = 'absolute'
startGameBtn.style.top = '10%'
body.append(startGameBtn)

// Make Ball Object
class Ball {
    constructor(x, y, r, dx, dy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = "orange";
        ctx.fill();
    }

    move() {
        this.draw()
        this.x += this.dx
        this.y += this.dy
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.dx = -this.dx
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.dy = -this.dy
        }
    }
}

// Make Board Object
class Board {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.dx = 10;
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}

// Instantiate a new Ball
const ball = new Ball(canvas.width / 2, 200, 30, 2, 5)

// Instantiate the bottom Board
const userBoard = new Board(200, canvas.height - 25, 120, 20, 'blue')

// Event Listener to move USERBOARD object
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "Right":
        case 'ArrowRight':
            userBoard.x += userBoard.dx
            console.log(userBoard.x)
            break
        case 'Left':
        case 'ArrowLeft':
            userBoard.x -= userBoard.dx
            console.log(userBoard.x)
            break
    }
})

// Animation Function
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.move();
    userBoard.draw()
}

// Start Game Event Listener
startGameBtn.addEventListener('click', () => {
    startGameBtn.style.visibility = 'hidden'
    animate()
})







