import { PopUp } from "./Popup.js";

export class PopupWithConfirmation extends PopUp {
  #form;
  #submitHandler;

  constructor(popUpSelector, submitHandler) {
    super(popUpSelector);
    this.#form = this.popUp.querySelector(".popup__form");
    this.#submitHandler = submitHandler;
  }

  open(evt, item) {
    super.open();
    this.evt = evt;
    this.item = item;
    this.id = evt.target
      .closest(".elements__element")
      .querySelector(".elements__image").id;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.#submitHandler(this.id, this.item);
      this.#form.querySelector(".popup__btn-save").value = "Удаление...";
    });
  }

  close() {
    super.close();
  }

  returnText(text) {
    this.#form.querySelector(".popup__btn-save").value = text;
  }
}
