//var a = new Array();
//for (var x = 0; x <=60; x++) {a[x] = Math.round (1000 - ([1- Math.pow(2.7, (-x/15))] * 800))}
//black square &#9632;
//empty square &#9633;
var score;
var mul;
var mulTimeout;
var time;
var timeover;

init();
alert("This game is under heavy development! Therefore, there are still some bugs.");

function init() {
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

function initL10n() {
  //Default must be the last in array
  var l10nList= [
  {"code": "it", "name": "Italiano"},
  {"code": "de", "name": "Deutsch"},
  {"code": "fr", "name": "Français"},
    {"code": "es", "name": "Español"},
    {"code": "en", "name": "English"}
  ];
  if (localStorage.l10n == undefined || localStorage.l10n == ""){
    for (var i = 0; l10nList[i].code != navigator.language.slice(0, 2) && i < l10nList.length; i++);
    localStorage.l10n = l10nList[i].name;
  }
  $("#lan").text(localStorage.l10n);
  setL10n(0);
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

function gameRunning() {
  if ($(".view-game").is(":visible") && timeover === false)
    return true;
  return false;
}

function calcLUT() {
  var diffValue = [675, 775, 875, 975];
  var index = diffValue[localStorage.difficult];
  var a = new Array();
  for (var x = 0; x <=45; x++) {
    a[x] = Math.round (1000 - ([1- Math.pow(2.7, (-x/5))] * index))
  }
  return a;
}

function setTileInterval(timeout) {
  return window.setInterval(function(){
    if (isGridFull() === false) {
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
    }
    else {
      gameOver("full");
      timeover = true;
    }
  }, timeout);
}


function gameOver(e) {
  printStat();
  timeover = true;
  window.setTimeout(function(){
    showGameOver();
  }, 3000);
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
  $(".js-time").text("Time: " + time);
  $(".js-mul").text("x" + mul);
}

function select(el) {
  if (gameRunning() == true) {
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
    if ( time < 0 )
      time = 0;
    printStat();
    if (mul < 8 && mulTimeout > 20) {
      mulTimeout = 0;
      mul *=2;
    }
  }
}

function isGridFull() {
  if ($(".grid_tile:not(.blueTile):not(.greenTile):not(.redTile)").length < 1)
    return true;
  else
    return false;
}

function randomTile() {
  var rand =  Math.floor(Math.random()*($(".grid_tile").length));
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
  $(".view-start").hide();
  $(".view-game").hide();
  $(".view-howTo").hide();
  $(".view-option").hide();
  $(".view-credits").show();
  $(".view-gameover").hide();
  $(".view-score").hide();
}

function howTo(){
  $(".view-start").hide();
  $(".view-game").hide();
  $(".view-option").hide();
  $(".view-howTo").show();
  $(".view-credits").hide();
  $(".view-gameover").hide();
  $(".view-score").hide();
}

function option(){
  $(".view-start").hide();
  $(".view-game").hide();
  $(".view-option").show();
  $(".view-howTo").hide();
  $(".view-credits").hide();
  $(".view-gameover").hide();
  $(".view-score").hide();
}

function showScore(){
  var el = $(".js-rank:first");
  loadScore(el, 0);
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
  $(".view-start").hide();
  $(".view-game").hide();
  $(".view-option").hide();
  $(".view-howTo").hide();
  $(".view-credits").hide();
  $(".view-gameover").show();
  $(".view-score").hide();
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
  time = 0;
  showStart();
}
function backBtnGameOver() {
  var game = {"player" : localStorage.nick, "score" : score, "diff": localStorage.difficult}
  pushNewScore(game);
  time = 0;
  backBtn();
}


function setL10n(next) {

  //document.querySelector('#lan').innerHTML = lan[x];
  //$("#lan").text(localStorage.l10n));
  var selectL10n;
  var l10nList= [
  {"code": "l10n_en", "name": "English"},
  {"code": "l10n_it", "name": "Italiano"},
  {"code": "l10n_de", "name": "Deutsch"},
    {"code": "l10n_fr", "name": "Français"},
    {"code": "l10n_es", "name": "Español"}
  ];
  var l10n = {
    "l10n_en":[
    {"class":"l_play", "var":"play"},
    {"class":"l_howTo", "var":"how-to"},
    {"class":"l_score", "var":"score"},
      {"class":"l_option", "var":"option"},
      {"class":"l_credits", "var":"credits"},
        {"class":"l_time", "var":"Time"},
        {"class":"l_scor", "var":"Score"},
          {"class":"l_game", "var":"Game"},
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
                      {"class":"l_sc", "var":"Score"},
                      {"class":"l_easy", "var":"Easy"},
                        {"class":"l_normal", "var":"Normal"},
                        {"class":"l_hard", "var":"Hard"},
                          {"class":"l_dante", "var":"Dante must die"}
    ],

    "l10n_it":[
    {"class":"l_play", "var":"gioca"},
    {"class":"l_howTo", "var":"manuale"},
    {"class":"l_score", "var":"punteggio"},
      {"class":"l_option", "var":"opzioni"},
      {"class":"l_credits", "var":"crediti"},
        {"class":"l_time", "var":"Tempo"},
        {"class":"l_scor", "var":"Punteggio"},
          {"class":"l_game", "var":"Partita"},
          {"class":"l_how", "var":"Manuale"},
            {"class":"l_opt", "var":"Opzioni"},
            {"class":"l_language", "var":"Lingua"},
              {"class":"l_violence", "var":"Violenza"},
              {"class":"l_nick", "var":"Soprannome"},
                {"class":"l_cred", "var":"Crediti"},
                {"class":"l_programmer", "var":"Creatori e Sviluppartori"},
                  {"class":"l_langProg", "var":"Linguaggi"},
                  {"class":"l_thanks", "var":"Ringraziamenti"},
                    {"class":"l_bodyThanks", "var":"Un ringraziamento da noi programmatori "+
                      "del vostro contributo per il download di "+
                        "BlueBlock, speriamo vivamente che vi sia "+
                        "piaciuto e vi siate divertiti."},
                    {"class":"l_gameOver", "var":"Game Over"},
                      {"class":"l_sc", "var":"Punteggio"},
                      {"class":"l_easy", "var":"Facile"},
                        {"class":"l_normal", "var":"Normale"},
                        {"class":"l_hard", "var":"Difficile"},
                          {"class":"l_dante", "var":"Dante must die"}
    ],

    "l10n_de":[
    {"class":"l_play", "var":"spielen"},
    {"class":"l_howTo", "var":"anleitung"},
    {"class":"l_score", "var":"punkte"},
      {"class":"l_option", "var":"option"},
      {"class":"l_credits", "var":"credits"},
        {"class":"l_time", "var":"Zeit"},
        {"class":"l_scor", "var":"Punkte"},
          {"class":"l_how", "var":"Spiel"},
          {"class":"l_how", "var":"Anleitung"},
            {"class":"l_opt", "var":"Option"},
            {"class":"l_language", "var":"Sprache"},
              {"class":"l_violence", "var":"Schwierigkeit"},
              {"class":"l_nick", "var":"Name"},
                {"class":"l_cred", "var":"Credits"},
                {"class":"l_programmer", "var":"Kreative und Entwickler"},
                  {"class":"l_langProg", "var":"Programmier Sprachen"},
                  {"class":"l_thanks", "var":"Danksagungen"},
                    {"class":"l_bodyThanks", "var":""},
                    {"class":"l_gameOver", "var":"Game Over"},
                      {"class":"l_sc", "var":"Punkte"},
                      {"class":"l_easy", "var":"Einfach"},
                        {"class":"l_normal", "var":"Normal"},
                        {"class":"l_hard", "var":"Schwierig"},
                          {"class":"l_dante", "var":"Dante must die"}
    ],

    "l10n_es":[
    {"class":"l_play", "var":"jugar"},
    {"class":"l_howTo", "var":"cómo-a"},
    {"class":"l_score", "var":"puntuación"},
      {"class":"l_option", "var":"opción"},
      {"class":"l_credits", "var":"créditos"},
        {"class":"l_time", "var":"Tiempo"},
        {"class":"l_scor", "var":"Puntuación"},
          {"class":"l_how", "var":"Cómo-a"},
          {"class":"l_opt", "var":"Opción"},
            {"class":"l_language", "var":"Lengua"},
            {"class":"l_violence", "var":"Violencia"},
              {"class":"l_nick", "var":"Apodo"},
              {"class":"l_cred", "var":"Créditos"},
                {"class":"l_programmer", "var":"Creadores y Promotores"},
                {"class":"l_langProg", "var":"Lengua"},
                  {"class":"l_thanks", "var":""},
                  {"class":"l_bodyThanks", "var":""},
                    {"class":"l_gameOver", "var":"Game Over"},
                    {"class":"l_sc", "var":"Puntuación"},
                      {"class":"l_easy", "var":""},
                      {"class":"l_normal", "var":""},
                        {"class":"l_hard", "var":""},
                        {"class":"l_dante", "var":"Dante must die"}
    ],

    "l10n_fr":[
    {"class":"l_play", "var":"jouer"},
    {"class":"l_howTo", "var":"comment faire"},
    {"class":"l_score", "var":"score"},
      {"class":"l_option", "var":"option"},
      {"class":"l_credits", "var":"crédits"},
        {"class":"l_time", "var":"Temps"},
        {"class":"l_scor", "var":"Score"},
          {"class":"l_how", "var":"Comment Faire"},
          {"class":"l_opt", "var":"Option"},
            {"class":"l_language", "var":"Langue"},
            {"class":"l_violence", "var":"Violence"},
              {"class":"l_nick", "var":"Surnom"},
              {"class":"l_cred", "var":"Crédits"},
                {"class":"l_programmer", "var":"Créateurs et Développeurs"},
                {"class":"l_langProg", "var":"Langue"},
                  {"class":"l_thanks", "var":""},
                  {"class":"l_bodyThanks", "var":""},
                    {"class":"l_gameOver", "var":"Game Over"},
                    {"class":"l_sc", "var":"Score"},
                      {"class":"l_easy", "var":""},
                      {"class":"l_normal", "var":""},
                        {"class":"l_hard", "var":""},
                        {"class":"l_dante", "var":"Dante must die"}
    ]
  }

  if (localStorage.l10n != undefined) {
    for (var i = 0; l10nList[i].name != localStorage.l10n && i < l10nList.length; i++);
    var selectedL10n = l10nList[i+next];
    if (selectedL10n === undefined && next > 0)
      selectedL10n = l10nList[0];
    if (selectedL10n === undefined && next < 0)
      selectedL10n = l10nList[l10nList.length - 1];

    localStorage.l10n = selectedL10n.name;
    var l10nString = l10n[selectedL10n.code];
    $("#lan").text(localStorage.l10n);
    for(var i = 0; i < l10nString.length; i++)
      $("."+l10nString[i].class).text(l10nString[i].var);
    setViolence(0);
  }
  else
    console.log("Lang error");
}

function falling(callback, el){
  if(el=== undefined)
    var el = $( ".menu:last" );
  $( el ).animate({
    top:window.innerHeight
  }, 500,
  function(){
    //showgame()
    if($(this)[0].className === $(".menu:first")[0].className )
    {
      callback();
      $( ".menu" ).css({
        top:"0px"
      }
      )
    }
  } );
  if($(el).prev(".menu").length > 0){
    setTimeout(function(){

      falling(callback, $(el).prev(".menu"));


    }, 50); /*delay between elements falling*/


  }

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

function setViolence(next){

  var vioL10n = {
    "l10n_en": ["Easy", "Normal", "Hard", localStorage.nick + " " +"must die"],
    "l10n_it": ["Facile", "Normale", "Difficile", localStorage.nick + " " +"deve morire"],
    "l10n_de": ["Einfach", "Normal", "Schwierig", localStorage.nick + " " +"must die"],
    "l10n_fr": ["Easy", "Normal", "Hard", localStorage.nick + " " +"must die"],
    "l10n_es": ["Easy", "Normal", "Hard", localStorage.nick + " " +"must die"],
  };

  var l10nList= [
  {"code": "l10n_it", "name": "Italiano"},
  {"code": "l10n_de", "name": "Deutsch"},
  {"code": "l10n_fr", "name": "Français"},
    {"code": "l10n_es", "name": "Español"},
    {"code": "l10n_en", "name": "English"}
  ];
  //
  //lang select
  var lang = "l10n_en";
  for (var i = 0; i < l10nList.length && l10nList[i].name != localStorage.l10n; i++);
  lang = l10nList[i].code;

  var diffLength = vioL10n[lang].length;
  if (localStorage.difficult != undefined) {


    var index = parseInt(localStorage.difficult) + next;
    if (index > diffLength - 1)
      index = 0;
    else if (index < 0)
      index = diffLength - 1;
    localStorage.difficult = index;

    $('.js-violence').text(vioL10n[lang][index]);
  }
  else
    console.log("Violence error");
}
//marquee

function maqueeMouseOut(el){
  el.start();
}
function maqueeMouseIn(el){
  el.stop();
}
