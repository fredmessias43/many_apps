export function generateNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateUniqueNumber(outsideMax, outsideMin, outsideArray) {
  let recursiveTimes = 0;
  return (function insideUniqNumber(max, min, array) {
    let number = generateNumber(max, min);

    if (recursiveTimes != 0 && recursiveTimes == array.length + 1) {
      return null;
    }

    if (array.includes(number)) {
      recursiveTimes += 1;
      number = insideUniqNumber(max, min, array);
    }
 
    return number
  })(outsideMax, outsideMin, outsideArray)
}