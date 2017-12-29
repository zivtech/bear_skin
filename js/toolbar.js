(function ($, Drupal) {

  Drupal.behaviors.bsToolbar = {
    attach: function (context) {

      var $toolbarCssIcon = $('#toolbar-icon-css', context);
      var $toolbarCssFrame = $('#toolbar-css-frame', context);

      $('body').toggleClass('css-frame');

      $toolbarCssIcon.on('click', function() {
        $toolbarCssFrame.toggleClass('open');

      });
    }
  };

})(jQuery, Drupal);
