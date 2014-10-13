var score = 0;
var time = 30;

$(".js-time").text("Time: " + time);
addTile(randomTile(), "blueTile");

window.setInterval(function(){
  if (time <= 0) {
    $(".js-time").text("Time: " + 0);
    alert("Game Over! Looooooser!");
    start();
  }
  else {
  time--;
  $(".js-time").text("Time: " + time);
  }
}, 1000);

window.setInterval(function(){
 var rand = Math.floor(Math.random()*50);
 if (rand === 13 || rand === 29 || rand === 26) {
  addTile(randomTile(), "greenTile");
 }
 else if (rand < 7){
  addTile(randomTile(), "redTile");
 }
 else
  addTile(randomTile(), "blueTile");

}, 1000);


function removeTile(el) {
  $(el).removeClass("greenTile");
  $(el).removeClass("redTile");
  $(el).removeClass("blueTile");
}

function addTile(index, el) {
  $($(".grid_tile")[index]).addClass(el);
  var test = $(".grid_tile")[index];
  setTimeout(function(){
    $(test).removeClass("redTile");
  }, 3500);
  setTimeout(function(){
    $(test).removeClass("greenTile");
  }, 1500);
}
function start() {
  $(".js-score").text("Score: " + score);
  $(".js-time").text("Time: " + time);
  score = 0;
  time = 30;
  removeTile(".grid_tile");
}

function select(el) {
  if ($(el).hasClass("blueTile")) {
    score++;
    removeTile(el);
    addTile(randomTile(), "blueTile");
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

function randomTile() {
  var rand =  Math.floor(Math.random()*20);
  var el = $(".grid_tile")[rand];
  if($(el).hasClass("redTile") || $(el).hasClass("blueTile") || $(el).hasClass("greenTile"))
    randomTile();
  return rand;
}
