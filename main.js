//var a = new Array();
//for (var x = 0; x <=60; x++) {a[x] = Math.round (1000 - ([1- Math.pow(2.7, (-x/15))] * 800))}
//black square &#9632;
//empty square &#9633;
var score;
var mul;
var mulTimeout;
var time;
var timeInterval;
var tileInterval;
var timerIndex = 0;
var intervalTime= [1000,949,901,856,814,775,738,703,671,641,613,586,561,538,517,496,477,460,443,427,413,399,386,374,363,353,343,334,325,317,310,303,296,290,284,279,274,269,265,260,257,253,250,246,243,241,238,236,233,231,229,227,226,224,222,221,220,218,217,216,215];


calcLUT();
addEvents();
showStart();
nick();
language();
violence();
alert("This game is under heavy development! Therefore, there are still some bugs.");

//start();

function addTime() {
  timeInterval = window.setInterval(function(){
    if (time <= 0) {
      gameOver("timeout");
    }
    else {
      printStat();
      time--;
    }

    timerIndex++;
    if (intervalTime[timerIndex] === undefined)
      timerIndex = intervalTime.length - 1;
    clearInterval(tileInterval);
    setTileInterval();
  }, 1000);
}


function calcLUT() {
  var a = new Array();
  for (var x = 0; x <=60; x++) {a[x] = Math.round (1000 - ([1- Math.pow(2.7, (-x/5))] * 775))}
  intervalTime = a;
}

function setTileInterval() {
  tileInterval = window.setInterval(function(){
    var rand = Math.floor(Math.random()*50);
    if (rand === 13 || rand === 29 || rand === 26) {
      addTile(randomTile(), "greenTile");
    }
    else if (rand < 7){
      addTile(randomTile(), "redTile");
    }
    else{
      addTile(randomTile(), "blueTile");
    }

  }, intervalTime[timerIndex]);

}


function gameOver(e) {
  time = 0;
  printStat();
  //alert("Game Over! Your score: " + score + " Reason: " + e);
  var game = {"player" : "julian", "score" : score}
  pushNewScore(game);
  clearInterval(tileInterval);
  clearInterval(timeInterval);
  showGameOver();
  //start();
}

function removeTile(el) {
  $(el).removeClass("greenTile");
  $(el).removeClass("redTile");
  $(el).removeClass("blueTile");
}

function addTile(index, el) {
  if (isGridFull() === false) {
    $($(".grid_tile")[index]).addClass(el);
    var test = $(".grid_tile")[index];
    setTimeout(function(){
      $(test).removeClass("redTile");
    }, 3500);
    setTimeout(function(){
      $(test).removeClass("greenTile");
    }, 1500);
  }
  else
    gameOver("full");
}

function start() {
  score = 0;
  time = 60;
  mul = 1;
  mulTimeout = 1;
  timerIndex = 0;
  printStat();
  clearInterval(timeInterval);
  addTime();
  removeTile(".grid_tile");
  addTile(randomTile(), "blueTile");
}

function printStat() {
  $(".js-score").text("Score: " + score);
  $(".js-time").text("Time: " + time);
  $(".js-mul").text("x" + mul);
}

function select(el) {
  if ($(el).hasClass("blueTile")) {
    score += 1*mul;
    mulTimeout++;
    removeTile(el);
  }
  else if ($(el).hasClass("redTile")) {
    mulTimeout = 0;
    mul = 1;
    removeTile(el);
    time -= 10;
  }
  else if ($(el).hasClass("greenTile")) {
    removeTile(el);
    mulTimeout++;
    score += 5 * mul;
    time += 5;
  }
  else {
    mulTimeout = 0;
    mul = 1;
    time -=2;
  }
  printStat();
  if (mulTimeout > 20) {
    mulTimeout = 0;
    mul *=2;
  }
}

function isGridFull() {
  if ($(".grid_tile:not(.blueTile)").length <= 1)
    return true;
  if ($(".grid_tile:not(.greenTile)").length <= 1)
    return true;
  if ($(".grid_tile:not(.blueTile)").length <= 1)
    return true;
  return false;
}

