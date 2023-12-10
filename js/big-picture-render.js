import {isEscapeKey} from './util.js';

const COMMENT_STEP = 5;
let currentCommentCount = COMMENT_STEP;
let comments = 0;
let fullCommentArray = null;

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const countComments = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.social__comments-loader');

const bigPictureInfo = {
  img:  bigPicture.querySelector('.big-picture__img').querySelector('img'),
  likes: bigPicture.querySelector('.likes-count'),
  description: bigPicture.querySelector('.social__caption'),
  socialComments: bigPicture.querySelector('.social__comments'),
  commentCount: bigPicture.querySelector('.comments-count')
};

const getComentTemplate = (comment) => {
  const commentTemplate = `<li class="social__comment">
    <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>`;

  return commentTemplate;
};

const renderBigPictureData = (picture) => {
  bigPicture.querySelector('.social__comment-count').innerHTML = '';
  const commentCountTemplate = '<span class="current-comments-count"></span> из <span class="comments-count"></span> комментариев';
  bigPicture.querySelector('.social__comment-count').innerHTML = commentCountTemplate;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

  bigPictureInfo.img.src = picture.url;
  bigPictureInfo.likes.textContent = picture.likes;
  bigPictureInfo.description.textContent = picture.description;
  bigPictureInfo.socialComments.innerHTML = '';

  picture.comments.forEach((comment) => {
    bigPictureInfo.socialComments.insertAdjacentHTML( 'afterbegin', getComentTemplate(comment));
  });
};

const cleanBigPictureData = () => {
  bigPictureInfo.img.src = '';
  bigPictureInfo.likes.textContent = '';
  bigPictureInfo.description.textContent = '';
  bigPictureInfo.socialComments.innerHTML = '';
  bigPicture.querySelector('.current-comments-count').textContent = '';
  bigPicture.querySelector('.comments-count').textContent = '';
};

const fillComments = (limiter) => {
  for (let i = 0; i < limiter; i++) {
    bigPictureInfo.socialComments.appendChild(fullCommentArray[i]);
  }
  bigPicture.querySelector('.current-comments-count').textContent = limiter;
};

const loadNewComments = () => {
  if (currentCommentCount < fullCommentArray.length - COMMENT_STEP) {
    currentCommentCount += COMMENT_STEP;
  } else {
    currentCommentCount += fullCommentArray.length - currentCommentCount;
    commentLoader.classList.add('hidden');
  }

  fillComments(currentCommentCount);

  if (currentCommentCount === fullCommentArray.length) {
    currentCommentCount = COMMENT_STEP;
  }
};

const openBigPicture = (picture) => {
  comments = picture.comments;
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  renderBigPictureData(picture);

  if (comments.length > COMMENT_STEP) {
    fullCommentArray = bigPictureInfo.socialComments.querySelectorAll('.social__comment');
    bigPictureInfo.socialComments.innerHTML = '';

    fillComments(COMMENT_STEP);

    commentLoader.addEventListener('click', onCommentLoadBtnClick);
  } else {
    countComments.classList.add('hidden');
    commentLoader.classList.add('hidden');
  }

  document.addEventListener('keydown', onDocumentKeydown);
  closeBtn.addEventListener('click', onCloseBtnClick);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  cleanBigPictureData();

  fullCommentArray= 0;

  countComments.classList.remove('hidden');
  commentLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeBtn.removeEventListener('click', onCloseBtnClick);
  commentLoader.removeEventListener('click', onCommentLoadBtnClick);
};

function onCloseBtnClick() {
  closeBigPicture();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onCommentLoadBtnClick() {
  loadNewComments();
}

export const renderBigPicture = (pictures, data) => {
  pictures.forEach((picture, index) =>  {
    picture.addEventListener('click', () => openBigPicture(data[index]));
  });
};
