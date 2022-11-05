const imageCard = document.querySelector("#element").content;
const cardsContainer = document.querySelector(".elements__list");
const popUpBigImage = document.querySelector(".popup_window_big-image");
const popIpBigImageImage = document.querySelector(".popup__big-image-image");
const popUpBigImageDescription = document.querySelector(".popup__description");

import { openPopup } from "./index.js";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];
  
  
  export class Card {
  
    static cardElementTemplate = imageCard.querySelector(".elements__element");
  
  
  #initialCards
  #cardElementTemplate
  
    constructor(initialCards) {
      this.#initialCards = initialCards;
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
  
    #handleOpenImage(initialCards){
      this.#cardElementTemplate
      .querySelector(".elements__image")
      .addEventListener("click", function (evt) {
        openPopup(popUpBigImage);
        popIpBigImageImage.src = initialCards.link;
        popUpBigImageDescription.alt = initialCards.name;
        popUpBigImageDescription.textContent = initialCards.name;
      });
    }
  
  
    #createCard(initialCards) {
      this.#cardElementTemplate = this.constructor.cardElementTemplate.cloneNode(true);
      this.#handleLike();
      this.#handleDelete();
      this.#handleOpenImage(initialCards)
        this.#cardElementTemplate.querySelector(".elements__image").src = initialCards.link;
        this.#cardElementTemplate.querySelector(".elements__image").alt = initialCards.name;
        this.#cardElementTemplate.querySelector(".elements__text").textContent = initialCards.name;
        return this.#cardElementTemplate
    }
  
    render(initialCards) {
      this.#initialCards.forEach((initialCards) => {
  
        cardsContainer.prepend(this.#createCard(initialCards));
      });
    }
  
    createCardNew(initialCards){
      cardsContainer.prepend(this.#createCard(initialCards));
    }
  }
  
