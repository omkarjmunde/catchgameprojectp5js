class FishingRod {
  /*
  the construtor initialises the FishingRod object
  */
  constructor(x, y, w, l, speed) {
    this.x = x
    this.y = y
    this.w = w
    this.l = l
    this.speed = speed
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

  /*
  the draw method contains code which draws the fishing rod using a line of stroke weight 5
  */

  draw() {
    strokeWeight(5)
    stroke(0)
    noFill()
    line(this.x, this.y, this.x + this.w, this.y + this.l)
  }

  /*
  the movement method contains code which handles logic by constraining the object within the boundries of the canvas,
  moves the object's position using a vector with a set speed, with WASD or Arrow Keys controls 
  */
  movement() {
    this.x = constrain(this.x, 0, CANVASX - this.w)
    this.y = constrain(this.y, 0, CANVASY - this.l)
    let mvmt = createVector(0, 0)
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
      mvmt.y = -1
    }
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
      mvmt.y = 1
    } 
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
      mvmt.x = -1
    } 
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
      mvmt.x = 1
    } 
    mvmt.setMag(this.speed)
    this.x += mvmt.x
    this.y += mvmt.y
  }

  
  /*
  the update method contains both of the above methods
  */
  update() {
    this.movement()
    this.draw()
  }
}