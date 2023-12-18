import {isEscapeKey} from './util.js';

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

const uploadBtn = body.querySelector('.img-upload__input');
const uploadOverlay = body.querySelector('.img-upload__overlay');
const closeBtn = uploadOverlay.querySelector('.img-upload__cancel');
const textHashtag = uploadOverlay.querySelector('.text__hashtags');
const textDescrition = uploadOverlay.querySelector('.text__description');
const uploadForm = document.getElementById('upload-select-image');

const scaleBtnSmaller = uploadOverlay.querySelector('.scale__control--smaller');
const scaleBtnBigger = uploadOverlay.querySelector('.scale__control--bigger');
const scaleControlValue = uploadOverlay.querySelector('.scale__control--value');
const picture = uploadOverlay.querySelector('.img-upload__preview').querySelector('img');
const sliderForEffect = uploadOverlay.querySelector('.effect-level__slider');
const effectContainer = uploadOverlay.querySelector('.effects__list');
const effectLevel = uploadOverlay.querySelector('.img-upload__effect-level');
const effectlevelValue =  effectLevel.querySelector('.effect-level__value');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

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

const sendingForm = (evt) => {
  const isValide = pristine.validate();
  if(!isValide){
    evt.preventDefault();
  }
};

function onUploadFormSubmit(evt) {
  sendingForm(evt);
}

const formValidation = () => {
  pristine.addValidator(textHashtag, isValidHashTagCount, 'Превышено количество хэш-тегов');
  pristine.addValidator(textHashtag, isValidHashTagType, 'Введён невалидный хэш-тег');
  pristine.addValidator(textHashtag, isDuplicateHashTag, 'Хэш-теги повторяются');

  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

const createEffectSlider = () => {
  effectLevel.classList.add('hidden');
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
  uploadOverlay.classList.remove('hidden');
  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);

  textDescrition.addEventListener('focus', onTextAreaFocus);
  textDescrition.addEventListener('blur', onTextAreaBlur);
  textHashtag.addEventListener('focus', onTagAreaFocus);
  textHashtag.addEventListener('blur', onTagAreaBlur);

  scaleBtnBigger.addEventListener('click', onPictureScaleSmallerBtnClick);
  scaleBtnSmaller.addEventListener('click', onPictureScaleBiggerBtnClick);
  effectContainer.addEventListener('change', onEffectContainerChange);

  picture.style.scale = 1;
  scaleControlValue.value = '100%';
  picture.style.filter = 'none';
  formValidation();
  createEffectSlider();
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

  scaleBtnBigger.removeEventListener('click', onPictureScaleSmallerBtnClick);
  scaleBtnSmaller.removeEventListener('click', onPictureScaleBiggerBtnClick);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);

  uploadBtn.value = '';
  textHashtag.textContent = '';
  textDescrition.textContent = '';
  sliderForEffect.noUiSlider.destroy();
  picture.style.scale = 1;
  scaleControlValue.value = '';
  picture.style.filter = 'none';
};

const isPicture = () => {
  const url = document.getElementById('upload-file').value;
  const isImage =  /\.(jpg|jpeg|gif|png)$/.test(url);
  if (isImage) {
    openUploadForm();
  }
};

function onTextAreaFocus() {
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onTextAreaBlur() {
  document.addEventListener('keydown', onDocumentKeydown);
}

function onTagAreaFocus() {
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onTagAreaBlur() {
  document.addEventListener('keydown', onDocumentKeydown);
}

function onUploadBtnClick() {
  isPicture();
}

function onCloseBtnClick() {
  closeUploadForm();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const updateScaleValueSmall = () => {
  scaleControlValue.value = scaleControlValue.value.slice(0, -1) < PictureScaleValue.MAX
    ? `${+scaleControlValue.value.slice(0, -1) + PICTURE_SCALE_STEP}%`
    : `${PictureScaleValue.MAX}%`;

  picture.style.scale = +scaleControlValue.value.slice(0, -1) * PICTURE_SCALE_RATIO;
};

const updateScaleValueBig = () => {
  scaleControlValue.value = scaleControlValue.value.slice(0, -1) > PictureScaleValue.MIN
    ? `${+scaleControlValue.value.slice(0, -1) - PICTURE_SCALE_STEP}%`
    : `${PictureScaleValue.MIN}%`;

  picture.style.scale = +scaleControlValue.value.slice(0, -1) * PICTURE_SCALE_RATIO;
};

function onPictureScaleSmallerBtnClick() {
  updateScaleValueSmall();
}

function onPictureScaleBiggerBtnClick() {
  updateScaleValueBig();
}

const updateSlider = (effect) => {
  sliderForEffect.noUiSlider.on('update', () => {
    picture.style.filter = `${effect.style}(${sliderForEffect.noUiSlider.get()}${effect.unit})`;
    effectlevelValue.value = sliderForEffect.noUiSlider.get();
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
    picture.style.filter = 'none';
    effectLevel.classList.add('hidden');
  }
  else {
    effectLevel.classList.remove('hidden');
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
  uploadBtn.addEventListener('input', onUploadBtnClick);
};
