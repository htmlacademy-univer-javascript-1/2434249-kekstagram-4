function correctLength(inputString, length) {
  return inputString.length <= length ? true : false;
}

function isPalindrom(inputString) {
  const stringWithoutSpaces = inputString.replace(/ /g, '').toLowerCase();
  const reversedString = stringWithoutSpaces.split('').reverse().join('');

  return stringWithoutSpaces === reversedString ? true : false;
}

function getNumbers(inputString) {
  let numbers = '';
  const stringWithoutSpaces = inputString.replace(/ /g, '');

  for (let symbol = 0; symbol <= stringWithoutSpaces.length; symbol++) {
    if (Number.isInteger(+stringWithoutSpaces[symbol])) {
      numbers += stringWithoutSpaces[symbol];
    }
  }

  return parseInt(numbers);
}

correctLength('qwerty', 10);
isPalindrom('Лёша на полке клопа нашёл ');
getNumbers('2023 год');
