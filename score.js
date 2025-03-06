class Score {
    /*
    the construtor initialises the score object with a score of 0, 5 lives, and gameStatus 0
    */
    constructor() {
        this.score = 0
        this.lives = 5
        this.gameStatus = 0
    }
    
    /*
    the getter and setter methods which are responsible for manipulating the data in the 
    attributes
    */
    getScore() {
        return this.score
    }

    getLives() {
        return this.lives
    }

    getGameStatus() {
        return this.gameStatus
    }

    setGameStatus(newGameStatus) {
        this.gameStatus = newGameStatus
    }

    incrementScore(newPoints) {
        this.score += newPoints
    }

    incrementLives(newLives) {
        this.lives += newLives
    }

    /*
    the update method which checks if lives is below 1, and if yes, 
    sets the gameStatus to 2
    */

    update() {
        if (this.lives < 1) {
            this.gameStatus = 2
        } 
    }
}
