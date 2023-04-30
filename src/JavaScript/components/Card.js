export class Card {
  #cardData;
  #cardElementTemplate;
  #cardElement;
  #handleCardClick;
  #openPopUpDelete;
  #form;
  #putLike;
  #deleteLike;

  constructor(
    cardData,
    cardElementTemplate,
    handleCardClick,
    openPopUpDelete,
    putLike,
    deleteLike
  ) {
    this.#cardData = cardData;
    this.#cardElementTemplate = cardElementTemplate;
    this.#handleCardClick = handleCardClick;
    this.#openPopUpDelete = openPopUpDelete;
    this.#putLike = putLike;
    this.#deleteLike = deleteLike;
  }

  #toggleLike(evt) {
    /* evt.target.classList.toggle("elements__like_active"); */
    if (!evt.target.classList.contains("elements__like_active")) {
      this.#putLike(evt);
    } else {
      this.#deleteLike(evt);
    }
  }

  #handleLike() {
    this.#cardElement
      .querySelector(".elements__like")
      .addEventListener("click", (evt) => {
        this.#toggleLike(evt);
      });
  }

  #handleDelete(item, userId) {
    this.#cardElement
      .querySelector(".elements__delete")
      .addEventListener("click", (evt) => {
        this.#openPopUpDelete(evt);
      });
    if (item.owner._id == userId) {
      this.#cardElement
        .querySelector(".elements__delete")
        .classList.add("popup_opened");
    }
  }

  #handleImageClick() {
    this.#cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this.#handleCardClick();
      });
  }

  #setEventListeners(item, userId) {
    this.#handleLike();
    this.#handleDelete(item, userId);
    this.#handleImageClick();
  }

  createCard(item, userId) {
    this.#cardElement = this.#cardElementTemplate.cloneNode(true);
    this.#setEventListeners(item, userId);
    const cardImage = this.#cardElement.querySelector(".elements__image");
    cardImage.src = this.#cardData.link;
    cardImage.alt = this.#cardData.name;
    cardImage.id = this.#cardData._id;
    this.#cardElement.querySelector(".elements__text").textContent =
      this.#cardData.name;
    this.#cardElement.querySelector(".elements__like-counte").textContent =
      this.#cardData.likes.length;
    return this.#cardElement;
  }
}
