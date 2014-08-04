
<!-- top row -->

<div class="bearskin-template sidebar-right-top-and-bottom-rows">

  <div class="bearskin-row top">
    <div class="row-inside">
      <?php print $content['top']; ?>
    </div>
  </div>

  <!-- middle row -->

  <div class="bearskin-row middle">
    <div class="row-inside">

      <!-- right sidebar column -->

      <div class="column sidebar right">
        <div class="col-inside">
          <?php print $content['right']; ?>
        </div>
      </div>

      <!-- center column -->

      <div class="column center">
        <div class="col-inside">
          <?php print $content['center']; ?>
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
