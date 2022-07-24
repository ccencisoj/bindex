const fs = require("fs");
const pathResolver = require("path");
const generateCJSExports = require("./generateCJSExports");
const generateEC6Exports = require("./generateEC6Exports");
const isAvaliableFileForWrite = require("./isAvaliableFileForWrite");

const generateIndex = (path, module)=> {
  if(!(typeof path === "string"))
    throw new TypeError("The 'path' must be type string");

  if(!fs.existsSync(path))
    throw new Error("The 'path' does not exist");

  const indexPath = pathResolver.resolve(path, "index.js");
  const exports = 
    module === "ec6" ?  
    generateEC6Exports(path) :
    generateCJSExports(path);

  if(isAvaliableFileForWrite(indexPath)) 
    fs.writeFileSync(indexPath, exports);
}

module.exports = generateIndex;