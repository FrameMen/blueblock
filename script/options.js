var audio = new Audio('button-15.wav');

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
                  {"class":"l_thanks", "var":"Thanks "},
                    {"class":"l_bodyThanks", "var":"Thank you for plaiying and downloading BlueBlock, we really hope you had like it and you had fun."},
                    {"class":"l_titleAbout","var":"About"},
                    {"class":"l_About","var":"This application is Free Software, released under the terms of the GNU Affero GPL. Get the source on Github."},
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
                    {"class":"l_titleAbout","var":"About"},
                    {"class":"l_About","var":"This application is Free Software, released under the terms of the GNU Affero GPL. Get the source on Github."},
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
                    {"class":"l_bodyThanks", "var":"Wir danken Ihnen für den Download und wünschen Ihnen viel Spaß beim Spielen."},
                    {"class":"l_titleAbout","var":"About"},
                    {"class":"l_About","var":"This application is Free Software, released under the terms of the GNU Affero GPL. Get the source on Github."},
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
                  {"class":"l_bodyThanks", "var":"Un agradecimiento de nosotros los programadores de su contribución para la descarga BlueBlock , tenemos grandes esperanzas de que has disfrutado y nos divertimos."},
                  {"class":"l_titleAbout","var":"About"},
                  {"class":"l_About","var":"This application is Free Software, released under the terms of the GNU Affero GPL. Get the source on Github."},
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
                  {"class":"l_titleAbout","var":"About"},
                  {"class":"l_About","var":"This application is Free Software, released under the terms of the GNU Affero GPL. Get the source on Github."},
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
                      {"class":"l_titleAbout","var":"About"},
                      {"class":"l_About","var":"This application is Free Software, released under the terms of the GNU Affero GPL. Get the source on Github."},
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
