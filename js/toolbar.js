(function ($, Drupal) {

  Drupal.behaviors.bsToolbar = {
    attach: function (context) {

      var $toolbarCssIcon = $('#toolbar-icon-css', context);
      var $toolbarCssFrame = $('#toolbar-css-frame', context);

      $toolbarCssIcon.on('click', function() {
        $(this).find('.toolbar-icon-css').toggleClass('active');
        $toolbarCssFrame.toggleClass('open');
      });

      var $extraCss = '' +
        '<style type="text/css">' +
        '* {max-width: 100% !important;}' +
        '</style>';

      var $head = $toolbarCssFrame.contents().find('head');
      $head.append($($extraCss));
    }
  };

})(jQuery, Drupal);
