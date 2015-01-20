var gulp      = require('gulp');
var Promise   = require('bluebird');
var posts     = require('./tasks/posts');
var templates = require('./tasks/templates');

require('./tasks/helpers');

gulp.task('prepare', function () {
  return templates.partials();
});

gulp.task('home', ['prepare'], function () {
  return Promise.join(
    templates.get('home'),
    posts.all()
  )
  .spread(function (template, posts) {
    return template({
      posts: posts
    });
  })
  .tap(console.log)
});
