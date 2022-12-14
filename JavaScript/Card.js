const popUpBigImage = document.querySelector(".popup_window_big-image");
const popIpBigImageImage = document.querySelector(".popup__big-image-image");
const popUpBigImageDescription = document.querySelector(".popup__description");

import { handleEsc, openPopup, closePopup } from "./utils/utils.js";

export class Card {
  #cardData;
  #cardElementTemplate;
  #cardElement

  constructor(cardData, cardElementTemplate) {
    this.#cardData = cardData;
    this.#cardElementTemplate = cardElementTemplate;
  }

  #handleLike() {
    this.#cardElement
      .querySelector(".elements__like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("elements__like_active");
      });
  }

  #handleDelete() {
    this.#cardElement
      .querySelector(".elements__delete")
      .addEventListener("click", function (evt) {
        evt.target.closest(".elements__element").remove();
      });
  }

  #handleOpenImage(cardData) {
    this.#cardElement
      .querySelector(".elements__image")
      .addEventListener("click", function (evt) {
        openPopup(popUpBigImage);
        popIpBigImageImage.src = cardData.link;
        popUpBigImageDescription.alt = cardData.name;
        popUpBigImageDescription.textContent = cardData.name;
      });
  }

  #setEventListeners() {
    this.#handleLike();
    this.#handleDelete();
    this.#handleOpenImage(this.#cardData);
  }

  createCard() {
    this.#cardElement = this.#cardElementTemplate.cloneNode(true);
    this.#setEventListeners();
    const cardImage =
      this.#cardElement.querySelector(".elements__image");
    cardImage.src = this.#cardData.link;
    cardImage.alt = this.#cardData.name;
    this.#cardElement.querySelector(".elements__text").textContent =
      this.#cardData.name;
    return this.#cardElement;
  }
}
