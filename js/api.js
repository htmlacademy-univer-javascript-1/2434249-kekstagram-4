import {renderingImages} from './pictures-render.js';
import {renderBigPicture} from './big-picture-render.js';
import {closeUploadForm} from './upload-form.js';
import {showSuccess, showError} from './send-status.js';
import {initFilters} from './filter.js';
import {debounce} from './util.js';

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

export const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const showSuccessMessage = () => {
  closeUploadForm();
  showSuccess();
};

const showErrorMessage = () => {
  closeUploadForm();
  showError();
};

const createLoader = (errorText) => fetch(
  `${BASE_URL}/data`,
  {
    method: 'GET',
    credentials: 'same-origin',
  },).
  then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((pictures) => {
    initFilters(pictures, debounce(renderingImages));
    renderBigPicture(pictures);
  })
  .catch(() => {
    throw new Error(errorText);
  });

const createSender = (body, errorText) => fetch(
  `${BASE_URL}`,
  {
    method: 'POST',
    body
  },)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then(() => showSuccessMessage())
  .catch(() => {
    showErrorMessage();
    throw new Error(errorText);
  });

export const getData = () => createLoader(ErrorText.GET_DATA);

export const sendData = (body) => createSender(body, ErrorText.SEND_DATA);
