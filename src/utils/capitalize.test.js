const capitalize = require("./capitalize");

test("string with spaces", ()=> {
  const string = "hola como estas"; 
  const result = capitalize(string);
  expect(result).toBe("hola Como Estas");
});

test("string with dots", ()=> {
  const string = "hola.como.estas"; 
  const result = capitalize(string);
  expect(result).toBe("hola.Como.Estas");
});

test("string with numbers", ()=> {
  const string = "hola2como8estas"; 
  const result = capitalize(string);
  expect(result).toBe("hola2Como8Estas");
});

test("string with spaces, dots, numbers", ()=> {
  const string = "hola como.estas8hola"; 
  const result = capitalize(string);
  expect(result).toBe("hola Como.Estas8Hola");
});