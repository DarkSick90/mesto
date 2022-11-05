export const validationConfig = {
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

export class FormValidator{
  constructor(validationConfig){
    this.validationConfig = validationConfig;
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

  enableValidation(validationConfig) {
    const forms = Array.from(
          document.querySelectorAll(this.validationConfig.formSelector)
        ); 
          forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.#setHandlers(this.validationConfig, form);
  });
  }
}