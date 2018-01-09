/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.accessibilityMenu = {
    attach: function (context) {
      var $menus = $('.menu', context);
      $menus.each(function(i) {
        var $menu = $($menus[i]);
        var $popupLinks = $menu.find('a[aria-haspopup=true]');

        $($popupLinks).parent('li').once().on({
          mouseover: function() {
            $(this).addClass('is-expanded');
            $(this).attr('aria-expanded', 'true');
          },
          mouseout: function() {
            $(this).removeClass('is-expanded');
            $(this).attr('aria-expanded', 'false');
          }
        });
      });
    }
  };

})(jQuery, Drupal);
