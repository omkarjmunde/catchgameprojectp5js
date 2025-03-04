class Enemy extends Items {
    constructor(x, y, w, l, dropSpeed, duration, imgFile, isCollided, isActive, gravity, damage, eType) {
        super(x, y, w, l, dropSpeed, duration, imgFile, isCollided, isActive, gravity)
        this.damage = damage
        this.eType = eType
        this.dropY = floor(random(500, CANVASY))
    }

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

    
    draw() {
        fill(255, 0, 0)
        
        rect(this.x, this.y, this.w, this.l)
    }
    
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