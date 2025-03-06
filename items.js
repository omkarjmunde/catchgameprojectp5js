class Items {
    /*
    the construtor initialises the Items object
    */
    constructor(x, y, w, l, dropSpeed, duration, imgFile, isCollided, isActive, gravity) {
        this.x = x
        this.y = y
        this.w = w
        this.l = l
        this.dropSpeed = dropSpeed
        this.duration = duration
        this.imgFile = imgFile
        this.isCollided = isCollided
        this.isActive = isActive
        this.gravity = gravity
    }

    /*
    the getter and setter methods which are responsible for manipulating the data in the 
    attributes
    */

    getX() {
        return this.x
    }
    
    getY() {
        return this.y
    }

    getW() {
        return this.w
    }

    getL() {
        return this.l
    }

    getDropSpeed() {
        return this.dropSpeed
    }

    getDuration() {
        return this.duration
    }

    getImgFile() {
        return this.imgFile
    }

    getIsCollided() {
        return this.isCollided
    }

    setX(newX) {
        this.x = newX
    }

    setY(newY) {
        this.y = newY
    }

    setW(newW) {
        this.w = newW
    }

    setL(newL) {
        this.l = newL
    }

    setDropSpeed(newDropSpeed) {
        this.dropSpeed = newDropSpeed
    }

    setDuration(newDuration) {
        this.duration = newDuration
    }

    setImgFile(newImgFile) {
        this.imgFile = newImgFile
    }

    setIsCollided(newIsCollided) {
        this.isCollided = newIsCollided
    }

    /*
    the hookCollision method contains code which calculates the distance between the item and the hook,
    and sets the boolean value of isCollided to true is the distance is within the diameter of the hook
    */
    hookCollision() {
        const hookX = lineHook.getHookX()
        const hookY = lineHook.getHookY()
        const hookDia = lineHook.getHookDia()
        //console.log(hookX + "  " + hookY + "  " + hookDia)
        let dx = Math.abs(hookX - this.x)
        let dy = Math.abs(hookY - this.y)
        let distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < hookDia) {
            //console.log("caught")
            this.setX(hookX)
            this.setY(hookY)
            this.isCollided = true
        }
        //console.log(dx + "  " + dy)
    }

    /*
    the durationDecrementer method reduces the value of duration by 1 every time it is called, which is once per frame
    */
    durationDecrementer() {
        this.duration -= 1
    }

    /*
    the drop method contains code which accelerates the item downward from its spawn point to
    a randomly generated y coordinate within the playing area
    */
    drop() {
        if (this.y < this.dropY && this.isActive == false) {

            this.dropSpeed = this.dropSpeed + this.gravity
            //console.log(this.dropSpeed + "  drop")
            this.y = this.y + this.dropSpeed
            //console.log(this.y + "  y")
            if (this.y > this.dropY) {
                this.isActive = true
            }
        }
        
    }

}

class ItemManager {
    /*
    the construtor initialises the ItemManager object
    */
    constructor() {
        this.fManager = []
        this.eManager = []
    }
    /*
    the fSpawner method contains code which spawns a fish with attributes differing based on a random number generator
    */
    fSpawner(canvasXRandNum) {
        let fRandNum = floor(random(0, 21))
        let fish = null
        if (fRandNum <= 10) {
            fish = new Fish(canvasXRandNum, CANVASY - 700, sFishAttributes.width, sFishAttributes.length, sFishAttributes.dropSpeed, sFishAttributes.duration, sFishAttributes.img, sFishAttributes.isCollided, sFishAttributes.isActive, sFishAttributes.gravity, sFishAttributes.speed, sFishAttributes.points, "small fish")
            console.log("small fish")
        }
        if (fRandNum > 10 && fRandNum <= 15) {
            fish = new Fish(canvasXRandNum, CANVASY - 700, mFishAttributes.width, mFishAttributes.length, mFishAttributes.dropSpeed, mFishAttributes.duration, mFishAttributes.img, mFishAttributes.isCollided, mFishAttributes.isActive, mFishAttributes.gravity, mFishAttributes.speed, mFishAttributes.points, "medium fish")
            console.log("medium fish")
        }
        if (fRandNum > 15 && fRandNum <= 19) {
            fish = new Fish(canvasXRandNum, CANVASY - 700, lFishAttributes.width, lFishAttributes.length, lFishAttributes.dropSpeed, lFishAttributes.duration, lFishAttributes.img, lFishAttributes.isCollided, mFishAttributes.isActive, mFishAttributes.gravity, lFishAttributes.speed, lFishAttributes.points, "large fish")
            console.log("large fish")
        }
        if (fRandNum == 20) {
            fish = new Fish(canvasXRandNum, CANVASY - 700, eFishAttributes.width, eFishAttributes.length, eFishAttributes.dropSpeed, eFishAttributes.duration, eFishAttributes.img, eFishAttributes.isCollided, eFishAttributes.isActive, mFishAttributes.gravity, eFishAttributes.speed, eFishAttributes.points, "epic fish")
            console.log("epic fish")
        }
        this.fManager.push(fish)
        //console.log(fish.x + " " + fish.y)
    }
    /*
    the fSpawner method is the same as the above but for enemies
    */
    eSpawner(canvasXRandNum) {
        let eRandNum = floor(random(0, 11))
        let enemy = null
        if (eRandNum == 0) {
            enemy = new Enemy(canvasXRandNum, 0, battAttributes.width, battAttributes.length, battAttributes.dropSpeed, battAttributes.duration, battAttributes.img, battAttributes.isCollided, battAttributes.isActive, battAttributes.gravity, battAttributes.damage, battAttributes.type)
            console.log("battery")
        } else {
            enemy = new Enemy(canvasXRandNum, 0, canAttributes.width, canAttributes.length, canAttributes.dropSpeed, canAttributes.duration, canAttributes.img, canAttributes.isCollided, canAttributes.isActive, canAttributes.gravity, canAttributes.damage, canAttributes.type)
            console.log("can")
        }
        this.eManager.push(enemy)
    }

    /*
    the despawner method contains which code checks if the duration of the item is less than 1, 
    if yes, then it removes the item from the array and reduces the lives by 1 if the item
    is a fish
    */
    despawner() {
        for (let i = this.fManager.length - 1; i >= 0; i--) {
            if (this.fManager[i].getDuration() < 1) {
                this.fManager.splice(i, 1)
                score.incrementLives(-1)
            }
        }
        for (let i = this.eManager.length - 1; i >= 0; i--) {
            if (this.eManager[i].getDuration() < 1) {
                this.eManager.splice(i, 1)

            }
        }
    }

    /*
    the update method contains code which spawns a new fish and enemy object every set time period,
    runs the despawner method, then calls the update method for each individual fish and enemy using 
    for loops
    */
    update() {
        if ((frameCount % 100) == 0) {
            this.fSpawner(floor(random(0, CANVASX - backgroundAttributes.landWidth)))
        }
        if ((frameCount % 300) == 0) {
            this.eSpawner(floor(random(0, CANVASX -  backgroundAttributes.landWidth)))
        }
        this.despawner()
        for (let i = 0; i < this.fManager.length; i++) {
            this.fManager[i].update()
            //console.log("updatingf")
            //console.log(this.fManager[i].x + "  " + this.fManager[i].y)
            //console.log(this.fManager[i].y)
        }
        for (let i = 0; i < this.eManager.length; i++) {
            let enemy = this.eManager[i]
            enemy.update()
            //console.log("updatinge")
        }
    }
}