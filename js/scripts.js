(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.bsMobileNavigation = {
    attach: function (context, settings) {

      // define the navigation to be turned into a mobile one
      var $mainMenu = $('.menu--main', context);

      if ($mainMenu.length) {
        $mainMenu.once('bsMobileNavigation').each(function (i) {

          // elements that toggle mobile menu
          var $nav = $('#mnav', context);

          $nav.on('click', function () {
            $(this).toggleClass('open');
            $mainMenu.toggleClass('open');
          });
        });
      }
    }
  };

  Drupal.behaviors.bsSearchForm = {
    attach: function (context, settings) {

      // search toggle
      var $searchToggle = $('#msearch', context);

      // search content
      var $mainSearch = $('#msearch-content', context);

      if ($searchToggle.length && $mainSearch.length) {
        $mainSearch.once('bsSearchForm').each(function (i) {

          // search form closing toggle
          var $closer = $('#msearch-close', context);

          $searchToggle.on('click', function () {
            $mainSearch.toggleClass('open');
          });

          $closer.on('click', function () {
            $mainSearch.removeClass('open');
          });
        });
      }
    }
  };

})(jQuery, Drupal);
