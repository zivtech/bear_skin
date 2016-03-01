(function ($, Drupal, window, document, undefined) {

  'use strict';

  //
  //Use the sample behavior pattern below


  Drupal.behaviors.bearCoatSemanticUI = {
   attach: function (context, settings) {
     context = context || document;
     settings = settings || Drupal.settings;

     // Semantic UI
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
       $('.loginpopup').click(function(){
         $(".ui.modal.login").modal('show');
       });
       $('.close').click(function(){
         $(".ui.modal.login").modal('hide');
       });
       var $summary = $('details summary', context);
       $summary.each(function(){
         if ($(this).attr('aria-expanded') === "true") {
           $(this)
            .once()
            .prepend('<i class="minus circle icon"></i>');
         }
         else {
           $(this).prepend('<i class="add circle icon"></i>');
         }
         $(this).on('click', function(){
           if ($(this).attr('aria-expanded') === "true") {
             $(this).find('i')
               .removeClass('minus')
               .addClass('add');
           }
           else {
             $(this).find('i')
               .removeClass('add')
               .addClass('minus');
           }
         });
       });
     }

   }
  };

})(jQuery, Drupal, window, document);
