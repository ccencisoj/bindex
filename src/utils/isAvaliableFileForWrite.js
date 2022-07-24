const fs = require("fs");

const isAvaliableFileForWrite = (path)=> {
  if(!(typeof path === "string"))
    throw new TypeError("The 'path' must be string type");
  
  if(!fs.existsSync(path)) 
    return true;

  try {
    fs.accessSync(path, fs.constants.W_OK);
    return true;
  }catch(e) {
    return false;
  }
}

module.exports = isAvaliableFileForWrite;