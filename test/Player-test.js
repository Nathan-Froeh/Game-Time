import chai from 'chai';
const expect = chai.expect;
import Player from '../src/Player.js'

describe('Player', function() {
  let player;
  beforeEach(() => {
    player = new Player('Nathan', 1);
  });
  it('should be a function', function() {
    expect(Player).to.be.a('function');
  });

  it('should be a new instance of Player', () => {
    expect(player).to.be.an.instanceOf(Player)
  })

  it('should be instantiated with an id and name', () => {
    expect(player.id).to.equal(1)
    expect(player.name).to.equal('Nathan')
  })

  it('should start with a score of 0', () => {
    expect(player.score).to.equal(0)
    expect(player.scores).to.eql([])
  })

  it('should have a method that returns the players name', () => {
    expect(player.playerName()).to.equal('Nathan')
  })

  it('should be able to return the players score', () => {
    expect(player.playerScore()).to.equal(0)
  })

  it('should be able to update the players score', function() {
    player.updateScore(36)
    expect(player.score).to.equal(36)
  })
});