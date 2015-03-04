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

  Drupal.behaviors.bearScripts = {
    attach: function (context, settings) {

      context = context || document;
      settings = settings || Drupal.settings;

      this.initJqueryPlugins(context, settings);

      var $blockMenus = $('#navigation .block-menu', context);
      if ($blockMenus.length) {
        $blockMenus.prepend('<input type="checkbox" id="button"><label for="button" onclick>Menu</label>');
      }

      var $blockMenuWrappers = $('#navigation .menu-block-wrapper', context);
      if ($blockMenuWrappers.length) {
        $blockMenuWrappers.prepend('<input type="checkbox" id="button"><label for="button" onclick>Menu</label>');
      }

    },

    initJqueryPlugins: function(context, settings) {
      if (typeof $.fn.select2 === 'function') {
        $('#content select.form-select', context).select2();
      }

      if (typeof $.fn.filestyle === 'function') {
        $(":file").filestyle({buttonText: "Find file"});
      }

      if (typeof $.fn.eqHeight === 'function') {
        $('.equalheight', context).eqHeight();
      }
    }
  };

  Drupal.behaviors.responsiveScripts = {
    attach: function (context, settings) {

      context = context || document;
      settings = settings || Drupal.settings;

      if (typeof $.fn.selectorQuery === 'function') {
        $('.cm-row, .column', context).selectorQuery({
          'widthStops': [340, 680],
          'classPrefix': 'max-'
        });
      }

      if (typeof $.fn.smoothState === 'function') {
        var $body = $('html, body'),
          $content = $('#page', context).smoothState({
            prefetch: true,
            pageCacheSize: 4,
            onStart: {
              duration: 250,
              render: function (url, $container) {
                $content.toggleAnimationClass('is-exiting');
                $body.animate({
                  scrollTop: 0
                });
              }
            }
          }).data('smoothState');
      }

    }
  };

})(jQuery, Drupal, this, this.document);
