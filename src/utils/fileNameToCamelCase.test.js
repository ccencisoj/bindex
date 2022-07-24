const fileNameToCamelCase = require("./fileNameToCamelCase");

test("file name with extname", ()=> {
  const fileName = "example.js";
  const result = fileNameToCamelCase(fileName);
  expect(result).toBe("example");
});

test("file name without extname", ()=> {
  const fileName = "example";
  const result = fileNameToCamelCase(fileName);
  expect(result).toBe("example");
});

test("file name with sub extension", ()=> {
  const fileName = "example.module.js";
  const result = fileNameToCamelCase(fileName);
  expect(result).toBe("exampleModule");
});

test("file name with sub extension", ()=> {
  const fileName = "example.sub.js";
  const result = fileNameToCamelCase(fileName);
  expect(result).toBe("exampleSub");
});

test("file name with extension .sub", ()=> {
  const fileName = "example.sub";
  const result = fileNameToCamelCase(fileName);
  expect(result).toBe("example");
});

test("passing a no string", ()=> {
  try {
    const fileName = undefined;
    fileNameToCamelCase(fileName);
  }catch(error) {
    expect(error).toBeInstanceOf(TypeError)
  }
});