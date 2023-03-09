import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
const formData = {};

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

populateInput();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  console.log(formData);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateInput() {
  const isFilledInput = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (isFilledInput) {
    for (const key of Object.keys(isFilledInput)) {
      formEl.elements[key].value = isFilledInput[key];
      formData[key] = isFilledInput[key];
    }
  }
}
