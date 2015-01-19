var gulp  = require('gulp');
var posts = require('./tasks/posts');

gulp.task('home', function () {
  return posts.all().then(console.log);
});
