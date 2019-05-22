import chai from 'chai';
const expect = chai.expect;
import Turn from '../src/Turn';
import Round from '../src/Round';
import Game from '../src/Game'
// import Player from '../src/Player';

describe('Turn', function() {
  let turn, round, survey, game;
  beforeEach(function() {
    game = new Game('Ryan', 'Nathan')
    survey = ['If You Drew Homer Simpson’s Name In A Secret Santa Exchange, What Would You Buy Him?',
      [{ answer: 'Beer', respondents: 67}, { answer: 'Bowling Ball', respondents: 5}, { answer: 'Donuts', respondents: 24}]];
    round = new Round(survey);
    turn = new Turn(game.player1, round)
  })

  it('should be a function', function() {
    expect(Turn).to.be.a('function')
  })

  it('should be an instantiation of the Turn class', function() {
    expect(turn).to.be.an.instanceOf(Turn)
  })

  it('should be able to take a player object as an argument', function() {
    expect(turn.player).to.equal(game.player1)
  })
  
  it('should have a method that evaluates a players guess', function() {
    turn.evaluateGuess('bowling ball')
    expect(turn.currentGuess).to.deep.equal({ answer: 'Bowling Ball', respondents: 5})
    turn.evaluateGuess('beer')
    expect(turn.currentGuess).to.deep.equal({ answer: 'Beer', respondents: 67})
    turn.evaluateGuess('ryan')
    expect(turn.currentGuess).to.equal(undefined)
  })

  it('should not be able to guess a correct answer already guessed', function() {
    turn.evaluateGuess('beer')
    turn.updateAnswers()
    expect(round.answers.length).to.equal(2)
    turn.evaluateGuess('ryan')
    turn.updateAnswers()
    expect(round.answers.length).to.equal(2)
  })
})