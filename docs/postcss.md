# CSS setup

For more information about the reasons to use postCSS instead of SASS in this new version, please read [this post](http://zivtech.com).

## CSS Structure

The css in Bear Skin is organized in an atomic structure. You will find most of the files within their component directory. ex: ```components/_patterns/02-molecules/messages/messages.css```

The ```00-utilities``` directories contains some "setup" css files where you should import css partials, override bassCSS variables, add animations or additional reusable classes etc.

You should get familiar with these prior to starting styling away.

## bassCSS

We chose to use bassCSS for our resets, utility classes and basic styling. It's largely influenced by "Object Oriented CSS", lightweight and very easy to use. Read more about the collection [here](http://basscss.com/v7/).

## Adding custom css variables
