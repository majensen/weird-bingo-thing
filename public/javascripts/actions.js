var data = require('./data')
var gifs = require('./gifs')
var _= require('lodash')
var card = {
  winner: 0,
  board: [[],[],[],[],[]]
};
//init the page
var bingo=['B','I','N','G','O'];
$(function () {
  new_card()
  $("td")
    .click( toggle_square )
  $("#N3")
    .addClass('free')
    .text('FREE')
    .off('click')
  $("#new-card").click(new_card)
  $("#clear-board").click(clear_board)
})

function clear_board() {
  for (let i=0; i<5;i++) {
    _.fill(card.board[i],0,0,5)
  }
  card.board[2][2] = 1
  card.winner=0
  $("td")
    .removeClass('cover')
  $("#N3").get(0).innerHTML = "FREE"
}

function new_card() {
  let c = get_card()
  for (let id in c) {
    $(`#${id}`).text(c[id])
  }
  clear_board()
}

function toggle_square () {
  if (card.winner) {
    $("#N3").text("Please click 'New Card' or 'Clear Board' above")
    return
  }
  else if ($(this).hasClass('cover')) {
    $(this)
      .removeClass('cover')
      .each( function () {
        let c = _.split($(this).attr("id"),'')
        let x = _.findIndex(bingo, function (t) { return t == c[0] })
        let y = _.toInteger(c[1])-1
        card.board[x][y] = 0
      })
  } else {
    $(this)
      .addClass('cover')
      .each( function () {
        let c = _.split($(this).attr("id"),'')
        let x = _.findIndex(bingo, function (t) { return t == c[0] })
        let y = _.toInteger(c[1])-1
        card.board[x][y] = 1
      })
  }
  check_bingo()
}

function check_bingo() {
  let winner = 0
  for (let i = 0; i<5; i++) {
    if (_.sum( card.board[i] ) == 5) {
      winner = 1
    }
  }
  if (!winner) {
    for (let i = 0; i<5; i++) {
      if (_.sum( _.map( card.board, function (a) { return a[i] }) ) == 5) {
        winner = 1
      }
    }
  }
  if (!winner) {
    if (_.sum( _.map( [0,1,2,3,4], function (n) { return card.board[n][n] }) ) == 5) {
      winner = 1;
    }
    if (_.sum( _.map( [0,1,2,3,4], function (n) { return card.board[4-n][n] }) ) == 5) {
      winner = 1;
    }
  }
  if (winner) {
    $("#N3").get(0)
      .innerHTML=gifs.gifs[ _.toInteger(Math.random()*gifs.gifs.length)]
    card.winner=1;
    console.log("BINGO!!!");
  }
  else {
    $("#N3").get(0)
      .innerHTML = "FREE"
  }
}

function get_card() {
  let i = Math.floor(data.cards.length * Math.random())
  return data.cards[i]
}
