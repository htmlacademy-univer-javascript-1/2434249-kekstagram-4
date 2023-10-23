const COUNT_PHOTOS = 25;
const DESCRIPTION = 'Lorem ipsum dolor sit amet';
const AvatarId = {
  MIN: 1,
  MAX: 6
};
const CountLike = {
  MIN: 15,
  MAX: 200
};
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

//Создание объекта
const createPhotoInfo = (countPhotos) => {
  const generateLikesCount = createRandomIdFromRangeGenerator(CountLike.MIN, CountLike.MAX);

  return new Array(countPhotos).fill('').map((_, index) => (
    {
      id: ++index,
      url: `photos/${index}.jpg`,
      description: DESCRIPTION,
      likes: generateLikesCount(),
      commets: {
        id: getRandomInteger(),
        avatar: `img/avatar-${getRandomRangeInteger(AvatarId.MIN, AvatarId.MAX)}.svg`,
        message: getRandomArrayElement(USER_MESSAGES),
        name: getRandomArrayElement(USER_NAMES)
      }
    }));
};

createPhotoInfo(COUNT_PHOTOS);
