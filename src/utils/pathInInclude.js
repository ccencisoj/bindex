const pathInInclude = (path, include)=> {
  return path in include ? true : false;
}

module.exports = pathInInclude;