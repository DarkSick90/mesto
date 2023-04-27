export class Card {
  #cardData;
  #cardElementTemplate;
  #cardElement;
  #handleCardClick;
  #deleteCardFromServer;
  #openPopUpDelete;
  #form;
  #putLike;
  #deleteLike;

  constructor(
    cardData,
    cardElementTemplate,
    handleCardClick,
    deleteCardFromServer,
    openPopUpDelete,
    putLike,
    deleteLike
  ) {
    this.#cardData = cardData;
    this.#cardElementTemplate = cardElementTemplate;
    this.#handleCardClick = handleCardClick;
    this.#deleteCardFromServer = deleteCardFromServer;
    this.#openPopUpDelete = openPopUpDelete;
    this.#form = document.querySelector(".popup__form-delete");
    this.#putLike = putLike;
    this.#deleteLike = deleteLike;
  }

  #toggleLike(evt) {
    evt.target.classList.toggle("elements__like_active");
    if (evt.target.classList.contains("elements__like_active")) {
      this.#putLike();
    } else {
      this.#deleteLike();
    }
  }

  #handleLike() {
    this.#cardElement
      .querySelector(".elements__like")
      .addEventListener("click", (evt) => {
        this.#toggleLike(evt);
      });
  }

  #handleDelete(item) {
    this.#cardElement
      .querySelector(".elements__delete")
      .addEventListener("click", (evt) => {
        const id = evt.target
          .closest(".elements__element")
          .querySelector(".elements__image").id;
        this.#form.addEventListener("submit", (evt) => {
          evt.preventDefault();
          this.#deleteCardFromServer(id);
          this.#form.querySelector(".popup__btn-save").value = "Сохранение...";
        });
        this.#openPopUpDelete(evt);
      });
    if (item.owner._id == "d74d89b6b7e8b71fc709cb64") {
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

  #setEventListeners(item) {
    this.#handleLike();
    this.#handleDelete(item);
    this.#handleImageClick();
  }

  createCard(item) {
    this.#cardElement = this.#cardElementTemplate.cloneNode(true);
    this.#setEventListeners(item);
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