function randomTile() {
  var rand =  Math.floor(Math.random()*20);
  var el = $(".grid_tile")[rand];
  if($(el).hasClass("redTile") || $(el).hasClass("blueTile") || $(el).hasClass("greenTile"))
    rand = randomTile();
  return rand;
}

function showStart(){
  $(".view-start").show();
  $(".view-game").hide();
  $(".view-howTo").hide();
  $(".view-option").hide();
  $(".view-credits").hide();
  $(".view-gameover").hide();
  $(".view-score").hide();
}

function showGame(){
  falling();
  $(".view-start").hide();
  $(".view-game").show();
  $(".view-howTo").hide();
  $(".view-option").hide();
  $(".view-credits").hide();
  $(".view-gameover").hide();
  $(".view-score").hide();
  start();
}

function credits(){
  falling();
  $(".view-start").hide();
  $(".view-game").hide();
  $(".view-howTo").hide();
  $(".view-option").hide();
  $(".view-credits").show();
  $(".view-gameover").hide();
  $(".view-score").hide();
}

function howTo(){
  falling();
  $(".view-start").hide();
  $(".view-game").hide();
  $(".view-option").hide();
  $(".view-howTo").show();
  $(".view-credits").hide();
  $(".view-gameover").hide();
  $(".view-score").hide();
}

function option(){
  falling();
  $(".view-start").hide();
  $(".view-game").hide();
  $(".view-option").show();
  $(".view-howTo").hide();
  $(".view-credits").hide();
  $(".view-gameover").hide();
  $(".view-score").hide();
}

function score(){
  $(".view-start").hide();
  $(".view-game").hide();
  $(".view-option").hide();
  $(".view-howTo").hide();
  $(".view-credits").hide();
  $(".view-gameover").hide();
  $(".view-score").show();
}

function showGameOver(){
  var i = 0;
  var el = $(".js-rank:first");
  loadScore(el, i);
  $(".view-start").hide();
  $(".view-game").hide();
  $(".view-option").hide();
  $(".view-howTo").hide();
  $(".view-credits").hide();
  $(".view-gameover").show();
  $(".view-score").hide();
}

function loadScore(el, i) {
  var list = JSON.parse(localStorage.scoreList);
  $(el).text((i+1) + ". " + list[i].score);
  if (i + 1 < list.length) {
  console.log(el);
    loadScore($(el).next(".js-rank"), i+1);
  }
}

function changeSquareToBlue(el){
  //black square &#9632;
  //empty square &#9633;
  $(el).find(".js-square").html("&#9632;").css('color', 'blue');
}

function changeSquareToEmty(el){
  //black square &#9632;
  //empty square &#9633;
  $(el).find(".js-square").html("&#9633;").css('color', 'blue');
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
  showStart();
}

function calcLUT() {
  var a = new Array();
  for (var x = 0; x <=60; x++) {a[x] = Math.round (1000 - ([1- Math.pow(2.7, (-x/5))] * 775))}
  intervalTime = a;
}
function nick() {
  var a = new Array();
}

