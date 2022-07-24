const config = require("./config");
const chokidar = require("chokidar");
const pathResolver = require("path");
const pathInInclude = require("./utils/pathInInclude");
const generateIndex = require("./utils/generateIndex");
const resolveInclude = require("./utils/resolveInclude");

const watcher = chokidar.watch("./src/example");

watcher.on("all", (event, path)=> {
  const resolvedInclude = resolveInclude(config.include);
  const resolvedPath = pathResolver.resolve(path);
  
  if(pathInInclude(resolvedPath, resolvedInclude)) {
    generateIndex(resolvedPath, config.module);
  }

  const dirnamePath = pathResolver.dirname(resolvedPath);

  if(pathInInclude(dirnamePath, resolvedInclude)) {
    generateIndex(dirnamePath, config.module);
  }
});