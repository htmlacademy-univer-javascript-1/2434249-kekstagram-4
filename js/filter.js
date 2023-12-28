import {sortByComments, sortRandom} from './util.js';
import {debounce} from './util.js';

const MAX_COUNT_RANDOM_CARD = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersContainer = document.querySelector('.img-filters');
const filtersFormContainer = filtersContainer.querySelector('.img-filters__form');

let pictures = null;
let activeFilter = Filter.DEFAULT;
let callback = null;

const filterFunction = {
  [Filter.DEFAULT]: () => pictures,
  [Filter.RANDOM]: () => pictures.slice().sort(sortRandom).slice(0, MAX_COUNT_RANDOM_CARD),
  [Filter.DISCUSSED]: () => pictures.slice().sort(sortByComments)
};

const onFiltersContainerClick = (evt) => {
  const id = evt.target.id;
  if (id && id !== activeFilter) {
    filtersFormContainer.querySelector(`#${activeFilter}`).classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    activeFilter = id;
    if (callback) {
      callback(filterFunction[id]());
    }
  }
};

export const initFilters = (data, cb) => {
  pictures = data.slice();
  callback = cb;

  filtersContainer.classList.remove('img-filters--inactive');

  filtersContainer.addEventListener('click', debounce(onFiltersContainerClick));

  cb(pictures);
};
