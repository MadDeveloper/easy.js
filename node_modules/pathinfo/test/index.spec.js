var test = require('tape');
var path = require('path');
var pathinfo  = require('../index');

test('sanity check', function(t) {
  t.plan(1);
  t.equal(1 + 1, 2, '1 + 1 = 2');
});

test('should return info for an existing absolute path', function(t) {
  var src = '../package.json';
  var abs = path.resolve(__dirname, src);
  var info = pathinfo(abs);

  t.plan(6);
  t.equal(info.abs, abs, 'abs should match the absolute path');
  t.equal(info.abspath, abs, 'abspath should match the absolute path');
  t.equal(info.dirname, path.dirname(abs), 'dirname should match the absolute directory path');
  t.equal(info.extname, path.extname(abs), 'extname should match the extension name');
  t.equal(info.filename, path.basename(abs), 'filename should match the basename (incl extension)');
  t.equal(info.basename, path.basename(abs, path.extname(abs)), 'filename should match the basename (excl extension)');
});

test('should throw an error if the file is not found', function(t) {
  var src = '../nope.json';
  var abs = path.resolve(__dirname, src);

  t.plan(2);
  t.notOk(fs.existsSync(abs), 'path should not exist');
  t.throws(function() { pathinfo(abs); }, 'pathinfo should throw an Error');
});
