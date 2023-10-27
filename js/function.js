const checkStringLength = (string, length) => string.length <= length;

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

const getHoursToMinutes = (stringTime) => stringTime.split(':').map(Number).reduce((first, second) => first*60 + second);

const isMeetingPossible = (startDay, endDay, startMeeting, durationMeeting) => {
  const startDay_ = getHoursToMinutes(startDay);
  const endDay_ = getHoursToMinutes(endDay);
  const startMeeting_ = getHoursToMinutes(startMeeting);

  return (startDay_ <= startMeeting_ && startMeeting_ < endDay_) && (startMeeting_ + durationMeeting <= endDay_);
};

isMeetingPossible('08:00', '17:30', '14:00', 90);
isMeetingPossible('8:0', '10:0', '8:0', 120);
isMeetingPossible('08:00', '14:30', '14:00', 90);
isMeetingPossible('14:00', '17:30', '08:0', 90);
isMeetingPossible('8:00', '17:30', '08:00', 900);
checkStringLength('qwerty', 10);
isPalindrom('Лёша на полке клопа нашёл ');
getNumbers('2023 год');
