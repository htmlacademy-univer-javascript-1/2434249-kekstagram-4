import {isEscapeKey} from './util.js';
import {createBigPictureData, cleanBigPictureData} from './big-picture-data.js';

export const bigPicture = document.querySelector('.big-picture');
const closeElement = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const countComments = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

export const renderBigPicture = (pictures, data) => {
  pictures.forEach((picture, index) =>  {
    picture.addEventListener('click', () => openBigPicture(data[index]));
  });
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture(picture) {
  bigPicture.classList.remove('hidden');
  countComments.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  createBigPictureData(picture);

  document.addEventListener('keydown', onDocumentKeydown);
  closeElement.addEventListener('click', closeBigPicture);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  countComments.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  cleanBigPictureData();

  document.removeEventListener('keydown', onDocumentKeydown);
  closeElement.removeEventListener('click', closeBigPicture);
}
