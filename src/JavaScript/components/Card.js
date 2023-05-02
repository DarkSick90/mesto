export class Card {
  #cardData;
  #cardElementTemplate;
  #cardElement;
  #handleCardClick;
  #openPopUpDelete;
  #putLike;
  #deleteLike;
  #userId;

  constructor(
    cardData,
    userId,
    cardElementTemplate,
    handleCardClick,
    openPopUpDelete,
    putLike,
    deleteLike
  ) {
    this.#cardData = cardData;
    this.#userId = userId;
    this.#cardElementTemplate = cardElementTemplate;
    this.#handleCardClick = handleCardClick;
    this.#openPopUpDelete = openPopUpDelete;
    this.#putLike = putLike;
    this.#deleteLike = deleteLike;
  }

  #toggleLikeServer(evt) {
    if (!evt.target.classList.contains("elements__like_active")) {
      this.#putLike(evt);
    } else {
      this.#deleteLike(evt);
    }
  }

  toggleLike() {
    this.#cardElement
      .querySelector(".elements__like")
      .classList.toggle("elements__like_active");
  }

  setLikeCounte(data) {
    this.data = data;
    this.#cardElement.querySelector(".elements__like-counte").textContent =
      this.data.likes.length;
  }

  #handleLike() {
    this.#cardElement
      .querySelector(".elements__like")
      .addEventListener("click", (evt) => {
        this.#toggleLikeServer(evt);
      });
  }

  #handleDelete() {
    this.#cardElement
      .querySelector(".elements__delete")
      .addEventListener("click", (evt) => {
        this.#openPopUpDelete(evt);
      });
    if (this.#cardData.owner._id == this.#userId) {
      this.#cardElement
        .querySelector(".elements__delete")
        .classList.add("popup_opened");
    }
  }

  deletCard() {
    this.#cardElement.remove();
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
    this.#handleImageClick();
  }

  createCard() {
    this.#cardElement = this.#cardElementTemplate.cloneNode(true);
    this.#setEventListeners();
    const cardImage = this.#cardElement.querySelector(".elements__image");
    cardImage.src = this.#cardData.link;
    cardImage.alt = this.#cardData.name;
    cardImage.id = this.#cardData._id;
    this.#cardElement.querySelector(".elements__text").textContent =
      this.#cardData.name;
    this.#cardElement.querySelector(".elements__like-counte").textContent =
      this.#cardData.likes.length;
    this.#cardData.likes.forEach((element) => {
      if (element._id == this.#userId) {
        this.#cardElement
          .querySelector(".elements__like")
          .classList.add("elements__like_active");
      }
    });
    return this.#cardElement;
  }
}
