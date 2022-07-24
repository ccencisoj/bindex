const fs = require("fs");
const pathResolver = require("path");
const getDirectories = require("./getDirectories");

const resolveInclude = (include)=> {
  const resolvedInclude = {};
  
  include.forEach((path)=> {
    const resolvedPath = pathResolver.resolve(path);

    if(!fs.existsSync(resolvedPath)) return;
    
    // src/components/
    if(path.endsWith("/") || path.endsWith("\\")) {

      getDirectories(resolvedPath).forEach(({folderPath})=> {
        resolvedInclude[folderPath] = 1;
      });
    // src/components
    }else {
      resolvedInclude[resolvedPath] = 1;
    }
  });

  return resolvedInclude;
}

module.exports = resolveInclude;