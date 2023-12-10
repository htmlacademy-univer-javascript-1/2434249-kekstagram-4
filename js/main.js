import {renderingImages, generatePictures} from './pictures-render.js';
import {renderBigPicture} from './big-picture-render.js';
import {uploadNewImg} from './upload-form.js';

renderingImages();
const picturesArray = document.querySelectorAll('.picture');
renderBigPicture(picturesArray, generatePictures);
uploadNewImg();
