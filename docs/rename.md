# Renaming the theme files and its functions

The theme defaults name is `bear_skin`. This might not be the name you'd like your theme, functions and filenames to be. In this case you can use the rename functions included here.

1. If enabled, disable and uninstall this theme at `/admin/appearance`
1. Rename your root directory manually to `[newname]`
1. If you don't have `gulpfile.yml` yet, duplicate `default.gulpfile.yml` (name it `gulpfile.yml`) and change line 7 `(theme > name)` to `[newname]`
1. Rename the theme files by running:

    ```sh
    $ gulp rename:files
    ```
1. Replace the theme strings (functions, references etc) by running:

    ```sh
    $ gulp rename:strings
    ```
1. Clear your caches

    ```sh
    $ drush cr
    ```
1. Enable the theme `[newname]` at `/admin/appearance`

1. If you already ran a `node_modules` directory (by running `npm install`), delete it and run the following command again to get the dependencies back.

    ```sh
    $ npm install
    ```
1. Change the name and description of your new theme in `[newname].info.yml`.
