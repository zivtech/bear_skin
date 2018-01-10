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
            $(this).removeClass('is-expanded');
            $(this).find('> a').addClass('is-expanded');
            $(this).find('> a').attr('aria-expanded', 'true');
          },
          mouseout: function() {
            $(this).removeClass('is-expanded');
            $(this).find('> a').removeClass('is-expanded');
            $(this).find('> a').removeAttr('aria-expanded');
          }
        });
      });
    }
  };

})(jQuery, Drupal);
