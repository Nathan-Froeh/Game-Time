import { userInfo } from "os";
import Player from "./Player";
import SurveyRepo from './SurveyRepo.js';
import Round from './Round.js';

class Game {
  constructor(p1, p2) {
    this.player1 = this.createUser(p1, 1)
    this.player2 = this.createUser(p2, 2)
    this.players = [this.player1, this.player2]
    this.round = 0;
  }

  createUser(player, id) {
    return new Player(player, id)
  }

  createSurveys(Data) {
    return new SurveyRepo(Data)
  }

  createRound(survey) {
    this.round += 1
    return new Round(survey, this)
  }


}

// at end of round 3, game is over

export default Game