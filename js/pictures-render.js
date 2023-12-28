const pictureTemplateNode = document.querySelector('#picture').content.querySelector('.picture');
const pictureListNode = document.querySelector('.pictures');

const similarListNode = document.createDocumentFragment();

const destroyPictures = () => document.querySelectorAll('.picture').forEach((picture) => pictureListNode.removeChild(picture));

export const renderImages = (generatePictures) => {
  generatePictures.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplateNode.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListNode.appendChild(pictureElement);
  });

  destroyPictures();
  pictureListNode.appendChild(similarListNode);
};
