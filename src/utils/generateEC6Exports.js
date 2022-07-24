const fs = require("fs");
const pathResolver = require("path");
const fileNameToCamelCase = require("./fileNameToCamelCase");
const generateEC6Imports = require("./generateEC6Imports");

const generateEC6Exports = (path)=> {
  if(!(typeof path === "string"))
    throw new TypeError("The 'path' must be of string type");

  if(!fs.existsSync(path))
    throw new Error("The 'path' does not exist");

  const basename = pathResolver.basename(path);
  const basenameCC = fileNameToCamelCase(basename);
  const imports = generateEC6Imports(path);
  let exports = `${imports}\nconst ${basenameCC} = {};\n`;

  fs.readdirSync(path).forEach((fileName)=> {
    if(fileName === "index.js") return;
    const fileNameCC = fileNameToCamelCase(fileName);
    exports += `${basenameCC}.${fileNameCC} = ${fileNameCC};\n`;
  });

  exports += `\nexport default ${basenameCC};\n`;

  fs.readdirSync(path).forEach((fileName)=> {
    if(fileName === "index.js") return;
    const fileNameCC = fileNameToCamelCase(fileName);
    exports += `\nexport {default as ${fileNameCC}} from './${fileName}';`;
  });

  return exports;
}

module.exports = generateEC6Exports;