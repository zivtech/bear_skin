<?php
/**
 * @file
 * Returns the HTML for a block.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728246
 */
?>
<div aria-labelledby="<?php print $block_html_id; ?>-label" class="<?php print $classes; ?>"<?php print $attributes; ?>>

  <?php print render($title_prefix); ?>
  <?php if (isset($title)): ?>
    <h2<?php print $title_attributes; ?> id="<?php print $block_html_id; ?>-label"><?php print $title; ?></h2>
  <?php else: ?>
    <h2 class="u-hidden" id="<?php print $block_html_id; ?>-label">Block title</h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <div class="block__content">
    <?php print $content; ?>
  </div>

</div>
