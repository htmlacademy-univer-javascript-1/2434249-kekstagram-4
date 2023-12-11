import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const uploadBtn = body.querySelector('.img-upload__input');
const uploadOverlay = body.querySelector('.img-upload__overlay');
const closeBtn = uploadOverlay.querySelector('.img-upload__cancel');
const textHashtag = uploadOverlay.querySelector('.text__hashtags');
const textDescrition = uploadOverlay.querySelector('.text__description');
const uploadForm = document.getElementById('upload-select-image');

//Нужно ли закинуть с util...
const isValidHashTagCount = () => {
  const hashtags = textHashtag.value.trim().split(' ');
  return hashtags.length <= 5;
};

const isValidHashTagType = () => {
  const hashtags = textHashtag.value.trim().split(' ');
  const validHashTag = /^#[a-zа-яё0-9]{1,19}$/;
  if (textHashtag.value === '') {
    return true;
  } else {
    return hashtags.every((hashtag) => validHashTag.test(hashtag));
  }
};

const isDuplicateHashTag = () => {
  const hashtags = textHashtag.value.trim().split(' ');
  return new Set(hashtags).size === hashtags.length;
};
//...вот эту часть?

const formValidation = () => {
  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'form__error'
  });

  pristine.addValidator(textHashtag, isValidHashTagCount, 'Превышено количество хэш-тегов');
  pristine.addValidator(textHashtag, isValidHashTagType, 'Введён невалидный хэш-тег');
  pristine.addValidator(textHashtag, isDuplicateHashTag, 'Хэш-теги повторяются');

  uploadForm.addEventListener('submit', (evt) =>{
    const isValide = pristine.validate();
    if(!isValide){
      evt.preventDefault();
    }
  });
};

const openUploadForm = () => {
  body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);

  formValidation();

  textDescrition.addEventListener('focus', onTextAreaFocus);
  textDescrition.addEventListener('blur', onTextAreaBlur);
  textHashtag.addEventListener('focus', onTagAreaFocus);
  textHashtag.addEventListener('blur', onTagAreaBlur);
};

const isPicture = () => {
  const url = document.getElementById('upload-file').value;
  const isImage =  /\.(jpg|jpeg|gif|png)$/.test(url);
  if (isImage) {
    openUploadForm();
  } 
};

const closeUploadForm = () => {
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  closeBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  textDescrition.removeEventListener('focus', onTextAreaFocus);
  textDescrition.removeEventListener('blur', onTextAreaBlur);
  textHashtag.removeEventListener('focus', onTagAreaFocus);
  textHashtag.removeEventListener('blur', onTagAreaBlur);

  uploadBtn.value = '';
  textHashtag.textContent = '';
  textDescrition.textContent = '';
};

function onTextAreaFocus() {document.removeEventListener('keydown', onDocumentKeydown);}

function onTextAreaBlur() {document.addEventListener('keydown', onDocumentKeydown);}

function onTagAreaFocus() {document.removeEventListener('keydown', onDocumentKeydown);}

function onTagAreaBlur() {document.addEventListener('keydown', onDocumentKeydown);}

function onUploadBtnClick() {isPicture();}

function onCloseBtnClick() {closeUploadForm();}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

export const uploadNewImg = () => {
  uploadBtn.addEventListener('input', onUploadBtnClick);
};
