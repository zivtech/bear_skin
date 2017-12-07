# Sass Structure

The sass in Bear Skin is organized in an atomic structure. You will find most of the sass files within their component directory. ex: ```components/_patterns/02-molecules/messages/_messages.scss```

The ```00-utilities``` directories contains the "setup" sass files where you can configure your variables, add mixins, turn on and off certain features etc. You should get familiar with these prior to starting styling away.

The base typography of the site is controlled by a custom version of [Sassline](https://sassline.com), as well as the breakpoints. You can find the library at ```components/vendor/scss/sassline```, but the typography variables are overridden and customizable at ```components/_patterns/00-utilities/_variables.scss```.

The other external library included with Bear Skin is [flexbox grid](http://flexboxgrid.com/). You can find the file in ```components/vendor/bower/css```. It is in use for our layouts but also contains the flexbox reusable classes for further styling.
