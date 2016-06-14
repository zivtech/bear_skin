<div<?php print $attributes ?>>
  <?php foreach($content as $name => $item): ?>
    
    <?php if (!empty($item)): ?>

      <?php if (!strpos($attributes, "empty-left") !== false && !strpos($attributes, "empty-right") !== false) : ?>
        <?php if ($name == "left") : ?>
        <div class="row center">
          <div<?php print drupal_attributes($region_attributes_array[$name])?>>
            <?php print $item ?>
          </div><!-- end <?php print $name; ?> panel -->
        <?php elseif ($name == "right") : ?>
          <div<?php print drupal_attributes($region_attributes_array[$name])?>>
            <?php print $item ?>
          </div><!-- end <?php print $name; ?> panel -->
        </div>
        <?php else : ?>
        <div<?php print drupal_attributes($region_attributes_array[$name])?>>
          <?php print $item ?>
        </div><!-- end <?php print $name; ?> panel -->
      <?php endif; ?>

    	<?php elseif (!strpos($attributes, "empty-left") !== false) : ?>
	    	<?php if ($name == "left") : ?>
		      <div<?php print drupal_attributes($region_attributes_array[$name])?>>
		        <?php print $item ?>
		      </div><!-- end <?php print $name; ?> panel -->
		    <?php else : ?>
		   		<div<?php print drupal_attributes($region_attributes_array[$name])?>>
		        <?php print $item ?>
		      </div><!-- end <?php print $name; ?> panel -->
      <?php endif; ?>

      <?php elseif (!strpos($attributes, "empty-right") !== false) : ?>
        <?php if ($name == "right") : ?>
	        <div class="row center">
	          <div<?php print drupal_attributes($region_attributes_array[$name])?>>
	            <?php print $item ?>
	          </div><!-- end <?php print $name; ?> panel -->
	        </div>
        <?php else : ?>
	        <div<?php print drupal_attributes($region_attributes_array[$name])?>>
	          <?php print $item ?>
	        </div><!-- end <?php print $name; ?> panel -->
      <?php endif; ?>

		  <?php else : ?>
		   		<div<?php print drupal_attributes($region_attributes_array[$name])?>>
		        <?php print $item ?>
		      </div><!-- end <?php print $name; ?> panel -->
	   	<?php endif; ?>

    <?php endif; ?>

  <?php endforeach; ?>
</div>
