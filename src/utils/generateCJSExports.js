const fs = require("fs");
const pathResolver = require("path");
const fileNameToCamelCase = require("./fileNameToCamelCase");

const generateCJSExports = (path)=> {
  if(!(typeof path === "string"))
    throw new TypeError("The 'path' must be of string type");

  if(!fs.existsSync(path))
    throw new Error("The 'path' does not exist");

  const basename = pathResolver.basename(path);
  const basenameCC = fileNameToCamelCase(basename);
  let exports = `const ${basenameCC} = {};\n`;
  
  fs.readdirSync(path).forEach((fileName)=> {
    if(fileName === "index.js") return;
    const fileNameCC = fileNameToCamelCase(fileName);
    exports += `${basenameCC}.${fileNameCC} = require('./${fileName}');\n`;
  });

  exports += `\nmodule.exports = ${basenameCC};`;

  return exports;
}

module.exports = generateCJSExports;