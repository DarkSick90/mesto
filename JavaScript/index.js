//переменные
const profileEditButton = document.querySelector(".profile__edit-button");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const popUpProfile = document.querySelector(".popup_window_profile");
const popUpImage = document.querySelector(".popup_window_image");
const closeButtons = document.querySelectorAll(".popup__btn-close");
const popUpOverlay = Array.from(document.querySelectorAll(".popup"));
const imageCard = document.querySelector("#element").content;
const cardsContainer = document.querySelector(".elements__list");
const formInfo = document.querySelector(".popup__form-info");
const formImage = document.querySelector(".popup__form-image");
const nameInput = formInfo.querySelector(".popup__input_info_name");
const jobInput = formInfo.querySelector(".popup__input_info_job");
const popupInputImageName = formImage.querySelector(".popup__input_image_name");
const popupInputImageLink = formImage.querySelector(".popup__input_image_link");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__name-info");
const popUpBigImage = document.querySelector(".popup_window_big-image");
const popIpBigImageImage = document.querySelector(".popup__big-image-image");
const popUpBigImageDescription = document.querySelector(".popup__description");
const buttonCardSubmit = popUpImage.querySelector("#save-image");
const cardElementTemplate = imageCard.querySelector(".elements__element");

const initialCards = [
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

function createCard(cardData) {
  const cardsElement = cardElementTemplate.cloneNode(true);
  cardsElement
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like_active");
    });
  cardsElement
    .querySelector(".elements__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".elements__element").remove();
    });
  cardsElement
    .querySelector(".elements__image")
    .addEventListener("click", function (evt) {
      openPopup(popUpBigImage);
      popIpBigImageImage.src = cardData.link;
      popUpBigImageDescription.alt = cardData.name;
      popUpBigImageDescription.textContent = cardData.name;
    });
  cardsElement.querySelector(".elements__image").src = cardData.link;
  cardsElement.querySelector(".elements__image").alt = cardData.name;
  cardsElement.querySelector(".elements__text").textContent = cardData.name;
  return cardsElement;
}

initialCards.forEach((cardData) => {
  const cardsElement = createCard(cardData);
  cardsContainer.prepend(cardsElement);
});

const handleEsc = (evt) => {
  popUpOverlay.forEach((popup) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
};

//открытие popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEsc);
}

function openPopUpProfile() {
  openPopup(popUpProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopUpImage() {
  openPopup(popUpImage);
  popupInputImageLink.value = "";
  popupInputImageName.value = "";
  buttonCardSubmit.disabled = true;
  buttonCardSubmit.classList.add("popup__btn-save_disabled");
}

//закрытие popUp

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEsc);
}

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

popUpOverlay.forEach((overlay) => {
  const overlayPopUp = overlay.closest(".popup");
  overlayPopUp.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(overlayPopUp);
    }
  });
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popUpProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: popupInputImageName.value,
    link: popupInputImageLink.value,
  };
  const cardsElement = createCard(newCard);
  cardsContainer.prepend(cardsElement);
  closePopup(popUpImage);
}

//обработчики
profileEditButton.addEventListener("click", openPopUpProfile);
buttonOpenAddCardPopup.addEventListener("click", openPopUpImage);
formInfo.addEventListener("submit", handleProfileFormSubmit);
formImage.addEventListener("submit", handleCardFormSubmit);
