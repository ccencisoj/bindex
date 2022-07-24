const fs = require("fs");
const fileNameToCamelCase = require("./fileNameToCamelCase");

const generateEC6Imports = (path)=> {
  if(!(typeof path === "string"))
    throw new TypeError("The 'path' must be of string type");

  if(!fs.existsSync(path))
    throw new Error("The 'path' does not exist");

  let imports = '';

  fs.readdirSync(path).forEach((fileName)=> {
    if(fileName === "index.js") return;
    const fileNameCC = fileNameToCamelCase(fileName);
    imports += `import ${fileNameCC} from './${fileName}';\n`;
  });

  return imports;
}

module.exports = generateEC6Imports;