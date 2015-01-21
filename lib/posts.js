'use strict';

var file   = require('./file');
var extend = require('xtend');

exports.get = function () {
  return file.src('posts/*.md')
    .map(function (file) {
      return extend(file.data, {
        content: file.contents
      });
    })
    .map(cast);
}

function cast (post) {
  post.date = new Date(post.date);
  post.published = post.published === 'true';
  return post
}
