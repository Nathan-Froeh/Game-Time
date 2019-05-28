import $ from 'jquery'

var correctBuzzer = document.createElement('audio');
correctBuzzer.setAttribute('src', 'http://www.qwizx.com/gssfx/usa/ff-clang.wav');

var wrongBuzzer = document.createElement('audio');
wrongBuzzer.setAttribute('src', 'http://www.qwizx.com/gssfx/usa/ff-strike.wav');

const DomUpdates = {
  removeFlipClass() {
    $('#answer__one').parent().parent().removeClass('flipped')
    $('#answer__two').parent().parent().removeClass('flipped')
    $('#answer__three').parent().parent().removeClass('flipped')
  },

  checkRoundHighlight(round) {
    if (round.answers.length === 0) {
      $('.p1__box').removeClass('current-player')
      $('.p2__box').removeClass('current-player')
      $('#right-section__change-round-btn').addClass('current-player')
    }
  },

  displayRound(round) {
    $('#question').text(round.question[0].question)
    $('#score__one').text(round.scores[0])
    $('#answer__one').text(round.answers[0])
    $('#score__two').text(round.scores[1])
    $('#answer__two').text(round.answers[1])
    $('#score__three').text(round.scores[2])
    $('#answer__three').text(round.answers[2])
  },

  wrongAnswer() {
    $('h1').prepend("<div id=\"red-x\">X</div>")
    setTimeout(this.removeX, 2000);
    wrongBuzzer.play();
  },

  removeX() {
    $("div").remove("#red-x")
  },

  checkCardFlip() {
    if ($('#submit-form__answer-input').val().toLowerCase() === 
    $('#answer__one').text().toLowerCase()) {
      $('#answer__one').parent().parent().addClass('flipped')
      correctBuzzer.play();
    } else if ($('#submit-form__answer-input').val().toLowerCase() === 
    $('#answer__two').text().toLowerCase()) {
      $('#answer__two').parent().parent().addClass('flipped')
      correctBuzzer.play();
    } else if ($('#submit-form__answer-input').val().toLowerCase() === 
    $('#answer__three').text().toLowerCase()) {
      $('#answer__three').parent().parent().addClass('flipped')
      correctBuzzer.play();
    } else {
      this.wrongAnswer()
    }
  },

  updatePlayerScore(game) {
    $('#score-box__player-1-score').text(game.player1.score)
    $('#score-box__player-2-score').text(game.player2.score)
  },

  hideTimer(index) {
    if (index === 1) {
      $('.timer-1').parent().removeClass('hidden')
      $('.timer-2').parent().addClass('hidden')
    } else {
      $('.timer-2').parent().removeClass('hidden')
      $('.timer-1').parent().addClass('hidden')
    }
  },

  hilightPlayer(turn) {
    if (turn.player.id === 1) {
      $('.p1__box').removeClass('current-player')
      $('.p2__box').addClass('current-player')
      this.hideTimer(2)
    } else {
      $('.p2__box').removeClass('current-player')
      $('.p1__box').addClass('current-player')
      this.hideTimer(1)
    }
  },

  playerNames(name1, name2) {
    $('#score-box__player-1').text(name1)
    $('#score-box__player-2').text(name2)
  },

  displayTimer(turn) {
    $('#timer').text(turn.second)
    $('#timer-2').text(turn.second)
  }
}

export default DomUpdates;