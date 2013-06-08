
var Builder = require('component-builder')
  , fs = require('fs')
  , html = require('../');


var builder = new Builder(__dirname)
  .use(html)
  .build(function (err, res) {
    if (err) console.log(err);
    fs.writeFileSync('test/build.js', res.require + res.js);
  });