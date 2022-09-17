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

const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));


function hasInvalidInput(input, config, form) {
  const formInputs = Array.from(form.querySelectorAll(config.inputSelector));
  const allInputsValidate = formInputs.some((input) => {
    return !input.validity.valid;
  });
  return allInputsValidate
}

function toggleSubmitButtonState(input, config, form) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  const FormIsValid = hasInvalidInput(input, config, form);
  if (FormIsValid) {
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
  if (!input.validity.valid) {
    input.classList.add(config.inputErrorClass);
    error.textContent = input.validationMessage;
  } else {
    input.classList.remove(config.inputErrorClass);
    error.textContent = "";
  }
}

function setHandlers(config, form) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input, config);
      toggleSubmitButtonState(input, config, form);
    });
  });
}

function enableValidation(config, form) {
  form.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setHandlers(config, form);
  });
}

enableValidation(validationConfig, forms);
