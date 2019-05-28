import chai from 'chai';
const expect = chai.expect;
import Game from '../src/Game.js';
import SurveyRepo from '../src/SurveyRepo.js';
import Round from '../src/Round.js';
import Data from '../Data/Data.js'


describe('Game', function() {
  let game, survey;
  beforeEach(() => {
    survey = ['If You Drew Homer Simpson’s Name In A Secret Santa Exchange, What Would You Buy Him?',
      [{ answer: 'Beer', respondents: 67}, { answer: 'Bowling Ball', respondents: 5}, { answer: 'Donuts', respondents: 24}]];
    game = new Game('Nathan', 'Ryan');
  });

  it('should be a function', function() {
    expect(Game).to.be.a('function');
  });

  it('should be a new instance of game', () => {
    expect(game).to.be.a.instanceOf(Game)
  });

  it('should be instantiated with player1 and player2', () => {
    expect(game.player1).to.deep.equal({ id: 1, name: 'Nathan', score: 0, scores: [], multiplier: 1 })
    expect(game.player2).to.deep.equal({ id: 2, name: 'Ryan', score: 0, scores: [], multiplier: 1 })
  })

  it('should instantiate survey repo', () => {
    expect(game.createSurveys(Data)).to.be.a.instanceOf(SurveyRepo)
  })

  it('should instantiate round', () => {
    expect(game.round).to.equal(0)
    expect(game.createRound(survey)).to.be.a.instanceOf(Round)
    expect(game.round).to.equal(1)
  })

});