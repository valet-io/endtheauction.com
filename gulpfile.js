'use strict';

var gulp    = require('gulp');
var Promise = require('bluebird');
var file    = require('./lib/file');
var posts   = require('./lib/posts');
var swig    = Promise.promisifyAll(require('swig'));

require('swig-marked').useTag(swig);

gulp.task('home', function () {
  return Promise.join(
    posts.get(),
    compile('./pages/home.html')
  )
  .spread(function (posts, template) {
    return template({
      posts: posts
    });
  })
  .tap(console.log);
});

gulp.task('posts', ['partials'], function () {
  return posts.get()
    .pipe(gulp.dest('build'));
});

function compile (path) {
  return swig.compileFileAsync(path, null);
}
