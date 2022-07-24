const fs = require("fs");
const rimraf = require("rimraf");
const pathResolver = require("path");
const resolveInclude = require("./resolveInclude");

const exampleDirPath = pathResolver.resolve(__dirname, "example12345");
const fileNames = ["components", "random.name.js", "stringToNumber", "sumNumbers.js"];

rimraf.sync(exampleDirPath);
fs.mkdirSync(exampleDirPath);

fileNames.forEach((fileName)=> {
  const filePath = pathResolver.resolve(exampleDirPath, fileName);
  if(!fs.existsSync(filePath)) fs.mkdirSync(filePath);
});

test("resolving a exact path that does exist", ()=> {
  const include = [
    pathResolver.resolve(__dirname, "example12345")
  ];
  const result = resolveInclude(include);
  expect(result).toStrictEqual({
    [pathResolver.resolve(__dirname, "example12345")]: 1
  });
});

test("resolving a no exact path that does exist", ()=> {
  const include = [
    pathResolver.resolve(__dirname, "example12345") + "/"
  ];
  const result = resolveInclude(include);
  expect(result).toStrictEqual({
    [pathResolver.resolve(__dirname, "example12345/components")]: 1,
    [pathResolver.resolve(__dirname, "example12345/random.name.js")]: 1,
    [pathResolver.resolve(__dirname, "example12345/stringToNumber")]: 1,
    [pathResolver.resolve(__dirname, "example12345/sumNumbers.js")]: 1
  });
});

test("resolving any path that does exist", ()=> {
  const include = [
    pathResolver.resolve(__dirname, "example12345") + "/",
    pathResolver.resolve(__dirname, "example12345/components"),
    pathResolver.resolve(__dirname, "example12345"),
  ];
  const result = resolveInclude(include);
  expect(result).toStrictEqual({
    [pathResolver.resolve(__dirname, "example12345")]: 1,
    [pathResolver.resolve(__dirname, "example12345/random.name.js")]: 1,
    [pathResolver.resolve(__dirname, "example12345/stringToNumber")]: 1,
    [pathResolver.resolve(__dirname, "example12345/sumNumbers.js")]: 1,
    [pathResolver.resolve(__dirname, "example12345/components")]: 1
  });
});

test("resolving any path that does not exist", ()=> {
  const include = [
    pathResolver.resolve(__dirname, "example_ne_12345"),
    pathResolver.resolve(__dirname, "example_ne_12345") + "/",
    pathResolver.resolve(__dirname, "example_ne_example")
  ];
  const result = resolveInclude(include);
  expect(result).toStrictEqual({});
});


afterAll(()=> {
  rimraf.sync(exampleDirPath);
});