(function($) {
	$.fn.simpleModal =  function(options) {

			var settings = $.extend({
				'type' : 'div',
				'height': '250px',
				'width': '500px',
				'trigger': 'modal',
				'fadeIn': 200,
				'fadeOut': 400,
				'afterFadeIn': null,
				'afterFadeOut': foo,
			}, options);

			var $that = this, iframe, $trigger, $overlay;

			$that.addClass('insideModal');
			$that.css({"height": settings.height,
								"width" : settings.width,
								"top": settings.top
								});

			$trigger = $('[rel*='+ settings.trigger + ']');
			function center(){
			$that.css("left",Math.max(0, (($(window).width() -
																	 $that.outerWidth()) / 2) +
                                   $(window).scrollLeft()) + "px");
			}

			center();

			$(window).on('resize', center);

			$that.hide();

			var foo = function(){
				alert(this.id);
			}

			$overlay = $('<div id="overlay" />');

			$trigger.click(function(){
				if(settings.type !== 'div'){
					iframe = $('<iframe />',{
										src: $(this).attr("href"),
										height: settings.height,
										width: settings.width
										});
					$that.html(iframe);
				}
				$overlay.fadeIn(settings.fadeIn, function(){
					$that.show();
					if(settings.afterFadeIn != null){
						settings.afterFadeIn.call();
					}
				});
				return false;
			});

			$('body').append($overlay);
				$overlay.click(function(){
					$(this).fadeOut(settings.fadeOut,function(){
						$that.hide();
						$that.empty();
						if(settings.afterFadeOut != null){
						settings.afterFadeIn.call();
					}
				});
			});

			$(document).keyup(function(e) {
					if ($overlay.is(':visible') && e.which == 27) {
						$overlay.click();
					}
			});


			return this.each(function(){

			});
	};
})(jQuery);
