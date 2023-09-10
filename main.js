const ctx = document.getElementById('canvas').getContext('2d')
const windowwidth = (canvas.width = window.innerWidth)
const windowheight = (canvas.height = window.innerHeight)
let match = true

class Racket{
    xVel = 0
    yVel = 0
    constructor(xPos,yPos,width,height,color,side){
        this.xPos = xPos
        this.yPos = yPos
        this.width = width
        this.height = height
        this.color = color
        this.side = side
        if (this.side === 'left'){
            window.addEventListener('keydown', (event)=>{
                if (event.key === 'w'){this.yVel = -10}
            })
            window.addEventListener('keydown', (event) =>{
                if (event.key === 's'){this.yVel = 10}
            })
            window.addEventListener('keyup', (event)=>{
                if (event.key === 'w'){this.yVel = 0}
            })
            window.addEventListener('keyup', (event)=>{
                if (event.key === 's'){this.yVel = 0}
            })
        }
        if (this.side === 'right'){
            window.addEventListener('keydown', (event)=>{
                if (event.key === 'ArrowUp'){this.yVel = -10}
            })
            window.addEventListener('keydown', (event) =>{
                if (event.key === 'ArrowDown'){this.yVel = 10}
            })
            window.addEventListener('keyup', (event)=>{
                if (event.key === 'ArrowUp'){this.yVel = 0}
            })
            window.addEventListener('keyup', (event)=>{
                if (event.key === 'ArrowDown'){this.yVel = 0}
            })
        }
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.xPos,this.yPos,this.width,this.height)
    }
}
class Ball{
    xPos = windowwidth/2
    yPos = windowheight/2
    xVel = -3
    yVel = 3
    constructor(radius,color){
        this.radius=radius
        this.color=color
    }
    collide(){
        if (this.xPos <= racketLeft.xPos+racketLeft.width){
            if ((this.yPos > racketLeft.yPos) && (this.yPos < racketLeft.yPos + racketLeft.height)){
                this.xVel = -(this.xVel)
            }
            else{ // TEMP -> add lost game state
                console.log('lost')
                match = false
            }
        }
        if (this.xPos >= racketRight.xPos){
            if ((this.yPos > racketRight.yPos) && (this.yPos < racketRight.yPos + racketRight.height)){
                this.xVel = -(this.xVel)
            }
            else{ // TEMP -> add lost game state
                console.log('lost')
                match = false
            }
        }
        
        if ((this.yPos >= windowheight) || (this.yPos <= 0)){ // Bottom and Top side
            this.yVel = -(this.yVel)
        }
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle=this.color
        ctx.arc(this.xPos,this.yPos,this.radius, 0, 2*Math.PI)
        ctx.fill()
    }
}
function loop(){
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,windowwidth,windowheight)

    // Ball movement
    ball.collide()
    ball.xPos += ball.xVel
    ball.yPos += ball.yVel

    // Racket movement
    racketLeft.yPos += racketLeft.yVel
    racketRight.yPos += racketRight.yVel

    racketLeft.draw()
    racketRight.draw()

    ball.draw()
    if (match === false){
        return
    }
    
    requestAnimationFrame(loop)
}
const racketLeft = new Racket(0,windowheight/2,20,360,'black','left')
const racketRight = new Racket(windowwidth-20,windowheight/2,20,360,'black','right')
const ball = new Ball(10, 'blue')
loop()