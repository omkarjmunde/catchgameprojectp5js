class Enemy extends Items {
    /*
    the construtor initialises the Enemy object, inheriting from the Items superclass
    */
    constructor(x, y, w, l, dropSpeed, duration, imgFile, isCollided, isActive, gravity, damage, eType) {
        super(x, y, w, l, dropSpeed, duration, imgFile, isCollided, isActive, gravity)
        this.damage = damage
        this.eType = eType
        this.dropY = floor(random(500, CANVASY))
    }

    /*
    the getter and setter methods which are responsible for manipulating the data in the 
    attributes
    */
    getDamage() {
        return this.damage
    }

    getEType() {
        return this.eType
    }

    setDamage(newDamage) {
        this.damage = newDamage
    }

    setEType(newEType) {
        this.eType = newEType
    }

    /*
    the draw method contains code which draws the enemy as a red box
    */
    draw() {
        fill(255, 0, 0)
        
        rect(this.x, this.y, this.w, this.l)
    }
    
    /*
    the update method contains code which drops the enem if it is inactive,
    checks for collisions if active, if it collides it despawns and reduces lives based on the attributes
    */
    update() {
        if (this.isActive == false) {
            this.drop()
        }
        //console.log(this.isActive)
            
        if (this.isActive == true) {
            this.hookCollision()
            this.durationDecrementer()
            //console.log("updating")
            if (this.isCollided == true) {
                score.incrementLives(-1 * this.getDamage())
                console.log(this.eType + " hit")
                this.duration = 0
            }
            
        //console.log("Fish position:", this.x, this.y)
        }
        this.draw()
    }
    
}