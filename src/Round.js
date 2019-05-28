import Turn from "./Turn";

class Round {
  constructor(survey, game) {
    this.question = survey[0];
    this.answers = this.getAnswers(survey);
    this.scores = this.getScores(survey)
    this.currentGame = game
    this.currentTurn;
    this.turnNumber = 1;
  }

  togglePlayer() {
    return (this.turnNumber + 2) % 2
  }

  createTurn() {
    this.turnNumber++
    this.currentTurn = new Turn(this.currentGame.players[this.togglePlayer()], this)
    return this.currentTurn
  }

  createBlankturn() {
    return new Turn(this.currentGame.players[this.togglePlayer()], this) 
  }

  removeAnswer(guess, player) {
    if (guess !== undefined) {
      let answerIndex = this.answers.indexOf(guess)
      player.updateScore(Number(this.scores.splice(answerIndex, 1)))
      this.answers.splice(answerIndex, 1)

    }
  }

  getAnswers(survey) {
    return survey[1].map(item => item.answer)
  }

  getScores(survey) {
    return survey[1].map(item => item.respondents)
  }
}

export default Round;

// 1 random survey per round
// this.playerTurn should toggle on each guess
// current survey must not match any past surveys used in this game
// if player guesses correct, remove guess form this.possibleAnswers