function language() {
  var l10n = {
    "l10n_en":[
     {"class":"l_play", "var":"play"},
     {"class":"l_howTo", "var":"how-to"},
     {"class":"l_score", "var":"score"},
     {"class":"l_option", "var":"option"},
     {"class":"l_credits", "var":"credits"},
     {"class":"l_time", "var":"Time"},
     {"class":"l_scor", "var":"Score"},
     {"class":"l_how", "var":"How-To"},
     {"class":"l_opt", "var":"Option"},
     {"class":"l_language", "var":"Language"},
     {"class":"l_violence", "var":"Violence"},
     {"class":"l_nick", "var":"Nickname"},
     {"class":"l_cred", "var":"Credis"},
     {"class":"l_programmer", "var":"Creators and Developers"},
     {"class":"l_langProg", "var":"Languages"},
     {"class":"l_thanks", "var":""},
     {"class":"l_bodyThanks", "var":""},
     {"class":"l_gameOver", "var":"Game Over"},
     {"class":"l_sc", "var":"Score"}
    ],

    "l10n_it":[
     {"class":"l_play", "var":"gioca"},
     {"class":"l_howTo", "var":"manuale"},
     {"class":"l_score", "var":"punteggio"},
     {"class":"l_option", "var":"opzioni"},
     {"class":"l_credits", "var":"crediti"},
     {"class":"l_time", "var":"Tempo"},
     {"class":"l_score", "var":"Punteggio"},
     {"class":"l_how", "var":"Manuale"},
     {"class":"l_opt", "var":"Opzioni"},
     {"class":"l_language", "var":"Lingua"},
     {"class":"l_violence", "var":"Violenza"},
     {"class":"l_nick", "var":"Soprannome"},
     {"class":"l_cred", "var":"Crediti"},
     {"class":"l_programmer", "var":"Creatori e Sviluppartori"},
     {"class":"l_langProg", "var":"Linguaggi"},
     {"class":"l_thanks", "var":"Ringraziamenti"},
     {"class":"l_bodyThanks", "var":"Un ringraziamento da noi programmatori
                                     del vostro contributo per il download di
                                     BlueBlock, speriamo vivameente che vi sia
                                     piaciuto e vi siate divertiti."},
     {"class":"l_gameOver", "var":"Game Over"},
     {"class":"l_sc", "var":"Punteggio"}
    ],

    "l10n_de":[
     {"class":"l_play", "var":""},
     {"class":"l_howTo", "var":""},
     {"class":"l_score", "var":""},
     {"class":"l_option", "var":""},
     {"class":"l_credits", "var":""},
     {"class":"l_time", "var":""},
     {"class":"l_score", "var":""},
     {"class":"l_how", "var":""},
     {"class":"l_opt", "var":""},
     {"class":"l_language", "var":""},
     {"class":"l_violence", "var":""},
     {"class":"l_nick", "var":""},
     {"class":"l_cred", "var":""},
     {"class":"l_programmer", "var":""},
     {"class":"l_langProg", "var":""},
     {"class":"l_thanks", "var":""},
     {"class":"l_bodyThanks", "var":""},
     {"class":"l_gameOver", "var":"Game Over"},
     {"class":"l_sc", "var":""}
    ],

    "l10n_sp":[
     {"class":"l_play", "var":""},
     {"class":"l_howTo", "var":""},
     {"class":"l_score", "var":""},
     {"class":"l_option", "var":""},
     {"class":"l_credits", "var":""},
     {"class":"l_time", "var":""},
     {"class":"l_score", "var":""},
     {"class":"l_how", "var":""},
     {"class":"l_opt", "var":""},
     {"class":"l_language", "var":""},
     {"class":"l_violence", "var":""},
     {"class":"l_nick", "var":""},
     {"class":"l_cred", "var":""},
     {"class":"l_programmer", "var":""},
     {"class":"l_langProg", "var":""},
     {"class":"l_thanks", "var":""},
     {"class":"l_bodyThanks", "var":""},
     {"class":"l_gameOver", "var":"Game Over"},
     {"class":"l_sc", "var":""}
    ],

    "l10n_fr":[
     {"class":"l_play", "var":""},
     {"class":"l_howTo", "var":""},
     {"class":"l_score", "var":""},
     {"class":"l_option", "var":""},
     {"class":"l_credits", "var":""},
     {"class":"l_time", "var":""},
     {"class":"l_score", "var":""},
     {"class":"l_how", "var":""},
     {"class":"l_opt", "var":""},
     {"class":"l_language", "var":""},
     {"class":"l_violence", "var":""},
     {"class":"l_nick", "var":""},
     {"class":"l_cred", "var":""},
     {"class":"l_programmer", "var":""},
     {"class":"l_langProg", "var":""},
     {"class":"l_thanks", "var":""},
     {"class":"l_bodyThanks", "var":""},
     {"class":"l_gameOver", "var":"Game Over"},
     {"class":"l_sc", "var":""}
    ]
    }
}

function violence() {

}

function falling(){
  //$( ".menu" ).click(function() {
var el = $( ".menu" );
while(el.lenght === 0){

$( ".menu" ).animate({
top:'1000px'
}, 1500,
function(){} )
el=$(el).next();
//});
 }
}

function testScoreList() {
  var game = {"player" : "julian", "score" : 150}
  pushNewScore(game);
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
  console.log(list);

  list[list.length] = game;
  localStorage.scoreList = JSON.stringify(list);
}
