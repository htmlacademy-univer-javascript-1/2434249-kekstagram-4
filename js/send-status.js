import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successBtn = successTemplate.querySelector('.success__button');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorBtn = errorTemplate.querySelector('.error__button');

const closeMessage = (evt) => {
  if (isEscapeKey(evt) || evt.target === successBtn || evt.target === successTemplate){
    body.removeChild(successTemplate);
    successBtn.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  } else if (evt.target === errorTemplate || evt.target === errorTemplate || isEscapeKey(evt)) {
    body.removeChild(errorTemplate);
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
  body.appendChild(successTemplate);
  successBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export const showError = () => {
  body.appendChild(errorTemplate);
  errorBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

