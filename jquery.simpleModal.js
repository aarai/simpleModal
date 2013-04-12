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

			var $that = this, iframe, $trigger, $overlay, $closeBtn;

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

			var hide = function(el) {
				el.click(function(e){
						$("#overlay, #close-btn").fadeOut(settings.fadeOut,function(){
							$that.hide();
							$that.empty();
							if(settings.afterFadeOut != null){
							settings.afterFadeIn.call();
						}
					});
					e.preventDefault();
				});
			}

			$overlay = $('<div id="overlay" />');
			$closeBtn = $('<a id="close-btn" href="#">Click</a>');

			$trigger.click(function(){
				if(settings.type !== 'div'){
					iframe = $('<iframe />',{
										src: $(this).attr("href"),
										height: settings.height,
										width: settings.width
										});
					$that.html(iframe);
				}
				$("#overlay, #close-btn").fadeIn(settings.fadeIn, function(){
					$that.show();
					if(settings.afterFadeIn != null){
						settings.afterFadeIn.call();
					}
				});
				$that.prepend($closeBtn);
				return false;
			});

			$('body').append($overlay);
			hide($overlay);	
			hide($closeBtn);

			$(document).keyup(function(e) {
					if ($overlay.is(':visible') && e.which == 27) {
						$overlay.click();
					}
			});


			return this.each(function(){

			});
	};
})(jQuery);
