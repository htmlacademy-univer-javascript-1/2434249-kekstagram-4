//Генерация случайного числа
export const getRandomInteger = () => Math.round(Math.random() * 1000);

//Генерация случайного числа из диапазаона
export const getRandomRangeInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Выбор случайного элемента из массива
export const getRandomArrayElement = (elements) => elements[getRandomRangeInteger(0, elements.length - 1)];
