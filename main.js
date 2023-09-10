const ctx = document.getElementById('canvas').getContext('2d')
const windowwidth = (canvas.width = window.innerWidth);
const windowheight = (canvas.height = window.innerHeight);
let lost = false

class Racket{
    xPos = 0
    yPos = windowheight/2
    xVel = 5
    yVel = 20
    constructor(width,height,color){
        this.width = width
        this.height = height
        this.color = color
        window.addEventListener('keydown', (event)=>{
            switch (event.key) {
                case 'w':
                    this.yPos -= this.yVel
                    break
                case 's':
                    this.yPos += this.yVel
                    break
            }
        })
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.xPos,this.yPos,this.width,this.height)
    }
}
class Ball{
    xPos = 400
    yPos = 50
    xVel = -1
    yVel = 1
    constructor(radius,color){
        this.radius=radius
        this.color=color
    }
    collide(){
        if (this.xPos <= racket.xPos+racket.width){
            if ((this.yPos > racket.yPos) && (this.yPos < racket.yPos + racket.height)){
                this.xVel = -(this.xVel)
            }
            else{ // TEMP -> add lost game state
                console.log('lost')
                this.radius = 300
            }
        }
        
        if ((this.yPos >= windowheight) || (this.yPos <= 0)){ // Bottom and Top side
            this.yVel = -(this.yVel)
        }
        if (this.xPos >= windowwidth){
            this.xVel = -(this.xVel)
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

    racket.draw()
    ball.draw()
    
    requestAnimationFrame(loop)
}
const racket = new Racket(20,360,'black')
const ball = new Ball(10, 'red')
loop()