class Score {
    constructor() {
        this.score = 0
        this.maxScore = 0
        this.lives = 5
        this.gameStatus = 0
    }
    
    getScore() {
        return this.score;
    }

    getMaxScore() {
        return this.maxScore;
    }

    getLives() {
        return this.lives;
    }

    getGameStatus() {
        return this.gameStatus
    }

    setGameStatus(newGameStatus) {
        this.gameStatus = newGameStatus
    }

    incrementScore(newPoints) {
        this.score += newPoints;
    }

    incrementLives(newLives) {
        this.lives += newLives;
    }


    updateMaxScore() {
        if (this.score > this.maxScore) {
            this.maxScore = this.score;
        }
    }

    update() {
        this.updateMaxScore()
        if (this.lives < 1) {
            this.gameStatus = 2
        } 
    }
}
