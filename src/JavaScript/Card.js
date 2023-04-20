
export class Card {
  #cardData;
  #cardElementTemplate;
  #cardElement;
  #handleCardClick;

  constructor(cardData, cardElementTemplate, handleCardClick) {
    this.#cardData = cardData;
    this.#cardElementTemplate = cardElementTemplate;
    this.#handleCardClick = handleCardClick;
  }

  #toggleLike(evt){
    evt.target.classList.toggle("elements__like_active");
} 

  #handleLike() {
    this.#cardElement
      .querySelector(".elements__like")
      .addEventListener("click", (evt) => {
        this.#toggleLike(evt);
      });
  }

  #deleteCard(evt){
    evt.target.closest(".elements__element").remove();
} 

  #handleDelete() {
    this.#cardElement
      .querySelector(".elements__delete")
      .addEventListener("click", (evt) => {
        this.#deleteCard(evt);
      });
  }

  #handleImageClick() {
    this.#cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this.#handleCardClick();
      });
  }

  #setEventListeners() {
    this.#handleLike();
    this.#handleDelete();
    this.#handleImageClick()
  }

  createCard() {
    this.#cardElement = this.#cardElementTemplate.cloneNode(true);
    this.#setEventListeners();
    const cardImage = this.#cardElement.querySelector(".elements__image");
    cardImage.src = this.#cardData.link;
    cardImage.alt = this.#cardData.name;
    this.#cardElement.querySelector(".elements__text").textContent =
      this.#cardData.name;
    return this.#cardElement;
  }
}
