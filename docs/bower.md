# Using Bower for front-end plugins

Bear Skin uses Bower to install plugins for front-end development. Inside the `.bowerrc` you'll see that Bower installs to `components/vendor/bower/raw`. Also, there is a post install hook that automatically runs the Gulp bower building task after installing a plugin, `gulp bower:build`.

`gulp bower:build` actually does a few different things. It deletes all the other directories within the `components/vendor/bower` directory, then it uses [main-bower-files](https://www.npmjs.com/package/main-bower-files) to pull out all the required files from the `raw` directory. Finally, Drupal 8 libraries are automatically created and inserted into the theme's libraries YAML file, allowing you to attach them to patterns where needed.

**Note**: If you feel like your libraries need updating, or you want to totally refresh them for some reason, just run `gulp bower:build` or `npm install`.

## Serving location of Bower files

During the Bower building process, files are automatically pulled out of the `components/vendor/bower/raw` and organized into 4 directories:

- `components/vendor/bower/js` for JavaScript
- `components/vendor/bower/css` for CSS
- `components/vendor/bower/images` for images
- `components/vendor/bower/fonts` for fonts

You should never edit any files directly in any place inside `components/vendor/bower`. All of these files are deleted and regenerated during the build task, so you will lose your changes.

## Forcing usage of specific files from Bower

The `main-bower-files` package automatically pulls out the necessary files from each bower-installed plugin that you use. This is only possible if the maintainer of the plugin setup their plugin correctly.

Every plugin installed through Bower has a `bower.json` in its root directory. A plugin that successfully works with `main-bower-files` has a property called `main` in the `bower.json`. This property itemizes the files needed to make the plugin work, and it is this property that is used to automatically pull out the needed files.

However, sometimes the original developer hasn't helped us out with the `main` property, so we need to require our files somehow.

To do this, open up the `bower.json` in this theme. You'll need to create an `overrides` property, which is a JSON object outlining any necessary files from each Bower plugin.

For example, let's pretend there is a plugin called `super-slider` where we need to use all the images in its `images` directory and one css file called `styles.css`. We add a section to this theme's `bower.json` like so:

```javascript
"overrides": {
    "super-slider": {
        "main": [
            "images/*",
            "styles.css"
        ]
    }
}
```

As you can see, you can use an asterisk as a wildcard character. This includes a double asterisk for globbing files.

Lastly, now that you've specifically outlined the files you need, run `gulp bower:build` to pull out the required files and generate your YAML library.

Please review [main-bower-files documentation](https://github.com/ck86/main-bower-files#main) for more information.