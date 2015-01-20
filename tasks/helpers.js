var handlebars = require('handlebars');
var marked     = require('marked');

handlebars.registerHelper('markdown', function (options) {
  return marked(options.fn(this));
});
