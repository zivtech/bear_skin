# Sass Structure

The sass in Bear Skin is organized in an atomic structure. You will find most of the sass files within their component directory. ex: ```components/_patterns/02-molecules/messages/_messages.scss```

The ```00-utilities``` directories contains the "setup" sass files where you can configure your variables, add mixins, turn on and off certain features etc. You should get familiar with these prior to starting styling away.

The base typography of the site is controlled by a custom version of [Gutenberg](https://matejlatin.github.io/Gutenberg/). You can find the library at ```components/vendor/scss/gutenberg```. You can set your configuration to your wishes with the ```_gutenberg-config.scss```. The other files should usually remain unmodified.
If you care to be consistent with the vertical rhythm of your site and avoid hard pixel values for your line heights, font sizes, margins and paddings, you should use the mixins provided by Gutenberg. ex: ```@include margin-bottom(1);```

The other external library included with Bear Skin is [flexbox grid](http://flexboxgrid.com/). You can find the file in ```components/vendor/bower/css```. It is in use for our layouts but also contains the flexbox reusable classes for further styling.

Lastly, you'll notice a ```_ui-[pattern].scss``` in each pattern section directory. These are the files used to style the UI separately from the rest of the css in order to use the theme settings to control the look of the UI. Most likely you won't add to them once starting styling your site as you probably won't need to switch the UI settings during development. Instead add the styling within their component directory.
