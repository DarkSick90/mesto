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

function hasInvalidInput(config, form) {
  const formInputs = Array.from(form.querySelectorAll(config.inputSelector));
  const allInputsValidate = formInputs.some((input) => {
    return !input.validity.valid;
  });
  return allInputsValidate;
}

function toggleSubmitButtonState(input, config, form) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  const hasFormErrors = hasInvalidInput(config, form);
  if (hasFormErrors) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function validateInput(input, config) {
  const error = document.querySelector(`#${input.id}-error`);
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

function enableValidation(config) {
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setHandlers(config, form);
  });
}

enableValidation(validationConfig);
