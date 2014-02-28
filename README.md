esprima-pretty-error
====================

Pretty print an esprima parse error to sdtout. This works with both JavaScript 
files and JSON files. Internally, this utility will try reparsing the file with 
esprima. This is done so that JSON files can be wrapped as JavaScript so that
the error shows the correct line and column.

Usage:
------

    var fs = require("fs");
    var esprima = require("esprima");
    var prettyPrintEsprimaParseError = require("esprima-pretty-error");

    var filePath = path.resolve("/foo/bar/baz.js");

    fs.readFile(filePath, "utf8", function(err, rawJS) {
      try {
        esprima.parse(rawJS);
      } catch (esprimaErr) {
        prettyPrintEsprimaParseError(filePath);
      }
    });

License
-------

MIT
