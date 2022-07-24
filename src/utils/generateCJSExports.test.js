const fs = require("fs");
const rimraf = require("rimraf");
const pathResolver = require("path");
const generateCJSExports = require("./generateCJSExports");

const exampleDirPath = pathResolver.resolve(__dirname, "example12345");
const fileNames = ["components", "random.name.js", "stringToNumber", "sumNumbers.js"];

rimraf.sync(exampleDirPath);
fs.mkdirSync(exampleDirPath);

fileNames.forEach((fileName)=> {
  const filePath = pathResolver.resolve(exampleDirPath, fileName);
  if(!fs.existsSync(filePath)) fs.mkdirSync(filePath);
});

test("generate exports of exists directory path",  ()=> {
  const result = generateCJSExports(exampleDirPath);
  expect(result).toBe(
`const example12345 = {};
example12345.components = require('./components');
example12345.randomName = require('./random.name.js');
example12345.stringToNumber = require('./stringToNumber');
example12345.sumNumbers = require('./sumNumbers.js');

module.exports = example12345;`);
});

test("try generate exports of directory path that does not exist", ()=> {
  const dirPath = pathResolver.resolve(
    __dirname, "example", Math.random().toString());
  try {
    generateCJSExports(dirPath);
  }catch(error) {
    expect(error).toBeInstanceOf(Error);
  }
});

test("pass as 'path' a value null", ()=> {
  const dirPath = null;
  try {
    generateCJSExports(dirPath);
  }catch(error) {
    expect(error).toBeInstanceOf(TypeError);
  }
});

test("pass as 'path' a value undefined", ()=> {
  const dirPath = undefined;
  try {
    generateCJSExports(dirPath);
  }catch(error) {
    expect(error).toBeInstanceOf(TypeError);
  }
});

afterAll(()=> {
  rimraf.sync(exampleDirPath);
});