const capitalize = (string)=> {
  const capitalizedString = string.split("")
    .reduce((previousValue, currentValue)=> {
      const lastLetter = previousValue[previousValue.length-1];
    
      if(!(/[a-zA-Z]/.test(lastLetter))) 
        currentValue = currentValue.toUpperCase();
    
      return previousValue + currentValue;
    }, "");
  
  return capitalizedString;
}

module.exports = capitalize;