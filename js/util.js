export const isEscapeKey = (evt) => evt.key === 'Escape';

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getPhotoRank = (photo) => photo.comments.length;

export const sortByComments = (firtsPhoto, secondPhoto) => getPhotoRank(secondPhoto) - getPhotoRank(firtsPhoto);

export const sortRandom = () => Math.random() - 0.5;
