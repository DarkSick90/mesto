const profileEditButton = document.querySelector(".profile__edit-button");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const formInfo = document.querySelector(".popup__form-info");
const formImage = document.querySelector(".popup__form-image");
const nameInput = formInfo.querySelector(".popup__input_info_name");
const jobInput = formInfo.querySelector(".popup__input_info_job");
const popupInputImageName = formImage.querySelector(".popup__input_image_name");
const popupInputImageLink = formImage.querySelector(".popup__input_image_link");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__name-info");
const imageCard = document.querySelector("#element").content;
const cardElementTemplate = imageCard.querySelector(".elements__element");

import { initialCards, validationConfig } from "./utils/constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { UserInfo } from "./UserInfo.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage";
import { PopupWithForm } from "./PopupWithForm";

const handleCardClick = new PopupWithImage(".popup_window_big-image");

function createCard(item) {
  const createItem = new Card(item, cardElementTemplate, () => {handleCardClick.openPopUp(item);
    handleCardClick.setEventListeners()});
  return createItem.createCard();
}

const newSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      return card;
    },
  },
  ".elements__list"
);

newSection.renderItems();

const userInfo = new UserInfo(".profile__name", ".profile__name-info");
const userImage = new UserInfo(".popup__input_image_name", ".popup__input_image_link");

const openPopUpInfo = new PopupWithForm(".popup_window_profile", (data) => {
  userInfo.setUserInfo(data);
});
openPopUpInfo.setEventListeners();

function openPopUpProfile() {
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.info;
  openPopUpInfo.open();
}

const openPopUpPicture = new PopupWithForm(".popup_window_image", () => {
  const newCard = openPopUpPicture._getInputValues();
  const card = createCard(newCard);
  newSection.addItem(card);
});


openPopUpPicture.setEventListeners();

function openPopUpImage() {
  openPopUpPicture.open();
  validationImage.disabledButton();
}

const validationInfo = new FormValidator(validationConfig, formInfo);
validationInfo.enableValidation();

const validationImage = new FormValidator(validationConfig, formImage);
validationImage.enableValidation();

profileEditButton.addEventListener("click", openPopUpProfile);
buttonOpenAddCardPopup.addEventListener("click", openPopUpImage);