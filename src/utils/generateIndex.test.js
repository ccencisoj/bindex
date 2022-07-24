const fs = require("fs");
const rimraf = require("rimraf");
const pathResolver = require("path");
const generateIndex = require("./generateIndex");

const exampleDirPath = pathResolver.resolve(__dirname, "example12345");
const fileNames = ["components", "random.name.js", "stringToNumber", "sumNumbers.js"];

rimraf.sync(exampleDirPath);
fs.mkdirSync(exampleDirPath);

fileNames.forEach((fileName)=> {
  const filePath = pathResolver.resolve(exampleDirPath, fileName);
  if(!fs.existsSync(filePath)) fs.mkdirSync(filePath);
});

test("generate index of module type commonJs", ()=> {
  const module = "cjs";
  generateIndex(exampleDirPath, module);
  const indexPath = pathResolver.resolve(exampleDirPath, "index.js");
  const indexContent = fs.readFileSync(indexPath, {encoding: "utf-8"});
  expect(indexContent).toBe(
`const example12345 = {};
example12345.components = require('./components');
example12345.randomName = require('./random.name.js');
example12345.stringToNumber = require('./stringToNumber');
example12345.sumNumbers = require('./sumNumbers.js');

module.exports = example12345;`);
  rimraf.sync(indexPath);
}); 

test("passing the param module as null", ()=> {
  const module = null;
  generateIndex(exampleDirPath, module);
  const indexPath = pathResolver.resolve(exampleDirPath, "index.js");
  const indexContent = fs.readFileSync(indexPath, {encoding: "utf-8"});
  expect(indexContent).toBe(
`const example12345 = {};
example12345.components = require('./components');
example12345.randomName = require('./random.name.js');
example12345.stringToNumber = require('./stringToNumber');
example12345.sumNumbers = require('./sumNumbers.js');

module.exports = example12345;`);
  rimraf.sync(indexPath);
});

test("generate index of module type EcmaScript6", ()=> {
  const module = "ec6";
  generateIndex(exampleDirPath, module);
  const indexPath = pathResolver.resolve(exampleDirPath, "index.js");
  const indexContent = fs.readFileSync(indexPath, {encoding: "utf-8"});
  expect(indexContent).toBe(
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
  rimraf.sync(indexPath);
});

test("passing a path that does not exist", ()=> {
  const dirPath = pathResolver.resolve(Math.random().toString());
  const module = "cjs";
  try {
    generateIndex(dirPath, module);
  }catch(error) {
    expect(error).toBeInstanceOf(Error);
  }
});

test("passing the param path as null", ()=> {
  const dirPath = null;
  const module = "cjs";
  try {
    generateIndex(dirPath, module);
  }catch(error) {
    expect(error).toBeInstanceOf(TypeError);
  }
});

afterAll(()=> {
  rimraf.sync(exampleDirPath);
});