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

      // Material (would be better to add markup to form elements, but going faster here)
      if ($('body').hasClass('semantic-ui')) {
        $('select').dropdown();
        $('.ui.checkbox').checkbox();
        $('.ui.accordion').accordion();
        $('.tabular.menu .item').tab();
        $('.ui.sticky').sticky({
          context: '#content',
          offset: 50
        });
        $('.loginpopup').click(function(){
          $(".ui.modal.login").modal("show");
        });
      }

      //******************
      // Markup/Dom modifs
      //******************

      // removing annoying markup 
      $('.field-suffix').each(function(){
        $(this)
          .contents()
          .unwrap();
      });

      //addclass to search wrapper on focus
      var $searchForm = $('#search-block-form', context);
      $searchForm
        .find('.form-text')
        .on('focus', function(){
          $(this)
            .closest('.block-search')
            .addClass('focus')
        })
        .on('blur', function(){
          $(this)
          .closest('.block-search')
          .removeClass('focus')
        });

      // adding a class to empty p to remove margin/padding
      // removing extra space if empty as well
      var $allP = $('#content p');
      $allP.filter(function () {
        var html = $(this).html();
        if(html == '' || html == '&nbsp;')
        return true;
      }).addClass('emptyP');
      var $emptyP = $('#content p.emptyP');
      $emptyP.html(function (i,h) {
        return h.replace(/&nbsp;/g,'');
      });

      // adding a class to hidden submit buttons wrappers
      var $hiddenSubmit = $('input.js-hide', context);
      $hiddenSubmit.each(function() {
        $(this).parent('.views-submit-button').addClass('hidden-submit');
      });

      // Tables handling
      var $uiTable = $('table.ui', context);
      $uiTable.each(function() {
        $(this).once().wrap('<div class="table-ui-container"></div>');
        $(this).parent().jScrollPane({
            autoReinitialise: true
        });
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

  // Drupal's core beforeSend function
  var beforeSend = Drupal.ajax.prototype.beforeSend;

  // Add a trigger when beforeSend fires.
  Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
      // Only apply our override on specific fields.
      if ($(this.element).hasClass('form-submit')) {
          // Copied and modified from Drupal.ajax.prototype.beforeSend in ajax.js
          $(this.element).addClass('progress-disabled').attr('disabled', true);
          // Modify the actualy progress throbber HTML.
          this.progress.element = $('<div class="ui form loading"></div>');
          // Change the position of the throbber.
          $(this.element).parent().parent().parent().addClass('ajaxx');
          $(this.element).parent().parent().parent().after(this.progress.element);
      } else {
          // Send to the default Drupal Ajax function if we're not looking at our specific field.
          beforeSend.call(this, xmlhttprequest, options);
          $(document).trigger('beforeSend');
      }
  };

})(jQuery, Drupal, window, document);
