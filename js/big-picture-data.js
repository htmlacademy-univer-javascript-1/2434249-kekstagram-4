import {bigPicture} from './big-picture-render.js';

export const createBigPictureData = (picture) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  for (const comments of picture.comments) {
    const commentsList = `<li class="social__comment">
  <img
      class="social__picture"
      src="${comments.avatar}"
      alt="${comments.name}"
      width="35" height="35">
  <p class="social__text">${comments.message}</p>
</li>`;
    bigPicture.querySelector('.social__comments').insertAdjacentHTML( 'beforeend', commentsList );
  }
};

export const cleanBigPictureData = () => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = '';
  bigPicture.querySelector('.likes-count').textContent = '';
  bigPicture.querySelector('.comments-count').textContent = '';
  bigPicture.querySelector('.social__caption').textContent = '';
  bigPicture.querySelector('.social__comments').innerHTML = '';
};
