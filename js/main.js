const PHOTO_ID_MIN = 1;
const PHOTO_ID_MAX = 25;
const PICTIRE_ADDRESS_MIN = 1;
const PICTIRE_ADDRESS_MAX = 25;
const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;
const AVATAR_PATH_MIN = 1;
const AVATAR_PATH_MAX = 6;
const PHOTO_ARRAY_LENGTH = 25;

const USER_NAMES = [
  'Alexsander',
  'Pavel',
  'Maria',
  'Anna',
  'Kiril',
  'Victor'
];
const USER_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

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
const createRandomIdFromRangeGenerator = (min, max) => {
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
};

//Выбор случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomRangeInteger(0, elements.length - 1)];

const generatePhotoId = createRandomIdFromRangeGenerator(PHOTO_ID_MIN, PHOTO_ID_MAX);
const generatePictureAdderss = createRandomIdFromRangeGenerator(PICTIRE_ADDRESS_MIN, PICTIRE_ADDRESS_MAX);
const generateLikesCount = createRandomIdFromRangeGenerator(LIKES_COUNT_MIN, LIKES_COUNT_MAX);

//Создание объекта
const createPhotoInfo = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePictureAdderss()}.jpg`,
  description: 'Lorem ipsum dolor sit amet',
  likes: generateLikesCount(),
  comments: {
    id: getRandomInteger(),
    avatar: `img/avatar-${getRandomRangeInteger(AVATAR_PATH_MIN, AVATAR_PATH_MAX)}.svg`,
    message: getRandomArrayElement(USER_MESSAGES),
    name: getRandomArrayElement(USER_NAMES)
  }
});

const createArrayPhotos = (photosCount) => Array.from({length: photosCount}, createPhotoInfo);

createArrayPhotos(PHOTO_ARRAY_LENGTH);
