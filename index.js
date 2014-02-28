var fs = require("fs");
var esprima = require("esprima");
var chalk = require("chalk");

function esprimaPrettyPrintParseError(filePath) {

  var rawFile = fs.readFileSync(filePath, "utf8");
  var isJSON = /\.json$/.test(filePath);
  var fileType = isJSON ? "JSON" : "JavaScript";
  var rawToParse = isJSON ? ["var d = ", rawFile].join("") : rawFile;
  var firstLineOffset = isJSON ? 8 : 0;

  try {
    esprima.parse(rawToParse);
  } catch(error) {
    var js = rawFile.split("\n");

    // Add an empty element to the beginning of the array so that line numbers are
    // aligned with the array indices.
    js.unshift(undefined);

    var firstLine = error.lineNumber - 5;
    if (firstLine < 1) {
      firstLine = 1;
    }
    var lastLine = error.lineNumber + 5;
    if (lastLine > js.length) {
      lastLine = js.length;
    }
    var codeToPrint = js.slice(firstLine, lastLine);

    // Get just the message.
    var esprimaMsg = error.message.split(" ").slice(2).join(" ");
    var fileType = /\.json$/.test(filePath) ? "JSON" : "JavaScript";

    var lineNumber = error.lineNumber;
    var column = (isJSON && lineNumber === 1) ? error.column - firstLineOffset : error.column;

    var msg = [
      chalk.bold.red("Error parsing " + fileType + " file"),
      "",
      ["File:", filePath].join(" "),
      "",
      ["Esprima Error:", esprimaMsg].join(" "),
      ["Line:", lineNumber].join(" "),
      ["Column:", column].join(" "),
      "",
    ];

    codeToPrint.forEach(function(line, index, array) {
      var number = firstLine + index;
      if (number === lineNumber) {
        line = line.split("");
        line[column - 1] = chalk.bgWhite(line[column - 1]);
        line = line.join("");
        line = chalk.red(line);
        number = chalk.red(number);
      }
      msg.push(chalk.inverse(number) + "   " + line);
    });

    console.error(msg.join("\n"));
  }
}

module.exports = esprimaPrettyPrintParseError;
