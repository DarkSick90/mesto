const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__btn-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  buttonCardSubmit: "#save-image",
  inputCardName: "#card-name",
  inputCardUrl: "#card-url",
};

function validateForm(input, config) {
  const form = input.closest(config.formSelector);
  const formInputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);
  const allInputsValidate = formInputs.some((input) => {
    return !input.validity.valid;
  });
  if (allInputsValidate === true) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function validateInput(input, config) {
  const error = document.querySelector(`#${input.id}-error`);
  const form = input.closest(config.formSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  if (!input.validity.valid) {
    input.classList.add(config.inputErrorClass);
    error.textContent = input.validationMessage;
  } else {
    input.classList.remove(config.inputErrorClass);
    error.textContent = "";
  }
}

function setHandlers(config) {
  const inputs = Array.from(document.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input, config);
      validateForm(input, config);
    });
  });
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setHandlers(config);
  });
}

enableValidation(validationConfig);
