const popUpImage = document.querySelector(".popup_window_image");
const buttonCardSubmit = popUpImage.querySelector("#save-image");

import { validationConfig } from "./utils/constants.js";

export class FormValidator {
  constructor(validationConfig, forms) {
    this.validationConfig = validationConfig;
    this.forms = forms;
    this.formInputs = Array.from(
      this.forms.querySelectorAll(this.validationConfig.inputSelector)
    );
    this.submitButton = this.forms.querySelector(
      this.validationConfig.submitButtonSelector
    );
    this.inputs = Array.from(
      this.forms.querySelectorAll(this.validationConfig.inputSelector)
    );
  }

  #hasInvalidInput(validationConfig, form) {
    const allInputsValidate = this.formInputs.some((input) => {
      return !input.validity.valid;
    });
    return allInputsValidate;
  }

  #toggleSubmitButtonState(input, validationConfig, form) {
    const hasFormErrors = this.#hasInvalidInput(this.validationConfig, form);
    if (hasFormErrors) {
      this.submitButton.classList.add(
        this.validationConfig.inactiveButtonClass
      );
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove(
        this.validationConfig.inactiveButtonClass
      );
      this.submitButton.disabled = false;
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
    this.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.#validateInput(input, validationConfig);
        this.#toggleSubmitButtonState(input, this.validationConfig, form);
      });
    });
  }

  disabledButton() {
    buttonCardSubmit.disabled = true;
    buttonCardSubmit.classList.add("popup__btn-save_disabled");
  }

  enableValidation() {
    this.forms.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.#setHandlers();
  }
}
