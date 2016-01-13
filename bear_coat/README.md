
Bear Skin, a fully responsive Drupal starter theme packed with features and Sass goodies. 

Getting started
---------------
To start building CSS, you have to install all the gulp dependencies first. After changing to the project directory in your terminal, just "npm install" (you need to make sure to have node.js installed). You might run into some errors depending on how your local setup.

if so:
make sure your local paths are right: npm config set prefix /usr/local
reinstall gulp: sudo npm install gulp -g

After the process finishes, you'll be able to run all the gulp tasks (see below).

Third party libraries
---------------------
Bear Coat comes with two optional libraries that will greatly enhance the use experience. Both SIDR and Semantic UI can be enabled at admin/appearance/settings/bear_coat.
Follow the instruction on the page to install the corresponding libraries. You'll need to install both libraries. You can do it manually or cd the bear_coat directory and run
git clone https://github.com/Semantic-Org/Semantic-UI.git semantic_ui && git clone https://github.com/artberri/sidr.git sidr

Gulp tasks
----------
1. gulp watch - watches sass, images, js, and php files. Activate the LiveReload browser plugin to trigger a refresh when files change.
2. gulp sass - compiles Sass into CSS. This is the theme's styles. You shouldn't need to add vendor prefixes for CSS because Autoprefixer will do that for you.
3. gulp panels - compiles Sass in the panels-layouts directory. This is CSS for the panel layouts only, but it does use the variables from the theme styles in order to keep paddings, margins, and breakpoints consistent with the theme.
4. gulp styleguide - builds the styleguide for current theme
4. gulp scripts - checks your JS for errors.
5. gulp images - optimizes images.
6. gulp build - combines tasks #2 - #5 into a single build process.