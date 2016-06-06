# pathinfo

This is a convenience module/method that returns consolidated information about a filesystem path, without having to call multiple path.* methods.

## Installation

Add it as a module in your project: `npm i --save pathinfo`

## Usage

```
var pathinfo = require('pathinfo');
var info = pathinfo('path/to/some.file');
```

`info` will be an object with the following structure:

```
{
  abspath: <string>,      // absolute path to the file
  abs: <string>,          // alias for abspath
  isAbsolute: <boolean>,  // if your Node version offers this method, otherwise undefined
  dirname: <string>,      // absolute path to the parent directory
  extname: <string>,      // the extension, including the dot
  filename: <string>,     // the filename including the extension
  basename: <string>,     // the filename excluding the extension
  sep: <string>,          // the path separator for the runtime (e.g. '/' on *nix)
  separator: <string>,    // alias for sep
  delimiter: <string>,    // the path delimiter for the runtime
}
```

As it should be obvious, the keys are related to the method names of the `path` module.
