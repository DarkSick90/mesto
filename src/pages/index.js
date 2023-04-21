const profileEditButton = document.querySelector(".profile__edit-button");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const formInfo = document.querySelector(".popup__form-info");
const formImage = document.querySelector(".popup__form-image");
const nameInput = formInfo.querySelector(".popup__input_info_name");
const jobInput = formInfo.querySelector(".popup__input_info_job");
const imageCard = document.querySelector("#element").content;
const cardElementTemplate = imageCard.querySelector(".elements__element");

import './index.css';
import { initialCards, validationConfig } from "../JavaScript/utils/constants.js";
import { Card } from "../JavaScript/components/Card.js";
import { FormValidator } from "../JavaScript/components/FormValidator.js";
import { UserInfo } from "../JavaScript/components/UserInfo.js";
import { Section } from "../JavaScript/components/Section.js";
import { PopupWithImage } from "../JavaScript/components/PopupWithImage";
import { PopupWithForm } from "../JavaScript/components/PopupWithForm";

const handleCardClick = new PopupWithImage(".popup_window_big-image");
handleCardClick.setEventListeners()

function createCard(item) {
  const createItem = new Card(item, cardElementTemplate, () => {
    handleCardClick.openPopUp(item);
    });
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
  const newCard = openPopUpPicture.getInputValues();
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