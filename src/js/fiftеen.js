import buttonTemplate from '../templates/fifteen.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import 'basiclightbox/src/styles/main.scss';

const instance = basicLightbox.create(`
    <h1 class = "title">YOU WIN!</h1>`);

const wrapRef = document.querySelector('.wrapper');
const array = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0],
];

const arr = [];
for (let i = 1; i <= 15; i++) arr.push(i);

const getRandomInRange = (min, max) => {
  let [elem] = arr.splice(
    arr.indexOf(Math.floor(Math.random() * (max - min + 1)) + min),
    1,
  );
  return elem;
};

const newArray = array.map(item => {
  return item.map(nextItem => {
    if (nextItem) {
      nextItem = getRandomInRange(1, 15);
    }
    return nextItem;
  });
});
const Winner = () => {
  if (JSON.stringify(newArray) === JSON.stringify(array)) {
    instance.show();
  }
};

// Winner();

wrapRef.innerHTML = buttonTemplate(newArray);

const getIndexElement = searchValue => {
  for (let i = 0; i < newArray.length; i += 1) {
    let j = newArray[i].indexOf(searchValue);
    if (j >= 0) {
      return [i, j];
    }
  }
  return null;
};

const toggleNumberInArray = ([indexFirst, indexSecond], searchValue) => {
  const el = wrapRef.querySelector(`[data-value="${searchValue}"]`);

  const toggleElement = (numberFirst, numberSecond) => {
    newArray[indexFirst + numberFirst][
      indexSecond + numberSecond
    ] = searchValue;
    newArray[indexFirst][indexSecond] = 0;
  };

  const prevElement = newArray[indexFirst][indexSecond - 1];
  const nextElement = newArray[indexFirst][indexSecond + 1];
  const topElement =
    indexFirst === 0 ? null : newArray[indexFirst - 1][indexSecond];
  const bottomElement =
    indexFirst === 3 ? null : newArray[indexFirst + 1][indexSecond];

  if (prevElement === 0) {
    toggleElement(0, -1);
    el.style.left = `${parseInt(el.style.left, 10) - 62}px`;
    return;
  }
  if (nextElement === 0) {
    toggleElement(0, 1);
    el.style.left = `${parseInt(el.style.left, 10) + 62}px`;
    return;
  }
  if (topElement === 0) {
    toggleElement(-1, 0);
    el.style.bottom = `${parseInt(el.style.bottom, 10) + 62}px`;
    return;
  }
  if (bottomElement === 0) {
    toggleElement(1, 0);
    el.style.bottom = `${parseInt(el.style.bottom, 10) - 62}px`;
    return;
  }
};

wrapRef.addEventListener('click', event => {
  const searchValue = +event.target.textContent;
  if (!searchValue) return;
  toggleNumberInArray(getIndexElement(searchValue), searchValue);

  Winner();
});
