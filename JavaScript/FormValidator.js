import {validationConfig} from "./utils/constants.js"

export class FormValidator{
  constructor(validationConfig, formSelector){
    this.validationConfig = validationConfig;
    this.formSelector = formSelector;
  }

 #hasInvalidInput(validationConfig, form) {
  const formInputs = Array.from(form.querySelectorAll(this.validationConfig.inputSelector));
  const allInputsValidate = formInputs.some((input) => {
    return !input.validity.valid;
  });
  return allInputsValidate;
}

 #toggleSubmitButtonState(input, validationConfig, form) {
  const submitButton = form.querySelector(this.validationConfig.submitButtonSelector);
  const hasFormErrors = this.#hasInvalidInput(this.validationConfig, form);
  if (hasFormErrors) {
    submitButton.classList.add(this.validationConfig.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(this.validationConfig.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

 #validateInput(input, validationConfig) {
  const error = document.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    input.classList.add(this.validationConfig.inputErrorClass);
    error.textContent = input.validationMessage;
  } else {
    input.classList.remove(this.validationConfig.inputErrorClass);
    error.textContent = "";
  }
}

   #setHandlers(validationConfig, form) {
  const inputs = Array.from(form.querySelectorAll(this.validationConfig.inputSelector));
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      this.#validateInput(input, validationConfig);
      this.#toggleSubmitButtonState(input, this.validationConfig, form);
    });
  });
}

  enableValidation() {
    this.formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.#setHandlers(this.validationConfig, this.formSelector);
  }
}