(function ($, Drupal, window, document, undefined) {

  'use strict';

  //
  //Use the sample behavior pattern below


  Drupal.behaviors.bearCoatSemanticUI = {
   attach: function (context, settings) {
     context = context || document;
     settings = settings || Drupal.settings;

     // Semantic UI calls
     $('select').dropdown();

   }
  };

})(jQuery, Drupal, window, document);
