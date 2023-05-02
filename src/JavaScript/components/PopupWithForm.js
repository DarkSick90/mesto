import { PopUp } from "./Popup.js";

export class PopupWithForm extends PopUp {
  #form;
  #submitHandler;
  #inputs;

  constructor(popUpSelector, submitHandler) {
    super(popUpSelector);
    this.#form = this.popUp.querySelector(".popup__form");
    this.#submitHandler = submitHandler;
    this.#inputs = this.#form.querySelectorAll(".popup__input");
  }

  #getInputValues() {
    const values = {};
    this.#inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.#submitHandler(this.#getInputValues());
      this.#form.querySelector(".popup__btn-save").value = "Сохранение...";
    });
  }

  resetForm() {
    this.#form.reset();
  }

  returnText(text) {
    this.#form.querySelector(".popup__btn-save").value = text;
  }
}
