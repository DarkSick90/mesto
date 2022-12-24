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

import { initialCards, validationConfig } from "./utils/constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { handleEsc, openPopup, closePopup } from "./utils/utils.js";

initialCards.forEach(function (item) {
  const createItem = new Card(item);
  cardsContainer.prepend(createItem.createCard());
});

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
  cardsContainer.prepend(cardsElement.createCard());
  closePopup(popUpImage);
}

const validationInfo = new FormValidator(validationConfig, formInfo);
validationInfo.enableValidation();

const validationImage = new FormValidator(validationConfig, formImage);
validationImage.enableValidation();

//обработчики
profileEditButton.addEventListener("click", openPopUpProfile);
buttonOpenAddCardPopup.addEventListener("click", openPopUpImage);
formInfo.addEventListener("submit", handleProfileFormSubmit);
formImage.addEventListener("submit", handleCardFormSubmit);
