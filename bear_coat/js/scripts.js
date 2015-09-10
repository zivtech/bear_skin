/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

  'use strict';

  //
  //Use the sample behavior pattern below
  
  
  Drupal.behaviors.bearCoat = {
   attach: function (context, settings) {
     context = context || document;
     settings = settings || Drupal.settings;

      $(window).on('load scroll', function () {
        var $top = $(window).scrollTop();
        if ($top >= 50) {
          $('.wrapper--header').addClass('compressed');
        }
        else {
          $('.wrapper--header').removeClass('compressed');
        }
      });

      // Material (would be better to add markup to form elements, but going faster here)
      //$('input[type="checkbox"]').checkbox();
      $('select').dropdown();
   }
  };

  //
  // Polyfill things where needed
  //
  Drupal.behaviors.bearPolyfill = {
    attach: function(context, settings) {

    }
  };

})(jQuery, Drupal, window, document);
