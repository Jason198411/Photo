//plugin e-search.js by Eduardo Torres, for more documentation visit: https://github.com/edukni/Search-input-jquery-plugin


(function($){
    $.fn.extend({
        search: function(callback,timeout){
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                search = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i,el){
                var $el = $(el);
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $el.is(':input') && $el.on('keyup keypress paste',function(e){
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too preemptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type=='keyup' && e.keyCode!=8) return;
                    
                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){


			     		var valor = el.value.toLowerCase();
                        var data = new Array();          
			     		if(valor){
                            // fadeout all
    			     		$(".photo").fadeOut('fast'); 
                            // Traversal all element transfer data-title to low cases, 
                            // fadein the element which is matched
                            // set 'roadtrip' to data-lightbox  which is matched
                            for(var i =0; i<$(".photo a").length ;i++){
                                $(".photo a")[i].dataset.lightbox = "";
                                data[i] = $(".photo a")[i].dataset.title.toLowerCase();
                                var tem = data[i];
                                if(tem.indexOf(valor)!=-1){
                                    $(".photo a").eq(i).parent().fadeIn('fast');
                                    $(".photo a")[i].dataset.lightbox = "roadtrip";
                                }
                            }  			     		
			     		}else{
                          $(".photo").fadeIn('fast');
                          $(".photo").children().fadeIn('fast');
                          for(var j =0; j<$(".photo a").length ;j++){
                            $(".photo a")[j].dataset.lightbox = "roadtrip";
                          }
                          
                        }

                        

                        search(el);

                    }, timeout);
                }).on('blur',function(){
     	   				//when leaving the input

                   		search(el);
                });
            });



        }
    });
})(jQuery);




