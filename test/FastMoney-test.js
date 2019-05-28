import chai from 'chai';
const expect = chai.expect;

import Turn from '../src/Turn';
import Game from '../src/Game'
import Round from '../src/Round'
import FastMoney from '../src/FastMoney'
import Data from '../Data/Data'


describe('FastMoney', function() {
  let game, survey, round, fastMoney, turn;
  beforeEach(() => {
    game = new Game('Ryan', 'Taylor');
    survey = ['If You Drew Homer Simpson’s Name In A Secret Santa Exchange, What Would You Buy Him?',
      [{ answer: 'Beer', respondents: 67}, { answer: 'Bowling Ball', respondents: 5}, { answer: 'Donuts', respondents: 24}]];
    round = new Round(survey, game);
    fastMoney = new FastMoney(survey, game, 3);
    turn = fastMoney.createTurn();
  });

  it('should be a function', function() {
    expect(FastMoney).to.be.a('function')
  });

  it('should be an instance of FastMoney', function() {
    expect(fastMoney).to.be.an.instanceof(FastMoney)
  });

  it('should evaluate the user\'s guesses and compare with the correct answers', function() {
    fastMoney.evaluateGuesses('Donuts', turn);
    expect(fastMoney.player1Guesses.length).to.eql(1);

    fastMoney.evaluateGuesses('Duff', turn);
    expect(fastMoney.player1Guesses.length).to.eql(1);
  });

  it('should evaluate the total score for the fast money round', function() {
    fastMoney.evaluateGuesses('Donuts', turn);
    fastMoney.evaluateGuesses('Beer', turn);

    expect(fastMoney.evaluateScore(fastMoney.player1Guesses)).to.equal(91)
  });

  it.skip('should have a method to apply the user\'s multiplier to the total score', function() {
    fastMoney.multiplyScore(fastMoney.player1Guesses);
    expect(fastMoney.currentGame.player1.score).to.equal(3)
  })
})