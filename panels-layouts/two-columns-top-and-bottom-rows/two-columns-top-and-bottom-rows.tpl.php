
<!-- top row -->

<div class="bearskin-template two-columns-top-and-bottom-rows">

  <div class="bearskin-row top">
    <div class="row-inside">
      <?php print $content['top']; ?>
    </div>
  </div>

  <!-- middle row -->

  <div class="bearskin-row middle">
    <div class="row-inside">

      <!-- left sidebar column -->

      <div class="column left">
        <div class="col-inside">
          <?php print $content['left']; ?>
        </div>
      </div>

      <!-- center column -->

      <div class="column right">
        <div class="col-inside">
          <?php print $content['right']; ?>
        </div>
      </div>

    </div>
  </div>

  <!-- bottom row -->

  <div class="bearskin-row bottom">
    <div class="col-inside">
      <?php print $content['bottom']; ?>
    </div>
  </div>

</div>
