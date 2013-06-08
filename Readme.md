# component-html

  A plugin to automatically convert HTML to Javascript strings for the component builder.

## Install

    $ npm install component-html

## Usage

  Add your `.html` files to the `templates` array in your `component.json`:

  ```js
  {
    "templates": [
      "template.html"
    ]
  }
  ```

  Use the plugin during your build process:

  ```js
  var Builder = require('component-builder')
    , fs = require('fs')
    , html = require('component-html');

  var builder = new Builder(__dirname);

  builder.use(html);

  builder.build(function(err, res){
    if (err) throw err;
    if (res.js) fs.writeFileSync('build/build.js', res.require + res.js);
    if (res.css) fs.writeFileSync('build/build.css', res.css);
  });
  ```

  And then require the strings in your Javascript:

  ```js
  var tip = require('tip')
    , template = require('./template.html');
  ```

# License (MIT)

Copyright (c) 2013 Segment.io &lt;friends@segment.io&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.