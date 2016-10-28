'use strict';

var yeoman = require('yeoman-generator');
var includes = require('lodash.includes');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var plBase = ('./components/_patterns');

module.exports = yeoman.Base.extend({
  prompting: function () {

    console.log('');
    console.log(chalk.bold.blue('Salutations. Let\'s build a component!'));
    console.log(chalk.yellow('All templates are located at: ' + path.relative(process.cwd(), __dirname)));
    console.log('');

    var prompts = [{
      type: 'list',
      name: 'patternType',
      message: 'Where would you like this new component?',
      choices: fs.readdirSync(plBase, 'utf8')
    }, {
      type: 'list',
      name: 'patternSubType',
      message: 'Where in here?',
      choices: function(answers) {
        var folder = path.join(plBase, answers.patternType);
        var subfolders = fs.readdirSync(folder, 'utf8');
        return ['./'].concat(subfolders);
      }
    }, {
      type: 'checkbox',
      name: 'files',
      message: 'What files would you like in there?',
      choices: [
        'twig',
        'scss',
        'yml',
        'json',
        'md'
      ],
      default: [
        'twig',
        'yml',
        'scss'
      ]
    }, {
      name: 'name',
      message: 'What shall we name it? ' + chalk.blue('Let\'s stick with a naming convention. Ex: "region--something". It will usually match the template suggestion (don\'t forget to have dev mode turned on). The scss file will be automatically preceded with _)'),
      filter: function(answer) {
        return answer.replace(/ /g, '-').toLowerCase();
      }
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    // console.log(this.props);
    var destPath = path.join(plBase, this.props.patternType, this.props.patternSubType, this.props.name);

    if (includes(this.props.files, 'scss')) {
      this.fs.copyTpl(
        this.templatePath('_pattern.scss'),
        this.destinationPath(path.join(destPath, '_' + this.props.name + '.scss')),
        this.props
      );
    }

    if (includes(this.props.files, 'twig')) {
      this.fs.copyTpl(
        this.templatePath('pattern.twig'),
        this.destinationPath(path.join(destPath, this.props.name + '.twig')),
        this.props
      );
    }

    if (includes(this.props.files, 'yml')) {
      this.fs.copyTpl(
        this.templatePath('pattern.yml'),
        this.destinationPath(path.join(destPath, this.props.name + '.yml')),
        this.props
      );
    }

    if (includes(this.props.files, 'json')) {
      this.fs.copyTpl(
        this.templatePath('pattern.json'),
        this.destinationPath(path.join(destPath, this.props.name + '.json')),
        this.props
      );
    }

    if (includes(this.props.files, 'md')) {
      this.fs.copyTpl(
        this.templatePath('pattern.md'),
        this.destinationPath(path.join(destPath, this.props.name + '.md')),
        this.props
      );
    }

  }

});
