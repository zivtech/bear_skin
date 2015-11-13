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

     //addclass to search wrapper on focus
     var $searchForm = $('#search-block-form', context);
     $searchForm
       .find('.form-search')
       .on('focus', function(){
         $(this)
           .closest('.block-search')
           .addClass('focus');
         })
       .on('blur', function(){
         $(this)
           .closest('.block-search')
           .removeClass('focus');
       });

     // Sidr Menu
     if ($.fn.sidr instanceof Function) {
       $('#sidr-bttn').css('display', '').sidr({
         name: 'sidr-main',
         source: 'header nav',
         side: 'left'
       });
     }
     $(window).on('resize', function(){
       if($('body').hasClass('sidr-open') && $(window).width() >= 800) {
         $.sidr('close', 'sidr-main');
       }
     });

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
