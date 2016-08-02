
Bear Skin is a base theme to either customize and build upon or use as a base theme for a sub theme.

Getting started
---------------
To start building CSS, you have to install all the gulp dependencies first. After changing to the project directory in your terminal, just "npm install" (you need to make sure to have node.js installed). You might run into some errors depending on how your local setup.

if so:
make sure your local paths are right: npm config set prefix /usr/local
reinstall gulp: sudo npm install gulp -g

After the process finishes, you'll be able to run all the gulp tasks (see below).

Gulp tasks
----------
1. gulp watch - watches sass, images, js, and php files.
   Activate the LiveReload browser plugin to trigger a refresh when files change.

   We are using browsersync which is going to proxy your local site. When using gulp watch, you should add a parameter to tell browsersync which site to proxy. ex: gulp watch --hostname=bearskin.vm

   This will launch your site in the browser(s) defined on line 128 of gulpfile.js

2. gulp sass - compiles Sass into CSS. This is the theme's styles.
   You shouldn't need to add vendor prefixes for CSS because Autoprefixer will do that for you.
3. gulp panels - compiles Sass in the panels-layouts directory.
   This is CSS for the panel layouts only, but it does use the variables from the theme styles in order to keep
   paddings, margins, and breakpoints consistent with the theme.
4. gulp scripts - checks your JS for errors.
5. gulp images - optimizes images.
6. gulp build - combines tasks #2 - #5 into a single build process.

Ensuring Code Quality
---------------------

Sass and JS can be linted to ensure certain quality standards are met. A single npm script lints by running `npm test`. Alternatively, two gulp tasks, `gulp sass:lint` and `gulp:scripts` can lint individually.

Make the code standards your own by editing the `.eslintrc` or `.styelintrc` files.

1. Sass linting provided by http://stylelint.io
2. JS linting provided by http://eslint.org

Additions
---------

We have included backstopJS to be able to run css regression test.

Configure your test w/ backstop.json (when in doubt, visit https://github.com/garris/BackstopJS for more config info.)

7. gulp create-reference - will create your reference pointer

after making your changes and compile css, run

8. gulp run-test

Note: you can also just run test between environments
