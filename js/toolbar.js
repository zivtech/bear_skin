(function ($, Drupal) {

  Drupal.behaviors.bsToolbar = {
    attach: function (context) {

      var $toolbarCssIcon = $('#toolbar-icon-css', context);
      var $toolbarCssFrame = $('#toolbar-css-frame', context);

      $toolbarCssIcon.on('click', function() {
        $(this).find('.toolbar-icon-css').toggleClass('active');
        $toolbarCssFrame.toggleClass('open');
      });
    }
  };

})(jQuery, Drupal);
