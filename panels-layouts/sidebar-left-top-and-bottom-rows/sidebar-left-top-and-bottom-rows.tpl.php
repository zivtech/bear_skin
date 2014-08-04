
<!-- top row -->

<div class="bearskin-template sidebar-left-top-and-bottom-rows">

  <div class="bearskin-row top">
    <div class="row-inside">
      <?php print $content['top']; ?>
    </div>
  </div>

  <!-- middle row -->

  <div class="bearskin-row middle">
    <div class="row-inside">

      <!-- center column -->

      <div class="column center">
        <div class="col-inside">
          <?php print $content['center']; ?>
        </div>
      </div>

      <!-- left sidebar column -->

      <div class="column sidebar left">
        <div class="col-inside">
          <?php print $content['left']; ?>
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
