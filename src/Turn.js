class Turn {
  constructor(player, round) {
    this.player = player;
    this.round = round;
    this.second = 30;
    this.counter;
    this.currentGuess;
  }

  updateTimer() {
    this.counter = setInterval(() => this.addSecond(), 1000)
  }

  addSecond() {
    this.second--
  }

  resetTimer() {
    this.second = 30
    clearInterval(this.counter)
    this.updateTimer()
  }

  stopTimer() {
    clearInterval(this.counter)
  }

  evaluateGuess(guess) {
    return this.round.answers.find(item => {
      return item.toUpperCase() === guess.toUpperCase()
    })
  }

  updateAnswers() {
    if (this.currentGuess !== undefined) {
      this.round.removeAnswer(this.currentGuess)
    }
  }
}

export default Turn;