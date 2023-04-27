import { PopUp } from "./Popup.js";

export class PopupWithForm extends PopUp {
  #form;
  #submitHandler;
  #inputs;
  #popUpSelector;
  #data;

  constructor(popUpSelector, submitHandler, data) {
    super(popUpSelector);
    this.#popUpSelector = document.querySelector(popUpSelector);
    this.#form = this.#popUpSelector.querySelector(".popup__form");
    this.#submitHandler = submitHandler;
    this.#inputs = this.#form.querySelectorAll(".popup__input");
    this.#data = data;
  }

  getInputValues() {
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
      this.#submitHandler(this.getInputValues());
      this.#form.querySelector(".popup__btn-save").value = "Сохранение...";
    });
  }

  setEventListenersDelet() {
    super.setEventListeners();
  }

  close() {
    super.close();
    this.#form.reset();
  }
}
