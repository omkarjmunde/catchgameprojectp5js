class Fish extends Items {
    /*
    the construtor initialises the Fish object, inheriting from the Items superclass
    */
    constructor(x, y, w, l, dropSpeed, duration, imgFile, isCollided, isActive, gravity, speed, points, fType) {
        super(x, y, w, l, dropSpeed, duration, imgFile, isCollided, isActive, gravity)
        this.speed = speed
        this.points = points
        this.fType = fType
        this.randomX = CANVASX/2
        this.randomY = CANVASY/2
        this.dropY = floor(random(500, CANVASY)) 
    }

    /*
    the getter and setter methods which are responsible for manipulating the data in the 
    attributes
    */
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


    /*
    the draw method contains code which draws the fish as a purple oval
    */
    draw() {
        fill("purple")
        ellipseMode(CENTER)
        ellipse(this.x, this.y, this.w, this.l)
    }
    
    /*
    the movement method contains code which generates a random set of x and y coordinates every 100 frames,
    then uses linear interpolation to smoothly move the object to it
    */
    movement() {
        if ((frameCount % 100) == 0) {
            this.randomX = floor(random(500, CANVASX))
            this.randomY = floor(random(500, CANVASY))
        }
        this.x = lerp(this.x, this.randomX, this.speed)
        this.y = lerp(this.y, this.randomY, this.speed)

        //text(this.randomX + "  " + this.randomY, 500, 500)
    }

    /*
    the movement method contains code which calculates the distance between the item and the basket,
    and increases the lives by 1 before immeadiately setting the duration to 0 and increasing the score
    by the value of the fish if the fish is within a certain area
    */
    basketCollision() {
        //console.log(hookX + "  " + hookY + "  " + hookDia)
        let dx = Math.abs((CANVASX - backgroundAttributes.basketXOffset) - this.x)
        let dy = Math.abs((backgroundAttributes.skyHeight - backgroundAttributes.landHeight - (backgroundAttributes.basketHeight / 2) - backgroundAttributes.basketYOffset) - this.y)
        let distance = (dx * dx + dy * dy)
        if (distance < (backgroundAttributes.basketWidth * backgroundAttributes.basketWidth + backgroundAttributes.basketHeight * backgroundAttributes.basketHeight)) {
            //console.log("caught")
            score.incrementLives(1)
            this.duration = 0
            score.incrementScore(this.points)
        } 
        //console.log("AHHHH")
    }
    
    
    /*
    the update method contains code which drops the fish if it is inactive,
    checks for collisions and moves if active, if it collides it 
    starts checking for basket collisions, and draws 
    */
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