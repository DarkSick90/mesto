
import { validationConfig } from "./utils/constants.js";

export class FormValidator {
  constructor(validationConfig, form) {
    this.validationConfig = validationConfig;
    this.form = form;
    this.formInputs = Array.from(
      this.form.querySelectorAll(this.validationConfig.inputSelector)
    );
    this.submitButton = this.form.querySelector(
      this.validationConfig.submitButtonSelector
    );
  }

  #hasInvalidInput() {
    const allInputsValidate = this.formInputs.some((input) => {
      return !input.validity.valid;
    });
    return allInputsValidate;
  }

  #toggleSubmitButtonState(form) {
    const hasFormErrors = this.#hasInvalidInput(this.validationConfig, form);
    if (hasFormErrors) {
      this.disabledButton()
    } else {
      this.submitButton.classList.remove(
        this.validationConfig.inactiveButtonClass
      );
      this.submitButton.disabled = false;
    }
  }

  #validateInput(input) {
    const error = document.querySelector(`#${input.id}-error`);
    if (!input.validity.valid) {
      input.classList.add(this.validationConfig.inputErrorClass);
      error.textContent = input.validationMessage;
    } else {
      input.classList.remove(this.validationConfig.inputErrorClass);
      error.textContent = "";
    }
  }

  #setHandlers() {
    this.formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.#validateInput(input, validationConfig);
        this.#toggleSubmitButtonState(input, this.validationConfig);
      });
    });
  }

  disabledButton() {
    this.submitButton.disabled = true;
    this.submitButton.classList.add(
      this.validationConfig.inactiveButtonClass
    );
  }

  enableValidation() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.#setHandlers();
  }
}
