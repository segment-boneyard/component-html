
var debug = require('debug')('component-html')
  , fs = require('fs')
  , path = require('path')
  , str2js = require('string-to-js');


/**
 * Plugin to replace HTML files with compiled Javascript files.
 */

module.exports = function (builder) {
  builder.hook('before scripts', function (pkg, callback) {
    var files = htmls(pkg);
    if (!files) return callback();
    files.forEach(function (file) { convert(file, pkg); });
    callback();
  });
};


/**
 * Convert an `.html` file to a `.js` file for a `pkg`.
 *
 * @param {String} file  File name.
 * @param {Object} pkg   The build package the file belongs to.
 */

function convert (file, pkg) {
  var path = pkg.path(file);
  debug('converting: %s', path);
  var string = fs.readFileSync(path, 'utf8');
  pkg.addFile('scripts', file + '.js', str2js(string));
}


/**
 * Get all the `.html` files for a given `pkg`.
 *
 * @param {Object} pkg  The build package to search.
 */

function htmls (pkg) {
  if (!pkg.config.templates) return;
  return pkg.config.templates.filter(function (filename) {
    if (path.extname(filename) === '.html') return true;
  });
}
