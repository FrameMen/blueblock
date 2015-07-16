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
