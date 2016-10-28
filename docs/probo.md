# Probo.CI

[Probo.CI](http://probo.ci/) is an open source continuous delivery tool that builds disposable environments based on pull requests. See [the Probo docs](https://docs.probo.ci/) for more information.

## Linting with Probo

To set up Probo to lint your front-end code, add the following lines near the end of your `.probo.yaml` file and replace "THEME_NAME" with your theme's name.

```yml
- name: Install dependencies for tests
  command: 'chmod +x /var/www/html/themes/THEME_NAME/bin/npm_clean.sh ; sudo npm cache clean -f ; sudo npm install -g n ; sudo n 5.6.0 && sudo ln -sf /usr/local/n/versions/node/5.6.0/bin/node /usr/bin/node ; cd /var/www/html/themes/THEME_NAME ; npm install ; ./bin/npm_clean.sh'
- name: Lint front-end code
  command: 'cd /var/www/html/themes/THEME_NAME ; npm run lint'
```

The first task gives the npm_clean.sh script executable permissions, updates Node.js to version 5.6.0, and runs "npm install" in the theme. Probo can run any gulp task and npm script after this step successfully completes. The second task simply runs the linting script.
