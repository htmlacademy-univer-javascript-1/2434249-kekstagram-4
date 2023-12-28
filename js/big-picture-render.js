import {isEscapeKey} from './util.js';

const COMMENT_STEP = 5;
let currentCommentCount = COMMENT_STEP;
let comments = 0;
let fullCommentArray = null;

const body = document.querySelector('body');
const bigPictureElement = body.querySelector('.big-picture');
const closeBtnElement = bigPictureElement.querySelector('.big-picture__cancel');
const countCommentsElement = bigPictureElement.querySelector('.social__comment-count');
const commentLoadBtnElement = bigPictureElement.querySelector('.social__comments-loader');

const bigPictureInfo = {
  img:  bigPictureElement.querySelector('.big-picture__img').querySelector('img'),
  likes: bigPictureElement.querySelector('.likes-count'),
  description: bigPictureElement.querySelector('.social__caption'),
  socialComments: bigPictureElement.querySelector('.social__comments'),
  commentCount: bigPictureElement.querySelector('.comments-count')
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
  bigPictureElement.querySelector('.social__comment-count').innerHTML = '';
  const commentCountTemplate = '<span class="current-comments-count"></span> из <span class="comments-count"></span> комментариев';
  bigPictureElement.querySelector('.social__comment-count').innerHTML = commentCountTemplate;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;

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
  bigPictureElement.querySelector('.current-comments-count').textContent = '';
  bigPictureElement.querySelector('.comments-count').textContent = '';
};

const fillComments = (limiter) => {
  for (let i = 0; i < limiter; i++) {
    bigPictureInfo.socialComments.appendChild(fullCommentArray[i]);
  }
  bigPictureElement.querySelector('.current-comments-count').textContent = limiter;
};

const loadNewComments = () => {
  if (currentCommentCount < fullCommentArray.length - COMMENT_STEP) {
    currentCommentCount += COMMENT_STEP;
  } else {
    currentCommentCount += fullCommentArray.length - currentCommentCount;
    commentLoadBtnElement.classList.add('hidden');
  }

  fillComments(currentCommentCount);

  if (currentCommentCount === fullCommentArray.length) {
    currentCommentCount = COMMENT_STEP;
  }
};

const openBigPicture = (picture) => {
  comments = picture.comments;
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');

  renderBigPictureData(picture);

  if (comments.length > COMMENT_STEP) {
    fullCommentArray = bigPictureInfo.socialComments.querySelectorAll('.social__comment');
    bigPictureInfo.socialComments.innerHTML = '';

    fillComments(COMMENT_STEP);

    commentLoadBtnElement.addEventListener('click', oncommentLoadBtnElementClick);
  } else {
    countCommentsElement.classList.add('hidden');
    commentLoadBtnElement.classList.add('hidden');
  }

  document.addEventListener('keydown', onDocumentKeydown);
  closeBtnElement.addEventListener('click', oncloseBtnElementClick);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');

  cleanBigPictureData();

  fullCommentArray= 0;

  countCommentsElement.classList.remove('hidden');
  commentLoadBtnElement.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeBtnElement.removeEventListener('click', oncloseBtnElementClick);
  commentLoadBtnElement.removeEventListener('click', oncommentLoadBtnElementClick);
};

function oncloseBtnElementClick() {
  closeBigPicture();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function oncommentLoadBtnElementClick() {
  loadNewComments();
}

export const renderBigPicture = (data) => {
  const pictureElements = document.querySelectorAll('.picture__img');
  pictureElements.forEach((picture, index) =>  {
    picture.addEventListener('click', () => openBigPicture(data[index]));
  });
};
