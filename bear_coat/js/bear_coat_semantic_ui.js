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
     }

   }
  };

})(jQuery, Drupal, window, document);
