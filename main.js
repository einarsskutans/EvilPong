const ctx = document.getElementById('canvas').getContext('2d')
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

class Racket{
    xPos = 100
    yPos = 100
    xVel = 5
    yVel = 5
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
function loop(){
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,width,height)
    racket.draw()
    
    requestAnimationFrame(loop)
}
const racket = new Racket(20,20,'black')
loop()