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
