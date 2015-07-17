//var a = new Array();
//for (var x = 0; x <=60; x++) {a[x] = Math.round (1000 - ([1- Math.pow(2.7, (-x/15))] * 800))}
//black square &#9632;
//empty square &#9633;
var score;
var mul;
var mulTimeout;
var time;
var timeover;
var HpBar = $('#HpBar');
addFnMarquee();
removeClickDelay();
init();


function init() {
  //center conntent
  $( window ).resize(function() {centerContent();});
  centerContent();
  addEvents();
  showStart();

  $(".js-nick").val(localStorage.nick);

  if(localStorage.nick === undefined)
    localStorage.nick = " ";

  if (localStorage.difficult == undefined) {
    localStorage.difficult = 1; // 1 = normal
  }
  initL10n();
  setViolence(0);
}

function addTime() {
  var intervalTime = calcLUT();
  var tileTimer;
  var timeInterval = window.setInterval(function(){
    if (gameRunning() === true) {
      if (time <= 0) {
        clearInterval(timeInterval);
        clearInterval(tileTimer);
        gameOver("timeout");
      }
      else {
        HpBar.val(time);
        printStat();
        time--;

        clearInterval(tileTimer);
        tileTimer = setTileInterval(intervalTime[0]);
        if (intervalTime[1] != undefined)
          intervalTime.splice(0, 1);
      }
    }
    else{
      clearInterval(tileTimer);
      clearInterval(timeInterval);
    }

  }, 1000);
}

function gameOver(e) {
  var setAudio;
  setAudio = $('#audio').text();
  if(setAudio == 'on'){
    gameOverTheme.currentTime = 0;
    battleTheme.pause();
    mainTheme.pause();
    gameOverTheme.play();
}
  printStat();
  timeover = true;
  $(".js-OverScore").text(score);
  window.setTimeout(function(){
    showGameOver();
  }, 1000);
}

function removeTile(el) {
  $(el).removeClass("greenTile");
  $(el).removeClass("redTile");
  $(el).removeClass("blueTile");
}

function addTile(index, el) {
  $($(".grid_tile")[index]).addClass(el);
  var test = $(".grid_tile")[index];
  setTimeout(function(){
    if (gameRunning() == true)
      $(test).removeClass("redTile");
  }, 3500);
  setTimeout(function(){
    if (gameRunning() == true)
      $(test).removeClass("greenTile");
  }, 1500);
}

function start() {
  HpBar.val(45);
  score = 0;
  timeover = false;
  time = 45;
  mul = 1;
  mulTimeout = 1;
  printStat();
  addTime();
  removeTile(".grid_tile");
  addTile(randomTile(), "blueTile");
}

function printStat() {
  $(".js-score").text("Score: " + score);
  $(".js-time").text("HP: " + time);
  $(".js-mul").text("x" + mul);
}

function loadScore() {
  if (localStorage.scoreList != undefined) {
    writeScore(".js-rank-0:first", 0, 0, 1);
    writeScore(".js-rank-1:first", 0, 1, 1);
    writeScore(".js-rank-2:first", 0, 2, 1);
    writeScore(".js-rank-3:first", 0, 3, 1);
  }
}
function writeScore(el, i, diff, rank) {
    var list = JSON.parse(localStorage.scoreList);
    for(i; i < list.length && parseInt(list[i].diff) != diff;  i++);
    if (i < list.length && parseInt(list[i].diff) === diff) {
      $(el).text(rank + ". " + list[i].player + ": " + list[i].score);
    if (i + 1 < list.length && $(el).next(".js-rank-" + diff).length > 0) {
      writeScore($(el).next(".js-rank-" + diff), i+1, diff, rank + 1);
    }
    }
}

function addEvents(){
  $(".menu").mouseleave(function (el) {
    changeSquareToEmty(this)
  });
  $(".menu").mouseenter(function (el) {
    changeSquareToBlue(this)
  });
}

function backBtn() {
  time = 0;
	removeMarquee(".marquee");
  showStart();
}
function backBtnGameOver() {
  var game = {"player" : localStorage.nick, "score" : score, "diff": localStorage.difficult}
  pushNewScore(game);
  time = 0;
  backBtn();
}

function setNick() {
  localStorage.nick = $(".js-nick").val();
}

function initScoreList() {
  var list = new Array();
  localStorage.scoreList = JSON.stringify(list);
}

function pushNewScore(game) {
  if (localStorage.scoreList === undefined) {
    initScoreList();
  }
  var list = JSON.parse(localStorage.scoreList);
  var i = 0;
  while (i < list.length && game.score < list[i].score) {
    i++;
  }
  list.splice(i, 0, game);
  localStorage.scoreList = JSON.stringify(list);
}
function restartGame() {
  var game = {"player" : localStorage.nick, "score" : score, "diff": localStorage.difficult}
  pushNewScore(game);
  showGame();
}

function reset(){
  localStorage.clear();
  location.reload();
}

function centerContent() {
  var head = ($(".header").height() > 0) ? $(".header").height() : $(".viewTitle:visible").height();
  var space =  $(window).height() - head - 20;
  maxMarquee(space);
  var top = (space - $(".content:visible").height()) / 2;
  if (top < 20)
    top = 20;
  $(".content:visible").css({'margin-top': top + "px"});
}

//Eliminates 300ms click delay on mobile
function removeClickDelay() {
  window.addEventListener('load', function() {
    new FastClick(document.body);
  }, false);
}
