import {isEscapeKey} from './util.js';

export const bigPicture = document.querySelector('.big-picture');
const closeBtn = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const countComments = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.social__comments-loader');
const COMMENT_STEP = 5;
let currentCommentCount = 5;

let comments = 0;
let fullCommentList = 0;

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

const onCloseBtnClick = () => {
  closeBigPicture();
};

const createBigPictureData = (picture) => {
  bigPicture.querySelector('.social__comment-count').parentNode.removeChild(bigPicture.querySelector('.social__comment-count'));
  const commentCount = `<div class="social__comment-count"><span class="current-comments-count">${5}</span> из <span class="comments-count">${125}</span> комментариев</div>`;
  bigPicture.querySelector('.social__comments').insertAdjacentHTML( 'beforebegin', commentCount);

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.social__comments').innerHTML = '';

  picture.comments.forEach((comment) => {
    const commentFragment = `<li class="social__comment">
    <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>`;
    bigPicture.querySelector('.social__comments').insertAdjacentHTML( 'afterbegin', commentFragment);
  });
};

const cleanBigPictureData = () => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = '';
  bigPicture.querySelector('.likes-count').textContent = '';
  bigPicture.querySelector('.comments-count').textContent = '';
  bigPicture.querySelector('.current-comments-count').textContent = '';
  bigPicture.querySelector('.social__caption').textContent = '';
  bigPicture.querySelector('.social__comments').innerHTML = '';
};

function loadNewComments() {
  if (currentCommentCount < fullCommentList.length - COMMENT_STEP) {
    currentCommentCount += COMMENT_STEP;
  } else {
    currentCommentCount += fullCommentList.length - currentCommentCount;
    commentLoader.classList.add('hidden');
  }

  for (let i = 0; i < currentCommentCount; i++) {
    bigPicture.querySelector('.social__comments').appendChild(fullCommentList[i]);
  }

  bigPicture.querySelector('.current-comments-count').textContent = currentCommentCount;

  if (currentCommentCount === fullCommentList.length) {
    currentCommentCount = COMMENT_STEP;
  }
}

function openBigPicture(picture) {
  comments = picture.comments;
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  createBigPictureData(picture);
  if (comments.length > 5) {
    fullCommentList = bigPicture.querySelector('.social__comments').querySelectorAll('.social__comment');

    bigPicture.querySelector('.social__comments').innerHTML = '';

    for (let i = 0; i < COMMENT_STEP; i++) {
      bigPicture.querySelector('.social__comments').appendChild(fullCommentList[i]);
    }

    commentLoader.addEventListener('click', loadNewComments);
  } else {
    document.querySelector('.social__comment-count').classList.add('hidden');
    commentLoader.classList.add('hidden');
  }

  document.addEventListener('keydown', onDocumentKeydown);
  closeBtn.addEventListener('click', onCloseBtnClick);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  cleanBigPictureData();

  fullCommentList= 0;

  countComments.classList.remove('hidden');
  commentLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeBtn.removeEventListener('click', onCloseBtnClick);
  commentLoader.removeEventListener('click', loadNewComments);
}
