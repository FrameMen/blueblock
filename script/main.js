//var a = new Array();
//for (var x = 0; x <=60; x++) {a[x] = Math.round (1000 - ([1- Math.pow(2.7, (-x/15))] * 800))}
//black square &#9632;
//empty square &#9633;
var score;
var mul;
var mulTimeout;
var time;
var timeover;


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

function initL10n() {
  //Default must be the last in array
  var l10nList= [
  {"code": "it", "name": "Italiano"},
  {"code": "de", "name": "Deutsch"},
  {"code": "fr", "name": "Français"},
    {"code": "es", "name": "Español"},
    {"code": "en", "name": "English"},
    {"code": "js", "name": "日本の"}

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
  $(".view").hide();
  $(".view-start").show();
  centerContent();
}

function showGame(){
  $(".view").hide();
  $(".view-game").show();
  centerContent();
  start();
}

function credits(){
  $(".view").hide();
  $(".view-credits").show();
  centerContent();
	addMarquee(".marqueeCredits");
}

function howTo(){
  $(".view").hide();
  $(".view-howTo").show();
  centerContent();
}

function option(){
  $(".view").hide();
  $(".view-option").show();
  centerContent();
}

function showScore(){
  var el = $(".js-rank:first");
  loadScore(el, 0);
  $(".view").hide();
  $(".view-score").show();
  centerContent();
	addMarquee(".marqueeScore");
}

function showGameOver(){
  var i = 0;
  $(".view").hide();
  $(".view-gameover").show();
  centerContent();
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
	removeMarquee(".marquee");
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
    {"code": "l10n_es", "name": "Español"},
    {"code": "l10n_jp", "name": "日本の"}
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
              {"class":"l_nick", "var":"Nickname:"},
                {"class":"l_cred", "var":"Credits"},
                {"class":"l_programmer", "var":"Creators and Developers"},
                  {"class":"l_langProg", "var":"Languages"},
                  {"class":"l_thanks", "var":"Thanks to"},
                    {"class":"l_bodyThanks", "var":"Thank you of we programmers for your help with BlueBlock's download, we really hope you'd like it and you'd have fun."},
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
              {"class":"l_nick", "var":"Soprannome:"},
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
              {"class":"l_nick", "var":"Name:"},
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
              {"class":"l_nick", "var":"Apodo:"},
              {"class":"l_cred", "var":"Créditos"},
                {"class":"l_programmer", "var":"Creadores y Promotores"},
                {"class":"l_langProg", "var":"Lengua"},
                  {"class":"l_thanks", "var":"Agradecimientos"},
                  {"class":"l_bodyThanks", "var":""},
                    {"class":"l_gameOver", "var":"Game Over"},
                    {"class":"l_sc", "var":"Puntuación"},
                      {"class":"l_easy", "var":"Fácil"},
                      {"class":"l_normal", "var":"Normal"},
                        {"class":"l_hard", "var":"Duro"},
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
              {"class":"l_nick", "var":"Surnom:"},
              {"class":"l_cred", "var":"Crédits"},
                {"class":"l_programmer", "var":"Créateurs et Développeurs"},
                {"class":"l_langProg", "var":"Langue"},
                  {"class":"l_thanks", "var":"Remerciements"},
                  {"class":"l_bodyThanks", "var":"Merci de part de nous progammateurs pour votre contribut pour le downolad de BlueBlock, nous ésperons vivement que vous l'avez aimé et que vous vous etes amousé beaucoup."},
                    {"class":"l_gameOver", "var":"Game Over"},
                    {"class":"l_sc", "var":"Score"},
                      {"class":"l_easy", "var":"Simple"},
                      {"class":"l_normal", "var":"Normal"},
                        {"class":"l_hard", "var":"Dur"},
                        {"class":"l_dante", "var":"Dante must die"}
    ],
  "l10n_jp":[
     {"class":"l_play", "var":" プレー"},
    {"class":"l_howTo", "var":"マニュアル"},
    {"class":"l_score", "var":"スコア"},
      {"class":"l_option", "var":"オプション"},
      {"class":"l_credits", "var":"クレジットタイトル"},
        {"class":"l_time", "var":"時間"},
        {"class":"l_scor", "var":"スコア"},
          {"class":"l_game", "var":"ゲーム"},
          {"class":"l_how", "var":"マニュアル"},
            {"class":"l_opt", "var":"オプション"},　　
            {"class":"l_language", "var":"言語"},　　　　
              {"class":"l_violence", "var":"暴力"},　　　
              {"class":"l_nick", "var":"渾名:"},　　　　
                {"class":"l_cred", "var":"クレジットタイトル"},　　　　
                {"class":"l_programmer", "var":"アプリケーションかいはつしゃ"},
                  {"class":"l_langProg", "var":"Linguaggi"},
                  {"class":"l_thanks", "var":"お礼"},
                    {"class":"l_bodyThanks", "var":"BlueBlock をダウンロードしたので、ありがとうございました。 "+
                      "楽しんでいただけましたら幸いです。 "},
                    {"class":"l_gameOver", "var":"ゲームセット"},
                      {"class":"l_sc", "var":"Punteggio"},　
                      {"class":"l_easy", "var":"やさしい"},
                        {"class":"l_normal", "var":"正常"},
                        {"class":"l_hard", "var":" 難しい"},
                          {"class":"l_dante", "var":"ダンテは死ななければならない"}　　

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
    "l10n_jp": ["簡単に", "ノーマル", "ハード", localStorage.nick + " " +"死ぬ"]
  };

  var l10nList= [
  {"code": "l10n_it", "name": "Italiano"},
  {"code": "l10n_de", "name": "Deutsch"},
  {"code": "l10n_fr", "name": "Français"},
    {"code": "l10n_es", "name": "Español"},
    {"code": "l10n_en", "name": "English"},
    {"code": "l10n_jp", "name": "日本の"}
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


function maxMarquee(space) {
	space -= 20;
  	$(".marquee:visible").css({'height': space + "px"})
}


function addMarquee (el) {
	el = $(el);
	el.marquee("init");
  el.on("click", function() {stopClickMarquee(el)});
}

function stopClickMarquee(el) {
	$(el).unbind('click');
  el.marquee('stop');
  el.on("click", function() {startClickMarquee(el)});
}

function startClickMarquee(el) {
	$(el).unbind('click');
  el.marquee('start');
  el.on("click", function() {stopClickMarquee(el)});
}

function removeMarquee (el) {
	$(el).unbind('mouseenter mouseleave');
	$(".marquee:eq(0)").marquee("stop");
	$(".marquee:eq(1)").marquee("stop");
}

//add marquee function to jquery
function addFnMarquee() {
	var methods = {

		init: function() {
			$(".marquee").css('margin-top', 20);
			this.children(":first").css('margin-top', this.height());
			this.marquee('start');
		},

		start: function() {
			var el = this;
			var pixelsPerSecond = 60;
			var firstChild = this.children(':first');
			var contentHeight = $(".content:visible").height();
			var marqueeHeight = this.height();// - firstChild.css("margin-top");
			var currentPoint = parseFloat(firstChild.css("margin-top"), 10);

			// The duration of the animation needed to get the correct speed:
			var duration = ((contentHeight + currentPoint) / pixelsPerSecond) * 1000;

			// Animate the first child's margin-top to -1 * totalHeight:
			firstChild.animate(
					{ 'margin-top': -1 * contentHeight },
					duration,
					'linear',
					function() {
						// Restart whole process... :)
						el.marquee('init');
					}
			);
		},
		stop: function() {
			this.children(':first').stop();
		}
	};

	$.fn.marquee = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.marquee');
        }

    };
}

//Eliminates 300ms click delay on mobile
function removeClickDelay() {
  window.addEventListener('load', function() {
    new FastClick(document.body);
  }, false);
}
