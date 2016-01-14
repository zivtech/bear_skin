(function ($) {
	
	'use strict';

  jQuery.expr[':'].Contains = function(a,i,m){
	  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };
 
  function listFilter(header, list) {
	var form = $("<form>").attr({"class":"filterform","action":"#"}),
			input = $("<input>").attr({"class":"filterinput","type":"text"});
	
	$(form).append(input).appendTo(header);
 
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

  $(function () {
	listFilter($('header'), $('#kss-main'));
  });

}(jQuery));
