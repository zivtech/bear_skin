(function ($) {
	
	'use strict';

  jQuery.expr[':'].Contains = function(a,i,m){
	  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };
 
  function listFilter(header, list) {
	var form = $("<form>").attr({"class":"filterform","action":"#"}),
			input = $("<input>").attr({"class":"filterinput","type":"text","placeholder":"Search this page"}),
			icon = $('<i class="search icon"></i>');
	
	$(form).append(input).append(icon).prependTo(header);
 
	$(input)
	  .change( function () {
		var filter = $(this).val();
		if(filter) {
		  $(list).find("h2:not(:Contains(" + filter + "))").parent('section').addClass('hidden');
		  $(list).find("h2:Contains(" + filter + ")").parent('section').removeClass('hidden');
		} 
		else {
		  $(list).find("section").removeClass('hidden');
		}
		return false;
	  })
		.keyup( function () {
			$(this).change();
		});
  }

  var url = window.location.href;
	$('nav a[href="'+ url +'"]').parent('li').addClass('active');
	$('nav a').filter(function() {
	    return this.href == url;
	}).parent('li').addClass('active');

  $(function () {
		listFilter($('article'), $('#kss-main'));
  });

  // Material
  if ($('body').hasClass('semantic-ui')) {
    $('select').dropdown();
    $('.ui.checkbox').checkbox();
    $('.ui.accordion').accordion({
      animateChildren: true,
      easing: "easeInQuart",
      duration: 300
    });
    $('.tabular.menu .item').tab();
    $('.ui.sticky').sticky({
      context: '#content',
      offset: 50
    });
    $('.ui.pop-up').popup({
        inline   : true,
        hoverable: true
      });
    $('#md').click(function(){
      $(".ui.modal").modal('show');
    });
    $('.close').click(function(){
      $(".ui.modal").modal('hide');
    });
  }

}(jQuery));
