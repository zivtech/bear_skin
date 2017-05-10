# Gulp config

The default settings used for Gulp are located in `default.gulpfile.yml`. These settings include things like paths, settings, etc.

You can override any of the settings by duplicating the default file and renaming it to `gulpfile.yml`. Then, change any settings you want. This file is ignored in Git.

Also, individual gulp tasks live in the `gulp-tasks` directory.

## Building CSS

To start building CSS, you have to first install all of the gulp dependencies. `cd` to the project directory in your terminal and run:
```sh
$ npm install
```

You might run into some errors initially, depending on your local setup. if so, make sure that your local paths are correct:
```sh
$ npm config set prefix /usr/local
```

Then reinstall gulp:
```sh
$ sudo npm install gulp -g
```

## Adding Google Fonts

Bear Skin uses Gulp to add [Google Fonts](https://fonts.google.com/). Instead of having multiple requests to the server to get fonts (one request for each font style, and one for the CSS), Bear Skin downloads all the fonts from Google. Then, they are base64 encoded into a data uri and embedded directly into the CSS. As a result, only one request is needed to get all fonts! Plus, since CSS is cached in the browser, subsequent page reloads should be faster.

To start, simply browse Google Fonts and select all the fonts you want to use to in your theme. Once you have them selected, you receive a `link` embed tag from Google, which looks something like this:

`<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700" rel="stylesheet">`

Copy the `family` parameter of the URL, and paste it into the `fonts.list` file, like this:

`Open+Sans:400,400i,600,700`

In the `fonts.list` file, you can add as many rows of fonts as you want. For example:

```
Source+Sans+Pro&amp;subset=vietnamese
Open+Sans:400,600i,800i&amp;subset=vietnamese
```

The CSS file is generated at `css/fonts.css`. This CSS file is included in the theme library's yaml file.

## Generating Favicons

We use the gulp-favicons plugin to generate fav and app icons and the gulp-inject plugin to inject the appropriate markup into each page's `<head>`. You can find the default settings for these gulp tasks in `default.gulpfile.yml`.

You may want to override some of these settings in your `gulpfile.yml`:

```yml
favicons:
  src: # the path to the base file that will be used to generate various fav and app icons
  dest: # the directory in which the generated icons will live
  bgColor: # a background color to be used for certain icons
```

**Note:** The `theme > name` variable must also be set properly for the icons' paths to be properly defined.

## Testing and analysis

### Visual regression testing

We have included backstopJS to be able to run css regression test.

Configure your test with `backstop.json`. **When in doubt, visit [BackstopJS](https://github.com/garris/BackstopJS) for more config info**.
Create your reference pointer after making your changes and compile css:
```sh
$ gulp create-reference
```
To test that, run:
```sh
$ gulp run-test
```
Note: you can also just run test between environments.

### Accessibility testing

Run this test with `gulp audit:accessibility`.

We use [Pa11y](https://github.com/pa11y/pa11y) to test your site against a configurable accessibility standard. You can test against any of the following standards:

* [Section508](https://www.section508.gov/content/learn "Learn more about Section 508 standards")
* [WCAG2A](https://www.w3.org/WAI/WCAG20/quickref/?currentsidebar=%23col_overview&levels=aa%2Caaa "Learn more about WCAG2A standards")
* [WCAG2AA](https://www.w3.org/WAI/WCAG20/quickref/?currentsidebar=%23col_overview&levels=a%2Caaa "Learn more about WCAG2AA standards") (default)
* [WCAG2AAA](https://www.w3.org/WAI/WCAG20/quickref/?currentsidebar=%23col_customize&levels=a%2Caa "Learn more about WCAG2AAA standards")

Pa11y checks various accessibility metrics and generates a report in the `audit-results` directory. You can generate this report in the following formats:

* cli (default)
* html
* json
* csv
* tsv

You can find these settings in the `accessibility` section of your `gulpfile.yml`.

### CSS analysis

We use two tools to analyze your final CSS files.

1. [Gulp Parker](https://github.com/PavelDemyanenko/gulp-parker) is a gulp wrapper for the [Parker](https://github.com/katiefenn/parker) analysis tool, which returns various metrics about your stylesheets' complexity. The results will be output on the command line and also in `css-analysis.md`, which is located in the `audit-results` directory.

   Run this test with `gulp audit:analyze`.

2. [Specificity Graph](https://github.com/pocketjoso/specificity-graph) generates an interactive graph that shows you how specific your CSS selectors are. You can find this graph in the `audit-results/specificity-graph` directory.

   Run this test with `gulp audit:specificity`.
