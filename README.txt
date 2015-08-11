
Bear Skin, a fully responsive Drupal starter theme packed with features and Sass goodies. 

Gulp tasks
------------
1. gulp watch - watches sass, images, js, and php files. Activate the LiveReload browser plugin to trigger a refresh when files change.
2. gulp sass - compiles Sass into CSS. This is the theme's styles. You shouldn't need to add vendor prefixes for CSS because Autoprefixer will do that for you.
3. gulp panels - compiles Sass in the panels-layouts directory. This is CSS for the panel layouts only, but it does use the variables from the theme styles in order to keep paddings, margins, and breakpoints consistent with the theme.
4. gulp scripts - checks your JS for errors.
5. gulp images - optimizes images.
6. gulp build - combines tasks #2 - #5 into a single build process.