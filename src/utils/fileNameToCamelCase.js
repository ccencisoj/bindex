const pathResolver = require("path");
const capitalize = require("./capitalize");

const fileNameToCamelCase = (fileName)=> {
  if(!(typeof fileName === "string"))
    throw new TypeError("the entry must be a string");

  const extname = pathResolver.extname(fileName);
  
  fileName = capitalize(fileName.replace(extname, "")).replace(".", "");

  return fileName;
}

module.exports = fileNameToCamelCase;