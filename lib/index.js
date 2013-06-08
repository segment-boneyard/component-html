
var fs = require('fs')
  , path = require('path')
  , debug = require('debug')('component-html');


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
  debug('converting: %s', pkg.path(file));
  var fullPath = pkg.path(file);
  var string = fs.readFileSync(fullPath, 'utf8');
  var js = 'module.exports = "' + string + '"';
  pkg.addFile('scripts', file + '.js', js);
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
