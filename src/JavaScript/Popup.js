const popUpOverlay = Array.from(document.querySelectorAll(".popup"));
const closeButtons = document.querySelectorAll(".popup__btn-close");

export class PopUp {
  #popUpSelector;

  constructor(popUpSelector) {
    this.#popUpSelector = document.querySelector(popUpSelector);
  }

  open() {
    this.#popUpSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this.#handleEscClose.bind(this));
  }

  close() {
    this.#popUpSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this.#handleEscClose.bind(this));
  }

  #handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.#popUpSelector
      .querySelector(".popup__btn-close")
      .addEventListener("click", () => {
        this.close();
      });

    this.#popUpSelector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
