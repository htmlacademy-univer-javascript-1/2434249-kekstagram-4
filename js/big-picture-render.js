import {isEscapeKey} from './util.js';
import {createBigPictureData, cleanBigPictureData} from './big-picture-data.js';

export const bigPicture = document.querySelector('.big-picture');
const closeElement = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const countComments = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.social__comments-loader');

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

function loadNewComments(number, list) {
  const startIndex = number.start;
  if (number.start < list.length - 5) {
    number.start += 5;
  } else {
    number.start += list.length - number.start;
    commentLoader.classList.add('hidden');
  }

  for (let i = startIndex; i < number.start; i++) {
    bigPicture.querySelector('.social__comments').appendChild(list[i]);
  }

  bigPicture.querySelector('.current-comments-count').textContent = number.start;

  if (number.start === list.length) {
    number.start = 5;
  }
}

function openBigPicture(picture) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  createBigPictureData(picture);

  if (picture.comments.length > 5) {
    const number = {start: 5};
    const fullCommentList = bigPicture.querySelector('.social__comments').querySelectorAll('.social__comment');

    bigPicture.querySelector('.social__comments').innerHTML = '';

    for (let i = 0; i < number.start; i++) {
      bigPicture.querySelector('.social__comments').appendChild(fullCommentList[i]);
    }

    commentLoader.addEventListener('click', () => loadNewComments(number, fullCommentList));
  } else {
    document.querySelector('.social__comment-count').classList.add('hidden');
    commentLoader.classList.add('hidden');
    document.querySelector('.social__comments-loader').removeEventListener('click', loadNewComments);
  }

  document.addEventListener('keydown', onDocumentKeydown);
  closeElement.addEventListener('click', closeBigPicture);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  cleanBigPictureData();

  countComments.classList.remove('hidden');
  commentLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeElement.removeEventListener('click', closeBigPicture);
  //Почему-то не удалается обработчик...
  commentLoader.removeEventListener('click', loadNewComments);
}
