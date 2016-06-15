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

  //Use the sample behavior pattern below

  Drupal.behaviors.bear_skin = {
   attach: function (context, settings) {
     context = context || document;
     settings = settings || Drupal.settings;


      // adding a class to empty p to remove margin/padding
      // removing extra space if empty as well
      var $allP = $('#content p', context);
      $allP.filter(function () {
        var html = $(this).html();
        if(html == '' || html == '&nbsp;')
        return true;
      }).addClass('emptyP');
      var $emptyP = $('#content p.emptyP');
      $emptyP.html(function (i,h) {
        return h.replace(/&nbsp;/g,'');
      });

      // extra SIDR code
      if ($('body').hasClass('resp-nav')) {
       $(window).on('resize', function(){
         var $nav = $('.main-menu', context);
         if($('body').hasClass('sidr-open') && $(window).width() >= 800) {
           $('#sidr-0-button').click();
         }
       });
      }

      // sticky header

      // var lastScrollTop = 0,
      //     delta = 5,
      //     navBar = $('.wrapper--header'),
      //     navBarHeight = navBar.outerHeight();
      //
      // var throttledSticky = $.throttle(100, function() {stickyHeader()});
      // $(window).on('scroll', throttledSticky);

      function stickyHeader() {
        var st = $(window).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
        return;
        if (st > lastScrollTop && st > navBarHeight){
          navBar
            .removeClass('down top')
            .addClass('up');
        } else if (st + $(window).height() < $(document).height() && st > navBarHeight) {
          navBar
            .removeClass('up')
            .addClass('down');
        }
        else if (st <= 10) {
          navBar
            .removeClass('down up')
            .addClass('top');
        }
        lastScrollTop = st;
      }

   }
  };

})(jQuery, Drupal, window, document);
