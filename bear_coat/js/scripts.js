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
  //

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

      var $textInput = $('.form-item.labeled input', context);
      $textInput
        .on('focus', function(){
          $(this)
            .siblings('label, .mt')
            .addClass('focus active');
        })
        .on('blur', function(){
          if (!$(this).val()) {
            $(this)
              .siblings('label, .mt')
              .removeClass('focus active');
            }
          else {
            $(this)
              .addClass('valued')
              .end()
              .siblings('label, .mt')
              .removeClass('focus');
            }
        });
      $textInput.each(function(){
        if ($(this).is(':focus')) {
          $(this)
            .siblings('label, .mt')
            .addClass('focus active');
        }
        if ($(this).hasClass('error')) {
          $(this)
            .siblings('label, .mt')
            .addClass('focus active error');
        }
      });

      // build a simple responsive nan if SIDR not enabled
      // Comment out also if using any other responsive nav plugin
      $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
          var data = $(this).data();
          var tc = data.toggleclicked;
          $.proxy(funcs[tc], this)();
          data.toggleclicked = (tc + 1) % 2;
        });
        return this;
      };

      // sidr
      if (!$('body').hasClass('has-sidr')) {
        var $nav = $('#block-bear-coat-main-menu', context);
        $nav.once().prepend('<div id="mobile-nav" class="hidden"><a id="mobile-button" href="javascript:;"><span></span></a></div>');
        var $mobileNav = $('#mobile-nav');
        var $mobileButton = $('#mobile-button');
        var $mobileMenu = $('ul.main-nav');
        $(window).on('load resize', function(){
          if ($(window).width() < 800) {
            $nav.addClass('mobile');
            $mobileNav.removeClass('hidden');
          }
          else {
            $nav.removeClass('mobile');
            $mobileNav.addClass('hidden');
          }
        });
        $mobileNav.find($mobileButton).clickToggle(function(){
          $(this).addClass('on');
          $mobileMenu.addClass('show');
        }, function(){
          $(this).removeClass('on');
          $mobileMenu.removeClass('show');
        });
      }

      // SIDR Menu
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
