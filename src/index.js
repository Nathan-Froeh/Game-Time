
import $ from 'jquery';
import '../src/sass/_variables.scss'
import '../src/sass/_mixins.scss'
import '../src/sass/base.scss'

import Game from '../src/Game.js';
import SurveyRepo from './SurveyRepo';
import Round from './Round'


var correctBuzzer = document.createElement('audio');
correctBuzzer.setAttribute('src', 'http://www.qwizx.com/gssfx/usa/ff-clang.wav');

var wrongBuzzer = document.createElement('audio');
wrongBuzzer.setAttribute('src', 'http://www.qwizx.com/gssfx/usa/ff-strike.wav');

let game, round, survey, turn;

$('.start__game__form').keyup( () => {
  if ($('#player__1').val() && $('#player__2').val()) {
    $('#start__game__btn').prop('disabled', false);
  } else {
    $('#start__game__btn').prop('disabled', true);
  }
})

$('#start__game__btn').on('click', () => {
  event.preventDefault()
  $('.splash__page').fadeOut()
  game = new Game($('#player__1').val(), $('#player__2').val())
  hideTimer(1)
  fetchData()
  turn = round.createBlankturn()
  turn.updateTimer()
  runTimer()
})

function fetchData() {
  fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/family-feud/data')
    .then((response) => {
      if (response.status !== 200) {
        console.log('FETCH ERROR. Status Code: ' + response.status);
        return;
      }
      response.json().then((info) => makeNewSurvey(info.data));
    }
    )
    .catch((err) => console.log('Fetch Error :-S', err));
}

function makeNewSurvey(stuff) {
  survey = game.createSurveys(stuff)
  survey.randomizeSurveys()
  survey.findCurrentSurveyById()
  makeNewRound()
}

function makeNewRound() {
  round = game.createRound(survey.questionAndAnswers, game)
  $('#question').text(round.question[0].question)
  console.log(round.answers)
  $('#score__one').text(round.scores[0])
  $('#answer__one').text(round.answers[0])
  $('#score__two').text(round.scores[1])
  $('#answer__two').text(round.answers[1])
  $('#score__three').text(round.scores[2])
  $('#answer__three').text(round.answers[2])
  makeBlankTurn()
}

function makeBlankTurn() {
  playerNames(game.player1.name, game.player2.name)
  $('.p1__box').addClass('current-player')
  turn = round.createBlankturn()
  turn.updateTimer()
  runTimer()
}

function playerNames(name1, name2) {
  $('#score-box__player-1').text(name1)
  $('#score-box__player-2').text(name2)
}


$('.answer-card').on('click', function() {
  $(this).addClass('flipped')
})


$('.answer-card').on('click', function() {
  $(this).addClass('flipped')
})


$('#submit-form__submit-btn').on('click', function() {
  checkCardFlip()
  if(game.round > 2) {
  	makeBlankTurn()
  } else {
  startTurn()
  }
  $('#submit-form__answer-input').val('');
  checkRoundHighlight()
})

function wrongAnswer() {
  $('h1').prepend("<div id=\"red-x\">X</div>")
  setTimeout(function() {
    $('#red-x').remove()
  }, 2000);
  wrongBuzzer.play();
}


function checkCardFlip() {
  round.answers.find
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
  wrongAnswer()
}

}

$('#score-section__timer').on('DOMSubtreeModified', function() {
  if ($('#timer').text() === '0') {
    turn.resetTimer()
    startTurn()
  }
})


function displayTimer() {
  $('#timer').text(turn.second)
  $('#timer-2').text(turn.second)
}

function runTimer() {
  let counter;
  counter = setInterval(() => displayTimer(), 1000)
}

function startTurn () {
  event.preventDefault()
  turn = round.createTurn()
  turn.resetTimer()
  let guess = turn.evaluateGuess($('#submit-form__answer-input').val())
  round.removeAnswer(guess, turn.player)
  hilightPlayer()
  updatePlayerScore()
}

function hilightPlayer() {
  if (turn.player.id === 1) {
    $('.p1__box').removeClass('current-player')
    $('.p2__box').addClass('current-player')
    hideTimer(2)
  } else {
    $('.p2__box').removeClass('current-player')
    $('.p1__box').addClass('current-player')
    hideTimer(1)
  }
}

function hideTimer(index) {
  if (index === 1) {
    $('.timer-1').parent().removeClass('hidden')
    $('.timer-2').parent().addClass('hidden')
  } else {
    $('.timer-2').parent().removeClass('hidden')
    $('.timer-1').parent().addClass('hidden')
  }
}


function updatePlayerScore() {
  $('#score-box__player-1-score').text(game.player1.score)
  $('#score-box__player-2-score').text(game.player2.score)
}


function changeRound() {
  if ((round.answers.length === 0) && (game.round < 2)) {
    survey.randomizeSurveys()
    survey.findCurrentSurveyById()
    removeFlipClass()
    makeNewRound()
  } else if ((round.answers.length === 0) && (game.round >=  2)) {
    survey.randomizeSurveys()
    survey.findCurrentSurveyById()
    removeFlipClass()
    fastMoneyRound()
  }
}

function fastMoneyRound() {
  round = game.createFastMoney(survey.questionAndAnswers, game)
  $('#question').text(round.question[0].question)
  console.log(round.answers)
  $('#score__one').text(round.scores[0])
  $('#answer__one').text(round.answers[0])
  $('#score__two').text(round.scores[1])
  $('#answer__two').text(round.answers[1])
  $('#score__three').text(round.scores[2])
  $('#answer__three').text(round.answers[2])
  $('#center-section__multiplier-form').removeClass('slideUp').addClass('slideDown')
  makeBlankTurn()
}

$('#right-section__change-round-btn').on('click', function() {
  changeRound()
})

$('#left-section__quit-btn').on('click', function() {
  location.reload()
})

function removeFlipClass() {
  $('#answer__one').parent().parent().removeClass('flipped')
  $('#answer__two').parent().parent().removeClass('flipped')
  $('#answer__three').parent().parent().removeClass('flipped')
  changeRound()
}


function checkRoundHighlight() {
  if (round.answers.length === 0) {
    $('.p1__box').removeClass('current-player')
    $('.p2__box').removeClass('current-player')
    $('#right-section__change-round-btn').addClass('current-player')
  }
}

