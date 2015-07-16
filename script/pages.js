function showStart(){
  var setAudio;
  setAudio = $('#audio').text();
  if(setAudio == 'on'){
    mainTheme.currentTime = 0;
    battleTheme.pause();
    gameOverTheme.pause();
    mainTheme.play();
}
  $(".view").hide();
  $(".view-start").show();
  centerContent();
}

function showGame(){
  var setAudio;
  setAudio = $('#audio').text();
  if(setAudio == 'on'){
    battleTheme.currentTime = 5;
    gameOverTheme.pause();
    mainTheme.pause();
    battleTheme.play();
}
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
