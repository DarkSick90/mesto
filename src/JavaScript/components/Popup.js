export class PopUp {
  #popUp;

  constructor(popUpSelector) {
    this.popUp = document.querySelector(popUpSelector);
    this._handleEscClose = this.#handleEscClose.bind(this);
  }

  open() {
    this.popUp.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popUp.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  #handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.popUp
      .querySelector(".popup__btn-close")
      .addEventListener("click", () => {
        this.close();
      });

    this.popUp.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
