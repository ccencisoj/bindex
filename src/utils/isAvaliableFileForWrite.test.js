const fs = require("fs");
const rimraf = require("rimraf");
const pathResolver = require("path");
const isAvaliableFileForWrite = require("./isAvaliableFileForWrite");

const exampleFilePath = pathResolver.resolve(__dirname, "file12345");
rimraf.sync(exampleFilePath);
fs.writeFileSync(exampleFilePath, "");

test("avaliable file for write", ()=> {
  const result = isAvaliableFileForWrite(exampleFilePath);
  expect(result).toBe(true);
});

test("passing a file path that not exists", ()=> {
  const filePath = pathResolver.resolve(
    __dirname, "file", Math.random().toString());
  const result = isAvaliableFileForWrite(filePath);
  expect(result).toBe(true);
});

test("passing as path a value null", ()=> {
  const filePath = null;
  try {
    isAvaliableFileForWrite(filePath);
  }catch(error) {
    expect(error).toBeInstanceOf(TypeError);
  }
});

afterAll(()=> {
  rimraf.sync(exampleFilePath);
});