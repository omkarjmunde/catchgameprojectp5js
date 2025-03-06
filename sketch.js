/*  
sketch.js file, contains logic for the start, gameplay, and endgame screens,
as well as containing constants used in the rest of the code
*/

//defining constants that are used throughout the rest of the code
const CANVASX = 1024
const CANVASY = 768

//object attributes here to make the code more readable and modular
const fishingRodAttributes = {
  startXPos : CANVASX / 2,
  startYPos : CANVASY / 2,
  width : 50,
  length : 155,
  speed : 15
}

const lineHookAttributes = {
  hookDiameter : 20,
  nodeNum : 15,
  nodeDist : 15,
  gravity : 5
}

const sFishAttributes = {
  width : 15,
  length : 30,
  dropSpeed : 1,
  duration : 800,
  img : 1,
  isCollided : false,
  isActive : false,
  gravity : 0.1,
  speed : 0.02,
  points: 50,
  type : "small fish"
}

const mFishAttributes = {
  width : 30,
  length : 55,
  dropSpeed : 1,
  duration : 800,
  img : 2,
  isCollided : false,
  isActive : false,
  gravity : 0.1,
  speed : 0.01,
  points: 100,
  type : "medium fish"
}

const lFishAttributes = {
  width : 50,
  length : 75,
  dropSpeed : 1,
  duration : 800,
  img : 2,
  isCollided : false,
  isActive : false,
  gravity : 0.1,
  speed : 0.007,
  points: 200,
  type : "large fish"
}

const eFishAttributes = {
  width : 70,
  length : 100,
  dropSpeed : 1,
  duration : 800,
  img : 3,
  isCollided : false,
  isActive : false,
  gravity : 0.1,
  speed : 0.05,
  points: 500,
  type : "epic fish"
}

const battAttributes = {
  width : 30,
  length : 30,
  dropSpeed : 1,
  duration : 900,
  img : 3,
  isCollided : false,
  isActive : false,
  gravity : 0.5,
  damage : 5,
  type : "battery"
}

const canAttributes = {
  width : 20,
  length : 10,
  dropSpeed : 1,
  duration : 900,
  img : 3,
  isCollided : false,
  isActive : false,
  gravity : 0.05,
  damage : 1,
  type : "can"
}

const backgroundAttributes = {
  backgroundColor : 150,
  seaColourRed : 30,
  seaColourGreen : 30,
  seaColourBlue : 100,
  seaColourAlpha : 100,
  skyHeight : 400,
  landWidth : 100,
  landHeight : 15,
  basketXOffset : 50,
  basketYOffset : 0,
  basketWidth : 80,
  basketHeight : 60
}

/*
global variables for defining the objects, leaderboard, and buttons / text boxes
used in the start and end of the game
*/
let fishingRod
let lineHook
let score
let itemManager
let startButton
let globalLeaderboard = []
let endButton
let nameButton
let nameBox
let nameInput = "Player"
let buttonsSetup = false

/*
the setup function contains the creation of the canvas, the creation of the fishingRod, itemManager,
lineHook, and score objects, and runs the startScreen function 
*/
function setup() {
  createCanvas(CANVASX, CANVASY)
  fishingRod = new FishingRod(fishingRodAttributes.startXPos,
    fishingRodAttributes.startYPos,
    fishingRodAttributes.width,
    fishingRodAttributes.length,
    fishingRodAttributes.speed)
  itemManager = new ItemManager()
  lineHook = new LineHook (fishingRodAttributes.startXPos,
    fishingRodAttributes.startYPos,
    lineHookAttributes.hookDiameter,
    lineHookAttributes.nodeNum,
    lineHookAttributes.nodeDist,
    lineHookAttributes.gravity)
  score = new Score()
  this.startScreen()
}

/*
the draw function contains the logic which checks the gameStatus value and calls the appropriate screen
0 for the starting screen, 1 for the gameplay screen, otherwise the end screen
*/
function draw() {
  console.log(score.getGameStatus())
  if (score.getGameStatus() == 0) {
    this.startScreen()
  } else if (score.getGameStatus() == 1) {
    this.gameplay()
  } else {
    this.endGame()
  } 
}

/*
the startScreen function contains the code which displays the start screen, containing a background and a button,
which if pressed, starts the game
*/
function startScreen() {
  background(100)
  text("play game", 400, 600)
  if (!startButton) {
    startButton = createButton("Start Game")
    startButton.size(200, 100)
    startButton.position(CANVASX / 2 - 100, CANVASY / 2 - 50)
    startButton.style("font-size", "24px")

    startButton.mousePressed(() => {
      score.setGameStatus(1)
      startButton.hide()
    })
  }
} 

