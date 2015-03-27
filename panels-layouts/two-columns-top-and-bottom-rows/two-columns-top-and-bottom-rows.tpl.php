<div<?php print $attributes ?>>
  <?php foreach($content as $name => $item): ?>
    <?php if (!empty($item)): ?>
      <div<?php print drupal_attributes($region_attributes_array[$name])?>>
        <?php print $item ?>
      </div><!-- end <?php print $name; ?> panel -->
    <?php endif; ?>
  <?php endforeach; ?>
</div>
