const fs = require("fs");
const rimraf = require("rimraf");
const pathResolver = require("path");
const generateEC6Imports = require("./generateEC6Imports");

const exampleDirPath = pathResolver.resolve(__dirname, "example12345");
const fileNames = ["components", "random.name.js", "stringToNumber", "sumNumbers.js"];

rimraf.sync(exampleDirPath);
fs.mkdirSync(exampleDirPath);

fileNames.forEach((fileName)=> {
  const filePath = pathResolver.resolve(exampleDirPath, fileName);
  if(!fs.existsSync(filePath)) fs.mkdirSync(filePath);
});

test("generate imports of exists directory path",  ()=> {
  const result = generateEC6Imports(exampleDirPath);
  expect(result).toBe(
`import components from './components';
import randomName from './random.name.js';
import stringToNumber from './stringToNumber';
import sumNumbers from './sumNumbers.js';\n`);
});

test("try generate exports of directory path that does not exist", ()=> {
  const dirPath = pathResolver.resolve(
    __dirname, "example", Math.random().toString());
  try {
    generateEC6Imports(dirPath);
  }catch(error) {
    expect(error).toBeInstanceOf(Error);
  }
});

test("pass as 'path' a value null", ()=> {
  const dirPath = null;
  try {
    generateEC6Imports(dirPath);
  }catch(error) {
    expect(error).toBeInstanceOf(TypeError);
  }
});

test("pass as 'path' a value undefined", ()=> {
  const dirPath = undefined;
  try {
    generateEC6Imports(dirPath);
  }catch(error) {
    expect(error).toBeInstanceOf(TypeError);
  }
});

afterAll(()=> {
  rimraf.sync(exampleDirPath);
});