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
  // Use the sample behavior pattern below
  //
  //
  //Drupal.behaviors.bear = {
  //  attach: function (context, settings) {
  //    context = context || document;
  //    settings = settings || Drupal.settings;
  //
  //  }
  //};

  Drupal.behaviors.bearStickyNav = {
    attach: function(context, settings) {
      context = context || document;
      settings = settings || Drupal.settings;

      settings.bearStickyNav = settings.bearStickyNav || {};

      $.extend(settings.bearStickyNav, {
        enabled: settings.bear_skin.stickyNavbar || true, // enabled by default!
        menuSelector: '.menu'
      });

    }
  };

})(jQuery, Drupal, window, document);
