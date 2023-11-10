import {getRandomInteger, getRandomRangeInteger, getRandomArrayElement} from './util.js';

const COUNT_PHOTOS = 25;
const DESCRIPTION = 'Lorem ipsum dolor sit amet';
const AvatarId = {
  MIN: 1,
  MAX: 6
};
const CountComment = {
  MIN: 0,
  MAX: 30
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

export const createPhotoInfo = () => new Array(COUNT_PHOTOS).fill('').map((_, index) => (
  {
    id: ++index,
    url: `photos/${index}.jpg`,
    description: DESCRIPTION,
    likes: getRandomRangeInteger(CountLike.MIN, CountLike.MAX),
    commets: new Array(getRandomRangeInteger(CountComment.MIN, CountComment.MAX)).fill('').map(() => ({
      id: getRandomInteger(),
      avatar: `img/avatar-${getRandomRangeInteger(AvatarId.MIN, AvatarId.MAX)}.svg`,
      message: getRandomArrayElement(USER_MESSAGES),
      name: getRandomArrayElement(USER_NAMES)
    }))
  }));
