var mainTheme = new Audio('Introduction.m4a');
mainTheme.loop = true;
var battleTheme = new Audio('The Maze Of Mayonnaise.mp3');
battleTheme.loop = true;
var gameOverTheme = new Audio('Wadanohara GraySnow.mp3');
gameOverTheme.loop = true;


function AudioClick() {
  audio.play();
}

function setAudio(){
  var setAudio;
  setAudio = $('#audio').text();
  if(setAudio == 'off'){
$("#audio").text('on');
}
  if(setAudio == 'on'){
    mainTheme.currentTime = 0;
$('#audio').text('off');
mainTheme.pause();
}
}
