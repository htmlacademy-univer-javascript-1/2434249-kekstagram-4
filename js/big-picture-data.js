import {bigPicture} from './big-picture-render.js';

export const createBigPictureData = (picture) => {
  bigPicture.querySelector('.social__comment-count').parentNode.removeChild(bigPicture.querySelector('.social__comment-count'));
  const commentCount = `<div class="social__comment-count"><span class="current-comments-count">${5}</span> из <span class="comments-count">${125}</span> комментариев</div>`;
  bigPicture.querySelector('.social__comments').insertAdjacentHTML( 'beforebegin', commentCount);

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.social__comments').innerHTML = '';

  for (const comments of picture.comments) {
    const comment = `<li class="social__comment">
  <img
      class="social__picture"
      src="${comments.avatar}"
      alt="${comments.name}"
      width="35" height="35">
  <p class="social__text">${comments.message}</p>
</li>`;
    bigPicture.querySelector('.social__comments').insertAdjacentHTML( 'afterbegin', comment);
  }
};

export const cleanBigPictureData = () => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = '';
  bigPicture.querySelector('.likes-count').textContent = '';
  bigPicture.querySelector('.comments-count').textContent = '';
  bigPicture.querySelector('.current-comments-count').textContent = '';
  bigPicture.querySelector('.social__caption').textContent = '';
  bigPicture.querySelector('.social__comments').innerHTML = '';
};
