//var a = new Array();
//for (var x = 0; x <=60; x++) {a[x] = Math.round (1000 - ([1- Math.pow(2.7, (-x/15))] * 800))}

var score;
var time;
var tileInterval;
var timerIndex = 0;
var intervalTime= [1000,949,901,856,814,775,738,703,671,641,613,586,561,538,517,496,477,460,443,427,413,399,386,374,363,353,343,334,325,317,310,303,296,290,284,279,274,269,265,260,257,253,250,246,243,241,238,236,233,231,229,227,226,224,222,221,220,218,217,216,215];

calcLUT();
start();
alert("This game is under heavy development! Therefore, there are still some bugs.");
$(".js-time").text("Time: " + time);
addTile(randomTile(), "blueTile");

window.setInterval(function(){
  if (time <= 0) {
    $(".js-time").text("Time: " + 0);
    gameOver("timeout");
  }
  else {
    time--;
    $(".js-time").text("Time: " + time);
  }

  timerIndex++;
  if (intervalTime[timerIndex] === undefined)
    timerIndex = intervalTime.length - 1;
  clearInterval(tileInterval);
  setTileInterval();
  console.log(intervalTime[timerIndex]);
}, 1000);


function calcLUT() {
var a = new Array();
for (var x = 0; x <=60; x++) {a[x] = Math.round (1000 - ([1- Math.pow(2.7, (-x/5))] * 700))}
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
  $(".js-score").text("Score: " + score);
  $(".js-time").text("Time: " + time);
  alert("Game Over! Your score: " + score + " Reason: " + e);
  start();
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
  timerIndex = 0;
  $(".js-score").text("Score: " + score);
  $(".js-time").text("Time: " + time);
  removeTile(".grid_tile");
}

function select(el) {
  if ($(el).hasClass("blueTile")) {
    score++;
    removeTile(el);
  }
  else if ($(el).hasClass("redTile")) {
    removeTile(el);
    time -= 10;
  }
  else if ($(el).hasClass("greenTile")) {
    removeTile(el);
    score += 5;
    time += 5;
  }
  else {
    time -=2;
  }
  $(".js-score").text("Score: " + score);
  $(".js-time").text("Time: " + time);
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
