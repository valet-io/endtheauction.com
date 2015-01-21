'use strict';

var gulp       = require('gulp');
var es         = require('event-stream');
var Promise    = require('bluebird');
var handlebars = require('handlebars');
var path       = require('path');

exports.partials = function () {
  return gulp.src('partials/*.hbs')
    .pipe(es.mapSync(function (file) {
      handlebars.registerPartial(path.basename(file.path, path.extname(file.path)), file.toString());
    }));
};
