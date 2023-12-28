import {isEscapeKey} from './util.js';
import {ErrorText, sendData} from './api.js';

const PICTURE_SCALE_STEP = 25;
const PICTURE_SCALE_RATIO = 0.01;
const PictureScaleValue = {
  MAX: 100,
  MIN: 25
};
const EffectSetting = {
  NONE: {
    name: 'effect-none',
    style: '',
    unit: ''
  },
  CHROME: {
    name: 'effect-chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  SEPIA: {
    name: 'effect-sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  MARVIN: {
    name: 'effect-marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  PHOBOS: {
    name: 'effect-phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  HEAT: {
    name: 'effect-heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const body = document.querySelector('body');

const uploadBtnElement = body.querySelector('.img-upload__input');
const uploadOverlayElement = body.querySelector('.img-upload__overlay');
const closeBtnElement = uploadOverlayElement.querySelector('.img-upload__cancel');
const textHashtagElement = uploadOverlayElement.querySelector('.text__hashtags');
const textDescritionElement = uploadOverlayElement.querySelector('.text__description');
const uploadFormElement = document.getElementById('upload-select-image');

const scaleSmallerBtnElement = uploadOverlayElement.querySelector('.scale__control--smaller');
const scaleBiggerBtnElement = uploadOverlayElement.querySelector('.scale__control--bigger');
const scaleControlValueElment = uploadOverlayElement.querySelector('.scale__control--value');
const pictureElement = uploadOverlayElement.querySelector('.img-upload__preview').querySelector('img');
const sliderForEffect = uploadOverlayElement.querySelector('.effect-level__slider');
const effectElement = uploadOverlayElement.querySelector('.effects__list');
const effectLevelElement = uploadOverlayElement.querySelector('.img-upload__effect-level');
const effectlevelValueElement =  effectLevelElement.querySelector('.effect-level__value');
const submitBtnElement = uploadOverlayElement.querySelector('.img-upload__submit');
const effectPreviewElements = uploadOverlayElement.querySelectorAll('.effects__preview');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const isValidHashTagCount = () => {
  const hashtags = textHashtagElement.value.trim().split(' ');
  return hashtags.length <= 5;
};

const isValidHashTagType = () => {
  const hashtags = textHashtagElement.value.trim().split(' ');
  const validHashTag = /^#[a-zа-яё0-9]{1,19}$/;
  if (textHashtagElement.value === '') {
    return true;
  } else {
    return hashtags.every((hashtag) => validHashTag.test(hashtag));
  }
};

const isDuplicateHashTag = () => {
  const hashtags = textHashtagElement.value.trim().split(' ');
  return new Set(hashtags).size === hashtags.length;
};

const disableSubmitBtn = () => {
  submitBtnElement.disabled = true;
};

export const enableSubmitBtn = () => {
  submitBtnElement.disabled = false;
};

const sendingForm = (evt) => {
  evt.preventDefault();
  const isValide = pristine.validate();
  if(isValide){
    disableSubmitBtn();
    const formData = new FormData(evt.target);
    sendData(formData, ErrorText);
  }
};

function onUploadFormSubmit(evt) {
  sendingForm(evt);
}

const formValidation = () => {
  pristine.addValidator(textHashtagElement, isValidHashTagCount, 'Превышено количество хэш-тегов');
  pristine.addValidator(textHashtagElement, isValidHashTagType, 'Введён невалидный хэш-тег');
  pristine.addValidator(textHashtagElement, isDuplicateHashTag, 'Хэш-теги повторяются');

  uploadFormElement.addEventListener('submit', onUploadFormSubmit);
};

const createEffectSlider = () => {
  effectLevelElement.classList.add('hidden');
  noUiSlider.create(sliderForEffect, {
    range: {
      min: 0,
      max: 0,
    },
    start: 0,
    step: 1,
    connect: 'lower',
  });
};

const openUploadForm = () => {
  body.classList.add('modal-open');
  uploadOverlayElement.classList.remove('hidden');
  closeBtnElement.addEventListener('click', oncloseBtnElementClick);
  document.addEventListener('keydown', onDocumentKeydown);

  textDescritionElement.addEventListener('focus', ontextDescritionElementFocus);
  textDescritionElement.addEventListener('blur', ontextDescritionElementBlur);
  textHashtagElement.addEventListener('focus', ontextHashtagElementFocus);
  textHashtagElement.addEventListener('blur', ontextHashtagElementBlur);

  scaleBiggerBtnElement.addEventListener('click', onscaleBiggerBtnElementClick);
  scaleSmallerBtnElement.addEventListener('click', onscaleSmallerBtnElementClick);
  effectElement.addEventListener('change', onEffectContainerChange);

  pictureElement.src = URL.createObjectURL(uploadBtnElement.files[0]);
  effectPreviewElements.forEach((item) => {
    item.style.backgroundImage = `url("${URL.createObjectURL(uploadBtnElement.files[0])}")`;
  });

  pictureElement.style.scale = 1;
  scaleControlValueElment.value = '100%';
  pictureElement.style.filter = 'none';
  submitBtnElement.disabled = false;
  formValidation();
  createEffectSlider();
};

export const closeUploadForm = () => {
  body.classList.remove('modal-open');
  uploadOverlayElement.classList.add('hidden');
  closeBtnElement.removeEventListener('click', oncloseBtnElementClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  textDescritionElement.removeEventListener('focus', ontextDescritionElementFocus);
  textDescritionElement.removeEventListener('blur', ontextDescritionElementBlur);
  textHashtagElement.removeEventListener('focus', ontextHashtagElementFocus);
  textHashtagElement.removeEventListener('blur', ontextHashtagElementBlur);

  scaleBiggerBtnElement.removeEventListener('click', onscaleBiggerBtnElementClick);
  scaleSmallerBtnElement.removeEventListener('click', onscaleSmallerBtnElementClick);
  uploadFormElement.removeEventListener('submit', onUploadFormSubmit);

  pictureElement.src = '';
  effectPreviewElements.forEach((item) => {
    item.style.backgroundImage = 'none';
  });

  uploadBtnElement.value = '';
  textHashtagElement.textContent = '';
  textDescritionElement.textContent = '';
  sliderForEffect.noUiSlider.destroy();
  pictureElement.style.scale = 1;
  scaleControlValueElment.value = '';
  pictureElement.style.filter = 'none';
};

const isPicture = () => {
  const url = document.getElementById('upload-file').value;
  const isImage =  /\.(jpg|jpeg|gif|png)$/.test(url);
  if (isImage) {
    openUploadForm();
  }
};

function ontextDescritionElementFocus() {
  document.removeEventListener('keydown', onDocumentKeydown);
}

function ontextDescritionElementBlur() {
  document.addEventListener('keydown', onDocumentKeydown);
}

function ontextHashtagElementFocus() {
  document.removeEventListener('keydown', onDocumentKeydown);
}

function ontextHashtagElementBlur() {
  document.addEventListener('keydown', onDocumentKeydown);
}

function onuploadBtnElementClick() {
  isPicture();
}

function oncloseBtnElementClick() {
  closeUploadForm();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const updateScaleValueBig = () => {
  scaleControlValueElment.value = scaleControlValueElment.value.slice(0, -1) < PictureScaleValue.MAX
    ? `${+scaleControlValueElment.value.slice(0, -1) + PICTURE_SCALE_STEP}%`
    : `${PictureScaleValue.MAX}%`;

  pictureElement.style.scale = +scaleControlValueElment.value.slice(0, -1) * PICTURE_SCALE_RATIO;
};

const updateScaleValueSmall = () => {
  scaleControlValueElment.value = scaleControlValueElment.value.slice(0, -1) > PictureScaleValue.MIN
    ? `${+scaleControlValueElment.value.slice(0, -1) - PICTURE_SCALE_STEP}%`
    : `${PictureScaleValue.MIN}%`;

  pictureElement.style.scale = +scaleControlValueElment.value.slice(0, -1) * PICTURE_SCALE_RATIO;
};

function onscaleSmallerBtnElementClick() {
  updateScaleValueSmall();
}

function onscaleBiggerBtnElementClick() {
  updateScaleValueBig();
}

const updateSlider = (effect) => {
  sliderForEffect.noUiSlider.on('update', () => {
    pictureElement.style.filter = `${effect.style}(${sliderForEffect.noUiSlider.get()}${effect.unit})`;
    effectlevelValueElement.value = sliderForEffect.noUiSlider.get();
  });
  sliderForEffect.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.max,
    step: effect.step
  });
};

const effectApplication = (evt) => {
  if (evt.target.id === EffectSetting.NONE) {
    pictureElement.style.filter = 'none';
    effectLevelElement.classList.add('hidden');
  }
  else {
    effectLevelElement.classList.remove('hidden');
    if (evt.target.id === EffectSetting.CHROME.name) {
      updateSlider(EffectSetting.CHROME);
    }
    if (evt.target.id === EffectSetting.SEPIA.name) {
      updateSlider(EffectSetting.SEPIA);
    }
    if (evt.target.id === EffectSetting.MARVIN.name) {
      updateSlider(EffectSetting.MARVIN);
    }
    if (evt.target.id === EffectSetting.PHOBOS.name) {
      updateSlider(EffectSetting.PHOBOS);
    }
    if (evt.target.id === EffectSetting.HEAT.name) {
      updateSlider(EffectSetting.HEAT);
    }
  }
};

function onEffectContainerChange(evt) {
  effectApplication(evt);
}

export const uploadNewImg = () => {
  uploadBtnElement.addEventListener('input', onuploadBtnElementClick);
};
