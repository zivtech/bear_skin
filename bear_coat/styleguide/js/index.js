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

}(jQuery));
