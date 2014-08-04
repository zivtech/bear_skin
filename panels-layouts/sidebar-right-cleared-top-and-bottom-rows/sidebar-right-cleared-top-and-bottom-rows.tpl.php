
<!-- top row -->

<div class="bearskin-template sidebar-right-cleared-top-and-bottom-rows">

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

      <!-- right sidebar column -->

      <div class="column sidebar right">
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
