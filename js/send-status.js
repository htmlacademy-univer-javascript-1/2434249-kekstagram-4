import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const successTemplate = body.querySelector('#success').content.querySelector('.success');
const successBtn = successTemplate.querySelector('.success__button');
const errorTemplate = body.querySelector('#error').content.querySelector('.error');
const errorBtn = errorTemplate.querySelector('.error__button');

const closeMessage = (evt) => {
  if (isEscapeKey(evt) || evt.target === successBtn || evt.target === successTemplate){
    successTemplate.remove();
    successBtn.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  } else if (isEscapeKey(evt) || evt.target === errorTemplate || evt.target === errorBtn) {
    errorTemplate.removeChild();
    errorBtn.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

function onCloseBtnClick(evt) {
  closeMessage(evt);
}

function onDocumentClick(evt) {
  closeMessage(evt);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(evt);
  }
}

export const showSuccess = () => {
  body.append(successTemplate);
  successBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export const showError = () => {
  body.append(errorTemplate);
  errorBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

