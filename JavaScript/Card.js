const popUpBigImage = document.querySelector(".popup_window_big-image");
const popIpBigImageImage = document.querySelector(".popup__big-image-image");
const popUpBigImageDescription = document.querySelector(".popup__description");

import { handleEsc, openPopup, closePopup } from "./utils/utils.js";

export class Card {
  #cardData;
  #cardElementTemplate;

  constructor(cardData, cardElementTemplate) {
    this.#cardData = cardData;
    this.#cardElementTemplate = cardElementTemplate;
  }

  #handleLike() {
    this.#cardElementTemplate
      .querySelector(".elements__like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("elements__like_active");
      });
  }

  #handleDelete() {
    this.#cardElementTemplate
      .querySelector(".elements__delete")
      .addEventListener("click", function (evt) {
        evt.target.closest(".elements__element").remove();
      });
  }

  #handleOpenImage(cardData) {
    this.#cardElementTemplate
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
    this.#cardElementTemplate = this.#cardElementTemplate.cloneNode(true);
    this.#setEventListeners();
    const cardImage =
      this.#cardElementTemplate.querySelector(".elements__image");
    cardImage.src = this.#cardData.link;
    cardImage.alt = this.#cardData.name;
    this.#cardElementTemplate.querySelector(".elements__text").textContent =
      this.#cardData.name;
    return this.#cardElementTemplate;
  }
}
