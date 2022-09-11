const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function validateInput(input, config) {
  const error = document.querySelector(`#${input.id}-error`);
  const form = input.closest(config.formSelector);
  const submitButton = form.querySelector(config.submitButtonSelector)
  console.log(form)
  if (!input.validity.valid) {
    input.classList.add(config.inputErrorClass);
    error.textContent = input.validationMessage;
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.setAttribute("disabled", "disabled")
  }
  else {
    input.classList.remove(config.inputErrorClass)
    error.textContent = '';
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.removeAttribute("disabled", "disabled")
  };
}


function setHandlers(config) {
  const inputs = Array.from(document.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(input, config);
    })
  })
}


function enableValidation(config) {
const form = Array.from(document.querySelectorAll(config.formSelector));
form.forEach((item) => {
  item.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
  setHandlers(config);
})
}

enableValidation(validationConfig)