/*
the gameplay function contains the code which calls the update methods for all the objects and
shows the lives, points, and frame count
*/
function gameplay() {
  gameplayBackground()
  fishingRod.update()
  lineHook.update()
  itemManager.update()
  score.update()
  textSize(20)
  text(frameCount, CANVASX - 30, 20, 50, 20)
  text("Lives:  " + score.getLives(), 20, 20)
  text("Points:  " +   score.getScore(), 400, 20)
}

/*
the endGame function contains the code which clears the background,
shows a 'restart game' button and an input box for the players name,
displays the leaderboard which is sorted from highest to lowest points, 
*/

function endGame() {
  background(100)
  if(!buttonsSetup) {
    if (!endButton) {
      endButton = createButton("Restart Game")
      endButton.size(200, 100)
      endButton.position(CANVASX / 2 - 100, CANVASY / 2 - 50)
      endButton.style("font-size", "24px")
    } else {
      endButton.show()
    }
    if(!nameBox) {
      nameBox = createInput(nameInput)
      nameBox.position(400, 600)
      nameBox.size(200)
    } else {
      nameBox.show()
    }
    if (!nameButton) {
      nameButton = createButton("Input Name")
      nameButton.size(100, 70)
      nameButton.position(CANVASX / 2, 600)
      nameButton.style("font-size", "24px")
    } else {
      nameButton.show()
    }
    buttonsSetup = true
  }

    
    text("Leaderboard", CANVASX / 2 - 50, 100)
    text("Points : " + score.getScore(), CANVASX / 2 - 50, 500)
    globalLeaderboard.sort((a, b) => b.points - a.points)
    for (let i = 0; i < globalLeaderboard.length; i++) {
      text(globalLeaderboard[i].name + ": " + globalLeaderboard[i].points, CANVASX / 2 - 50, 120 + 20 * i)
    }
    nameButton.mousePressed(() => {
      nameInput = nameBox.value()
      console.log("Name entered:", nameInput)
      nameButton.hide()

      globalLeaderboard.push({ name: nameInput, points: score.getScore()})
      globalLeaderboard.sort((a, b) => b.points - a.points)
      background(100)
      for (let i = 0; i < globalLeaderboard.length; i++) {
        text(globalLeaderboard[i].name + ": " + globalLeaderboard[i].points, CANVASX / 2 - 50, 120 + 20 * i)
        console.log(globalLeaderboard[i].name + ": " + globalLeaderboard[i].points)
      }
    })
    
    endButton.mousePressed(() => {
      this.resetGame()
      score.setGameStatus(1)
      endButton.hide()
      nameButton.hide()
      nameBox.hide()
      buttonsSetup = false
    })
}

/*
the gameplayBackground function contains code which sets the background colour, sets the 'sea' colour,
draws a basket and a platform for it
*/
function gameplayBackground() {
  rectMode(CORNER)
  background(backgroundAttributes.backgroundColor)
  fill(backgroundAttributes.seaColourRed,
    backgroundAttributes.seaColourGreen,
    backgroundAttributes.seaColourBlue,
    backgroundAttributes.seaColourAlpha)
  stroke(0, 0, 0, 0)
  rect(0, backgroundAttributes.skyHeight,CANVASX, CANVASY - backgroundAttributes.skyHeight)
  fill(65, 14, 14, 255)
  rect(CANVASX - 40, backgroundAttributes.skyHeight,
    backgroundAttributes.landHeight,
    CANVASY - backgroundAttributes.skyHeight)
  rect(CANVASX - backgroundAttributes.landWidth,
    backgroundAttributes.skyHeight - backgroundAttributes.landHeight,
    backgroundAttributes.landWidth,
    15)
  stroke(0, 0, 0, 255)
  rectMode(CENTER)
  rect(CANVASX - backgroundAttributes.basketXOffset,
    backgroundAttributes.skyHeight - backgroundAttributes.landHeight - (backgroundAttributes.basketHeight / 2) - backgroundAttributes.basketYOffset,
    backgroundAttributes.basketWidth,
    backgroundAttributes.basketHeight)
}

/*
the resetGame function contains code which resets the game by reinitialising the fishing rod,
itemManager, lineHook, and score objects to their original states
*/
function resetGame() {
  fishingRod = new FishingRod(fishingRodAttributes.startXPos,
    fishingRodAttributes.startYPos,
    fishingRodAttributes.width,
    fishingRodAttributes.length,
    fishingRodAttributes.speed)
  itemManager = new ItemManager()
  lineHook = new LineHook (fishingRodAttributes.startXPos,
    fishingRodAttributes.startYPos,
    lineHookAttributes.hookDiameter,
    lineHookAttributes.nodeNum,
    lineHookAttributes.nodeDist,
    lineHookAttributes.gravity)
  score = new Score()
}
