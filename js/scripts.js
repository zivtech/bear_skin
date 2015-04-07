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
        enabled: Drupal.settings.bear_skin.stickyNavbar,
        menuSelector: '.wrapper--navigation',
        logoSelector: '.site-header__logo',
        displayHeight: Drupal.settings.bear_skin.stickyNavbarHeight
      });

      var sticky = this;

      if (context === document && settings.bearStickyNav.enabled) {
        var $logo = $(settings.bearStickyNav.logoSelector).clone();
        var $desktopNav = $(settings.bearStickyNav.menuSelector);

        if ($desktopNav.length) {
          var top = (Drupal.settings.bear_skin.userLoggedIn) ? '29px' : '0px';
          $desktopNav.addClass('js-menu-original').clone().insertAfter(settings.bearStickyNav.menuSelector).addClass('js-menu-clone').css('top', top).removeClass('js-menu-original').hide();
          var $cloneMenu = $('.js-menu-clone');
          if ($logo.length) {
            $cloneMenu.append($logo);
            $logo.children('img').attr('alt', 'mobile logo');
          }
        }

        $(window).scroll(function(e) {
          var scrollTop = $(window).scrollTop();
          if (scrollTop >= settings.bearStickyNav.displayHeight) {
            sticky.activate(true);
          } else {
            sticky.activate(false);
          }
        });
      }

    },
    activate: function(shouldStick) {
      var $original = $('.js-menu-original');
      var $stuck = $('.js-menu-clone');
      if (shouldStick) {
        $original.css('visibility', 'hidden');
        $stuck.css('left', '0').css('right', '0').fadeIn('slow');
      } else {
        $stuck.fadeOut('fast');
        $original.css('visibility', 'visible');
      }
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
