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
