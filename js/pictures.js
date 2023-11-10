import {createPhotoInfo} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

const generatePictures = createPhotoInfo();

const similarListFragment = document.createDocumentFragment();

generatePictures.forEach(({url, description, likes, commets}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = commets.length;
  similarListFragment.appendChild(pictureElement);
});

pictureList.appendChild(similarListFragment);
