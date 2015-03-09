<div class="bearskin-template two-columns-top-and-bottom-rows">

  <?php if (!empty($content['top'])): ?>
  <div class="bearskin-row top">
    <div class="row-inside">
      <?php print $content['top']; ?>
    </div>
  </div><!-- top row -->
  <?php endif; ?>

  <?php if (!empty($content['left']) || !empty($content['right'])): ?>
  <div class="bearskin-row middle">
    <div class="row-inside">

      <?php if (!empty($content['left'])): ?>
      <div class="column left">
        <div class="col-inside">
          <?php print $content['left']; ?>
        </div>
      </div><!-- left sidebar column -->
      <?php endif; ?>

      <?php if (!empty($content['right'])): ?>
      <div class="column right">
        <div class="col-inside">
          <?php print $content['right']; ?>
        </div>
      </div><!-- center column -->
      <?php endif; ?>

    </div>
  </div><!-- middle row -->
  <?php endif; ?>

  <?php if (!empty($content['bottom'])): ?>
  <div class="bearskin-row bottom">
    <div class="row-inside">
      <?php print $content['bottom']; ?>
    </div>
  </div><!-- bottom row -->
  <?php endif; ?>

</div>
