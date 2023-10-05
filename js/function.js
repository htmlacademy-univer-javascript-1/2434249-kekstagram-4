const correctLength = (string, length) => string.length <= length;

const isPalindrom = (string) => {
  const stringWithoutSpaces = string.replaceAll(' ', '').toLowerCase();
  const reversedString = stringWithoutSpaces.split('').reverse().join('');

  return stringWithoutSpaces === reversedString;
};

const getNumbers = (string) => {
  let numbers = '';
  const stringWithoutSpaces = string.replaceAll(' ', '');

  for (let symbol = 0; symbol <= stringWithoutSpaces.length; symbol++) {
    if (Number.isInteger(+stringWithoutSpaces[symbol])) {
      numbers += stringWithoutSpaces[symbol];
    }
  }

  return parseInt(numbers, 10);
};

correctLength('qwerty', 10);
isPalindrom('Лёша на полке клопа нашёл ');
getNumbers('2023 год');
