class FishingRod {
    constructor(x, y, w, l, speed) {
      this.x = x
      this.y = y
      this.w = w
      this.l = l
      this.speed = speed
    }

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

    getSpeed() {
      return this.speed
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

    setSpeed(newSpeed) {
      this.speed = newSpeed
    }
  
    draw() {
      strokeWeight(5)
      stroke(0)
      noFill()
      line(this.x, this.y, this.x + this.w, this.y + this.l)
    }
  
    movement() {

      this.x = constrain(this.x, 0, CANVASX - this.w)
      this.y = constrain(this.y, 0, CANVASY - this.l)
      let mvmt = createVector(0, 0)
      if (keyIsDown(87) || keyIsDown(UP_ARROW)) mvmt.y = -1
      if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) mvmt.y = 1
      if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) mvmt.x = -1
      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) mvmt.x = 1
      mvmt.setMag(this.speed)
      this.setX(this.x += mvmt.x)
      this.setY(this.y += mvmt.y)

      //this.x += mvmt.x;
      //this.y += mvmt.y;

    
    }
  
    update() {
      this.movement()
      this.draw()
    }
  }