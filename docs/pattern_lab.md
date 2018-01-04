# Pattern Lab

Bear Skin 8 uses an atomic design system created with [Pattern Lab](http://patternlab.io/docs/). Next, you will need to install Pattern Lab dependencies from Composer. `cd` to the `pattern-lab` directory and run:
```sh
$ composer install
```

## Generate Pattern Lab files

Then, generate the base pattern lab files. `cd` back to the theme directory and run:
```sh
$ php pattern-lab/core/console --generate
```

If everything went well, you should have a `public` directory inside the `pattern-lab` directory.

## Watching Pattern Lab

Open a new terminal window on your local machine, `cd` to your theme directory and run:
```sh
$ gulp pl:watch
```
