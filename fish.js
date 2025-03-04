class Fish extends Items {
    constructor(x, y, w, l, dropSpeed, duration, imgFile, isCollided, isActive, gravity, speed, points, fType) {
        super(x, y, w, l, dropSpeed, duration, imgFile, isCollided, isActive, gravity)
        this.speed = speed
        this.points = points
        this.fType = fType
        this.randomX = CANVASX/2
        this.randomY = CANVASY/2
        this.dropY = floor(random(500, CANVASY)) 

    }

    getSpeed() {
        return this.speed
    }

    getPoints() {
        return this.points
    }

    getFType() {
        return this.fType
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed
    }

    setFType(newFType) {
        this.fType = newFType
    }



    draw() {
        fill("purple")
        ellipseMode(CENTER)
        ellipse(this.x, this.y, this.w, this.l)
    }

    movement() {
        if ((frameCount % 100) == 0) {
            this.randomX = floor(random(500, CANVASX))
            this.randomY = floor(random(500, CANVASY))
        }
        this.x = lerp(this.x, this.randomX, this.speed)
        this.y = lerp(this.y, this.randomY, this.speed)

        text(this.randomX + "  " + this.randomY, 500, 500)
    }

 
    basketCollision() {
        //print(hookX + "  " + hookY + "  " + hookDia)
        let dx = Math.abs((CANVASX - backgroundAttributes.basketXOffset) - this.x);
        let dy = Math.abs((backgroundAttributes.skyHeight - backgroundAttributes.landHeight - (backgroundAttributes.basketHeight / 2) - backgroundAttributes.basketYOffset) - this.y);
        let distance = (dx * dx + dy * dy)
        if (distance < (backgroundAttributes.basketWidth * backgroundAttributes.basketWidth + backgroundAttributes.basketHeight * backgroundAttributes.basketHeight)) {
            //print("caught")
            score.incrementLives(1)
            this.duration = 0
            score.incrementScore(this.points)
        }
        
        //console.log("AHHHH")
    }
    
    

    update() {
        if (this.isActive == false) {
            this.drop()
        }
        //console.log(this.isActive)
            
        if (this.isActive == true) {
            this.hookCollision()
            if (this.isCollided == false) {
                this.durationDecrementer()
                this.movement()
                //console.log(this.isCollided)
            } else {
                this.basketCollision()
            }
            //console.log("updating")
            
        //console.log("Fish position:", this.x, this.y)
        }
        this.draw()
    }
}  