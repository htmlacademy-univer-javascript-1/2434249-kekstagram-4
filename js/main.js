//Генерация случайного числа
const getRandomInteger = () => Math.round(Math.random() * 1000);

//Генерация случайного числа из диапазаона
const getRandomRangeInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Генерация числа без повторений
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomRangeInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomRangeInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

//Выбор случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomRangeInteger(0, elements.length - 1)];

const names = [
  'Alexsander',
  'Pavel',
  'Maria',
  'Anna',
  'Kiril',
  'Victor'
];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePictureAdderss = createRandomIdFromRangeGenerator(1, 25);
const generateLikesCount = createRandomIdFromRangeGenerator(15, 200);

//Создание объекта
const createPhotoInfo = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePictureAdderss()}.jpg`,
  description: 'Lorem ipsum dolor sit amet',
  likes: generateLikesCount(),
  comments: {
    id: getRandomInteger(),
    avatar: `img/avatar-${getRandomRangeInteger(1, 6)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  }
});

const createArrayPhotos = (photosCount) => Array.from({length: photosCount}, createPhotoInfo);

createArrayPhotos(25);
