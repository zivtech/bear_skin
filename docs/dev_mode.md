## Turn on dev mode in Drupal 8

On your Mac, copy and rename the `sites/example.settings.local.php` to be `sites/default/settings.local.php`
```sh
$ cp sites/example.settings.local.php sites/default/settings.local.php
```
Open `default.settings.php` file in `sites/default` and uncomment these lines:

```php
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}
```
Open `settings.php` file in `sites/default` and add these lines:

```php
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}
```
This will include the local settings file as part of Drupal's settings file.

Open `settings.local.php` and uncomment this line to enable the null cache service:

```php
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';
```

In `settings.local.php` change the following to be `TRUE` if you want to work with enabled css- and js-aggregation:

```php
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
```

Uncomment these lines in `settings.local.php` to Disable the render cache and Disable Dynamic Page Cache

```php
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
```

If you do not want to install test modules and themes, set following to `FALSE`

```php
$settings['extension_discovery_scan_tests'] = TRUE;
```

Open `development.services.yml` in the `/sites` folder and add the following block (to disable twig cache)

```yaml
parameters:
  twig.config:
    debug: true
    auto_reload: true
    cache: false
```
Afterwards you have to rebuild the Drupal cache. Otherwise your website may encounter an unexpected error on page reload. This can be done with `drush cr` or by going to `/core/rebuild.php` from your Drupal 8 website.

**Finished!** Now you're able to develop in Drupal 8 without manual cache rebuilds on a regular basis.