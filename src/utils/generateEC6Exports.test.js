const fs = require("fs");
const rimraf = require("rimraf");
const pathResolver = require("path");
const generateEC6Exports = require("./generateEC6Exports");

const exampleDirPath = pathResolver.resolve(__dirname, "example12345");
const fileNames = ["components", "random.name.js", "stringToNumber", "sumNumbers.js"];

rimraf.sync(exampleDirPath);
fs.mkdirSync(exampleDirPath);

fileNames.forEach((fileName)=> {
  const filePath = pathResolver.resolve(exampleDirPath, fileName);
  if(!fs.existsSync(filePath)) fs.mkdirSync(filePath);
});

test("generate exports of exists directory path",  ()=> {
  const result = generateEC6Exports(exampleDirPath);
  expect(result).toBe(
`import components from './components';
import randomName from './random.name.js';
import stringToNumber from './stringToNumber';
import sumNumbers from './sumNumbers.js';

const example12345 = {};
example12345.components = components;
example12345.randomName = randomName;
example12345.stringToNumber = stringToNumber;
example12345.sumNumbers = sumNumbers;

export default example12345;

export {default as components} from './components';
export {default as randomName} from './random.name.js';
export {default as stringToNumber} from './stringToNumber';
export {default as sumNumbers} from './sumNumbers.js';`);
});


test("try generate exports of directory path that does not exist", ()=> {
  const dirPath = pathResolver.resolve(
    __dirname, "example", Math.random().toString());
  try {
    generateEC6Exports(dirPath);
  }catch(error) {
    expect(error).toBeInstanceOf(Error);
  }
});

test("pass as 'path' a value null", ()=> {
  const dirPath = null;
  try {
    generateEC6Exports(dirPath);
  }catch(error) {
    expect(error).toBeInstanceOf(TypeError);
  }
});

test("pass as 'path' a value undefined", ()=> {
  const dirPath = undefined;
  try {
    generateEC6Exports(dirPath);
  }catch(error) {
    expect(error).toBeInstanceOf(TypeError);
  }
});

afterAll(()=> {
  rimraf.sync(exampleDirPath);
});