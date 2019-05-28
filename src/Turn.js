class Turn {
  constructor(player, round) {
    this.player = player;
    this.round = round;
    this.second = 30;
    this.counter;
  }

  updateTimer() {
    this.counter = setInterval(() => this.subtractSecond(), 1000)
  }

  subtractSecond() {
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
}

export default Turn;