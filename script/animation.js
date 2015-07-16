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
