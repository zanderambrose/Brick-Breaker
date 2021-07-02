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

// Window resize event listener for full screen view
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

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

        if (this.impact(userBoard) && this.dy > 0) {
            this.dy = -this.dy
        }
    }

    impact(board) {
        if (this.y < board.y &&
            this.y > board.y - this.r &&
            this.x > board.x - this.r &&
            this.x < board.x + board.w + this.r) {
            return true
        } else {
            return false
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
        this.dx = 5;
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

// Add an object container to use for implementing a game loop 
const isKeyPressed = {}

// Event listeners to keep state of left and right keyboard events
window.addEventListener('keydown', (e) => {
    isKeyPressed[e.key] = true
}, true);

window.addEventListener('keyup', (e) => {
    isKeyPressed[e.key] = false
}, true);

// Game Loop function 
const gameLoop = () => {
    if (isKeyPressed['ArrowRight' || 'Right']) {
        if (userBoard.x >= window.innerWidth - userBoard.w) {
            userBoard.x += 0
        } else {
            userBoard.x += userBoard.dx
        }
    }
    if (isKeyPressed['ArrowLeft' || 'Left']) {
        if (userBoard.x <= 0) {
            userBoard.x -= 0
        } else {
            userBoard.x -= userBoard.dx
        }
    }
    setTimeout(gameLoop, 10)
}

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
    gameLoop()
})







