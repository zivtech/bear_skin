'use strict';
var exec = require('child_process').exec;
var notifier = require('node-notifier');
var fs = require('fs');
var exists = require('fs-exists-sync');

function sh(cmd, exitOnError, cb) {
  console.log('Executing command', cmd);

  var child = exec(cmd, {encoding: 'utf8'});
  var stdout = '';
  var stderr = '';
  child.stdout.on('data', function (data) {
    stdout += data;
    process.stdout.write(data);
  });
  child.stderr.on('data', function (data) {
    stderr += data;
    process.stdout.write(data);
  });
  child.on('close', function (code) {
    if (code > 0) {
      console.log('Error with code ' + code + ' after running: ' + cmd);
      if (exitOnError) {
        process.exit(code);
      } else {
        notifier.notify({
          title: cmd,
          message: stdout,
          sound: true
        });
      }
    }
    cb();
  });
}

function checkResultsDir() {
  var resultsDir = 'audit-results';
  if (!exists(resultsDir)) {
    console.log('The ' + resultsDir + ' directory does not exist yet. Let\'s make that real quick.');
    fs.mkdir(resultsDir);
  }
}

module.exports = {
  sh: sh,
  checkResultsDir: checkResultsDir
};
