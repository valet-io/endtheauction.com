'use strict';

var Promise    = require('bluebird');
var handlebars = require('handlebars');
var fs         = Promise.promisifyAll(require('fs'));
var glob       = Promise.promisify(require('glob'));
var path       = require('path');

exports.partials = function () {
  return glob('./partials/*')
    .map(function (file) {
      return Promise.join(
        path.basename(file, path.extname(file)),
        fs.readFileAsync(file).call('toString')
      )
      .bind(handlebars)
      .spread(handlebars.registerPartial)
    });
};

exports.get = function (name) {
  return fs.readFileAsync('./templates/' + name + '.hbs')
    .call('toString')
    .then(handlebars.compile);
};
