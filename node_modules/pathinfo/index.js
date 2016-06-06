var path = require('path');
    fs = require('fs');

function pathinfo(fp) {
  var info = {};
  var abs = path.resolve(fp);

  if (!fs.existsSync(abs)) {
    throw new Error('file not found: ' + abs);
  }

  info.abs = info.abspath = abs;
  info.isAbsolute = path.isAbsolute ? path.isAbsolute(fp) : undefined;
  info.dirname = path.dirname(abs);
  info.extname = path.extname(abs);
  info.filename = path.basename(abs);
  info.basename = path.basename(abs, info.extname);
  info.separator = info.sep = path.sep;
  info.delimiter = path.delimiter;

  return info;
}

module.exports = pathinfo;
