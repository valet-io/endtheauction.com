'use strict';

var Promise = require('bluebird');
var glob    = Promise.promisify(require('glob'));
var fs      = Promise.promisifyAll(require('fs'));
var matter  = require('gray-matter');
var extend  = require('xtend');

exports.src = function (matcher) {
  return glob(matcher)
    .map(read)
    .map(parse);
}

function read (path) {
  return Promise.props({
    path: path,
    contents: fs.readFileAsync(path).call('toString')
  });
}

function parse (file) {
  var parsed = matter(file.contents);
  return extend(parsed.data, {
    contents: parsed.content,
    data: parsed.data
  });
}
