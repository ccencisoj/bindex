const fs = require("fs");
const pathResolver = require("path");

const getDirectories = (path)=> {
  const directories = [];

  if(!(typeof path === "string"))
    throw new TypeError("The 'path' must be a string");

  if(!fs.existsSync(path)) return [];

  fs.readdirSync(path).forEach((fileName)=> {
    const filePath = pathResolver.resolve(path, fileName);
    const stat = fs.lstatSync(filePath);
    
    if(stat.isDirectory()) 
      directories.push({folderName: fileName, folderPath: filePath});
  });

  return directories;
}

module.exports = getDirectories;