/* eslint-disable max-len */
import chai from 'chai';
const expect = chai.expect;
import Round from '../src/Round.js';
import Turn from '../src/Turn.js';
import Game from '../src/Game'

describe('Round', function() {
  let round, survey, game;
  beforeEach(() => {
    game = new Game('Ryan', 'Taylor')
    survey = ['If You Drew Homer Simpson’s Name In A Secret Santa Exchange, What Would You Buy Him?',
      [{ answer: 'Beer', respondents: 67}, { answer: 'Bowling Ball', respondents: 5}, { answer: 'Donuts', respondents: 24}]];
    round = new Round(survey, game);
  });

  it('should be a function', function() {
    expect(Round).to.be.a('function');
  });

  it('should be an instantiation of the Round class', function() {
    expect(round).to.be.an.instanceOf(Round)
  });

  it('shoud be able to take in a survey and store the question', function() {
    expect(round.question).to.equal('If You Drew Homer Simpson’s Name In A Secret Santa Exchange, What Would You Buy Him?')
  })

  it('should have a method to toggle between two numbers', function() {
    expect(round.togglePlayer()).to.equal(1)
    round.turnNumber++
    expect(round.togglePlayer()).to.equal(0)
    round.turnNumber++
    expect(round.togglePlayer()).to.equal(1)
  })

  it('should create a new turn and toggle between two players', function() {
    round.createTurn()
    expect(round.currentTurn.player.name).to.equal('Ryan')
    round.createTurn()
    expect(round.currentTurn.player.name).to.equal('Taylor')
    round.createTurn()
    expect(round.currentTurn.player.name).to.equal('Ryan')
  })

  it('should remove a correct guess from the answer array', function() {
    round.removeAnswer('beer', game.player1)
    expect(round.answers.length).to.equal(2)
  })
});

