const imageCard = document.querySelector("#element").content;
const cardsContainer = document.querySelector(".elements__list");
const popUpBigImage = document.querySelector(".popup_window_big-image");
const popIpBigImageImage = document.querySelector(".popup__big-image-image");
const popUpBigImageDescription = document.querySelector(".popup__description");

import {handleEsc, openPopup, closePopup} from "./utils/utils.js"

  export class Card {
  
    static cardElementTemplate = imageCard.querySelector(".elements__element");
  
  #cardData
  #cardElementTemplate
  
    constructor(cardData) {
      this.#cardData = cardData;
    }
  
  
    #handleLike(){
      this.#cardElementTemplate
      .querySelector(".elements__like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("elements__like_active");
      });
    }
  
    #handleDelete(){
      this.#cardElementTemplate
          .querySelector(".elements__delete")
          .addEventListener("click", function (evt) {
            evt.target.closest(".elements__element").remove();
          });
    }
  
    #handleOpenImage(){
      this.#cardElementTemplate
      .querySelector(".elements__image")
      .addEventListener("click", function (evt) {
        openPopup(popUpBigImage);
        popIpBigImageImage.src = this.#cardData.link;
        popUpBigImageDescription.alt = this.#cardData.name;
        popUpBigImageDescription.textContent = this.#cardData.name;
      });
    }
  
    createCard() {
      this.#cardElementTemplate = this.constructor.cardElementTemplate.cloneNode(true);
      this.#handleLike();
      this.#handleDelete();
      this.#handleOpenImage()
        this.#cardElementTemplate.querySelector(".elements__image").src = this.#cardData.link;
        this.#cardElementTemplate.querySelector(".elements__image").alt = this.#cardData.name;
        this.#cardElementTemplate.querySelector(".elements__text").textContent = this.#cardData.name;
        return this.#cardElementTemplate
    }
  }
  
