var Promise = require('bluebird');
var matter  = require('gray-matter');
var fs      = Promise.promisifyAll(require('fs'));
var glob    = Promise.promisify(require('glob'));
var extend  = require('xtend');

exports.all = function posts () {
  return glob('posts/*.md')
    .map(function (file) {
      return fs.readFileAsync(file);
    })
    .map(toString)
    .map(parse)
    .map(cast);
}

function toString (buffer) {
  return buffer.toString();
}

function parse (data) {
  var parsed = matter(data);
  return extend(parsed.data, {
    content: parsed.content
  });
}

function cast (post) {
  post.date = new Date(post.date);
  post.published = post.published === 'true';
  return post;
}
