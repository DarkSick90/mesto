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
      this.#submitHandler(this.#getInputValues(), this.#form);
      this.#form.querySelector(".popup__btn-save").value = "Сохранение...";
    });
  }

  openDelete(evt) {
    super.open();
    this.evt = evt;
    this.id = evt.target
      .closest(".elements__element")
      .querySelector(".elements__image").id;
  }

  setEventListenersDelet() {
    super.setEventListeners();
    this.#form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.#submitHandler(this.id, this.evt);
      this.#form.querySelector(".popup__btn-save").value = "Удаление...";
    });
  }

  close() {
    super.close();
    this.#form.querySelector(".popup__btn-save").value = "Создать";
  }

  closeDelete() {
    super.close();
    this.#form.querySelector(".popup__btn-save").value = "Да";
  }
}
