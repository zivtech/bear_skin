<div class="bearskin-template sidebar-right-cleared-top-and-bottom-rows">

  <?php if (!empty($content['top'])): ?>
    <div class="bearskin-row top">
      <div class="row-inside">
        <?php print $content['top']; ?>
      </div>
    </div><!-- top row -->
  <?php endif; ?>

  <?php if (!empty($content['center']) || !empty($content['right'])): ?>
    <div class="bearskin-row middle">
      <div class="row-inside">

        <?php if (!empty($content['bottom'])): ?>
          <div class="column center">
            <div class="col-inside">
              <?php print $content['center']; ?>
            </div>
          </div><!-- center column -->
        <?php endif; ?>


        <?php if (!empty($content['bottom'])): ?>
          <div class="column sidebar right">
            <div class="col-inside">
              <?php print $content['right']; ?>
            </div>
          </div><!-- right sidebar column -->
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
