const fs = require("fs");
const rimraf = require("rimraf");
const pathResolver = require("path");
const getDirectories = require("./getDirectories");

const exampleDirPath = pathResolver.resolve(__dirname, "example12345");
const fileNames = ["components", "helpers"];

rimraf.sync(exampleDirPath);
fs.mkdirSync(exampleDirPath);

fileNames.forEach((fileName)=> {
  const filePath = pathResolver.resolve(exampleDirPath, fileName);
  if(!fs.existsSync(filePath)) fs.mkdirSync(filePath);
});

test("get directories of a path", ()=> {
  const dirPath = pathResolver.resolve(__dirname, "example12345");
  const result = getDirectories(dirPath);
  expect(result).toStrictEqual([
    {
      folderName: "components", 
      folderPath: pathResolver.resolve(dirPath, "components")
    },
    {
      folderName: "helpers", 
      folderPath: pathResolver.resolve(dirPath, "helpers")
    },
  ]);
});

test("get directories of a path that does not exists", ()=> {
  const dirPath = pathResolver.resolve(
    exampleDirPath, Math.random().toString());
  const result = getDirectories(dirPath);
  expect(result).toStrictEqual([]);
});

test("passing null as 'path'", ()=> {
  const dirPath = null;
  try {
    getDirectories(dirPath);
  }catch(error) {
    expect(error).toBeInstanceOf(TypeError);
  }
});

test("passing undefined as 'path'", ()=> {
  const dirPath = undefined;
  try {
    getDirectories(dirPath);
  }catch(error) {
    expect(error).toBeInstanceOf(TypeError);
  }
});

afterAll(()=> {
  rimraf.sync(exampleDirPath);
});