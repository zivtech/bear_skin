/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.bear_skin = {
    attach: function (context, settings) {
      // adding a class to empty p to remove margin/padding
      // removing extra space if empty as well
      var $allP = $('#content p', context);
      var $emptyP = $('#content p.emptyP', context);

      $allP.filter(function () {
        var html = $(this).html();
        if (html === '' || html === '&nbsp;') {
          return true;
        }
      }).addClass('emptyP');

      $emptyP.html(function (i, h) {
        return h.replace(/&nbsp;/g, '');
      });
    }
  };

})(jQuery, Drupal, window, document);
