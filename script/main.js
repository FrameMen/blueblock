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
