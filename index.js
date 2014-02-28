var chalk = require("chalk");

function esprimaPrettyPrintParseError(error, scriptPath, rawJS) {

  var js = rawJS.split("\n");

  // Add an empty element to the beginning of the array so that line numbers are
  // aligned with the array indices.
  js.unshift(undefined);

  var firstLine = error.lineNumber - 5;
  var lastLine = error.lineNumber + 5;
  var codeToPrint = js.slice(firstLine, lastLine);

  var esprimaMsg = error.message.split(" ").slice(2).join(" ");

  var msg = [
    "==============================================================",
    "",
    chalk.bold.red("Error parsing JavaScript file"),
    "",
    ["File:", scriptPath].join(" "),
    "",
    ["Esprima Error:", esprimaMsg].join(" "),
    ["Line:", error.lineNumber].join(" "),
    ["Column:", error.column].join(" "),
    "",
  ];

  codeToPrint.forEach(function(line, index, array) {
    var number = firstLine + index;
    if (number === error.lineNumber) {
      line = line.split("");
      line[error.column - 1] = chalk.bgWhite(line[error.column - 1]);
      line = line.join("");
      line = chalk.red(line);
      number = chalk.red(number);
    }
    msg.push(chalk.inverse(number) + "   " + line);
  });

  msg.push("");
  msg.push("==============================================================");

  console.log(msg.join("\n"));
}

module.exports = esprimaPrettyPrintParseError;
