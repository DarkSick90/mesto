//переменные
const profileEditButton = document.querySelector(".profile__edit-button");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const popUpProfile = document.querySelector(".popup_window_profile");
const popUpImage = document.querySelector(".popup_window_image");
const closeButtons = document.querySelectorAll(".popup__btn-close");
const popUpOverlay = Array.from(document.querySelectorAll(".popup"));
const cardsContainer = document.querySelector(".elements__list");
const formInfo = document.querySelector(".popup__form-info");
const formImage = document.querySelector(".popup__form-image");
const nameInput = formInfo.querySelector(".popup__input_info_name");
const jobInput = formInfo.querySelector(".popup__input_info_job");
const popupInputImageName = formImage.querySelector(".popup__input_image_name");
const popupInputImageLink = formImage.querySelector(".popup__input_image_link");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__name-info");
const buttonCardSubmit = popUpImage.querySelector("#save-image");


import {initialCards ,Card } from "./Card.js";
import { validationConfig, FormValidator } from "./validate.js";


const createItem = new Card(initialCards);
createItem.render(cardsContainer)

const handleEsc = (evt) => {
  popUpOverlay.forEach((popup) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
};


//открытие popup
export function openPopup(popup) {
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
  const cardsElement = new Card(newCard);
  cardsElement.createCardNew(newCard)
  closePopup(popUpImage);
}

const validation = new FormValidator(validationConfig);
validation.enableValidation(validationConfig);

//обработчики
profileEditButton.addEventListener("click", openPopUpProfile);
buttonOpenAddCardPopup.addEventListener("click", openPopUpImage);
formInfo.addEventListener("submit", handleProfileFormSubmit);
formImage.addEventListener("submit", handleCardFormSubmit);
