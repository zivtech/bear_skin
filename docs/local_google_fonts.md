## Add Google Fonts Locally to a Project

1. Copy code from bear skin project and paste them in the same associated file in your theme:

`package.json`
`default.gulpfile.yml`
`/gulp-tasks/fonts/dowload.js`

1. Paste this code into /your-theme.libraries.yml:

```php
theme:
  css/fonts.css:
  minified: true
```

1.  Paste font in `/css/fonts.list`

```php
Libre+Franklin:400,400i,700,700i
```

1. Run `npm install` & `gulp fonts:download` commands in terminal

1. You will notice that the `/css/fonts.css` file now has your desired fonts