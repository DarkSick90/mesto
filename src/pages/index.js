const profileEditButton = document.querySelector(".profile__edit-button");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit");
const formInfo = document.querySelector(".popup__form-info");
const formImage = document.querySelector(".popup__form-image");
const formAvatar = document.querySelector(".popup__window_avatar");
const nameInput = formInfo.querySelector(".popup__input_info_name");
const jobInput = formInfo.querySelector(".popup__input_info_job");
const imageCard = document.querySelector("#element").content;
const cardElementTemplate = imageCard.querySelector(".elements__element");

import "./index.css";
import { Api } from "../JavaScript/components/Api.js";
import {
  initialCards,
  validationConfig,
} from "../JavaScript/utils/constants.js";
import { Card } from "../JavaScript/components/Card.js";
import { FormValidator } from "../JavaScript/components/FormValidator.js";
import { UserInfo } from "../JavaScript/components/UserInfo.js";
import { Section } from "../JavaScript/components/Section.js";
import { PopupWithImage } from "../JavaScript/components/PopupWithImage";
import { PopupWithForm } from "../JavaScript/components/PopupWithForm";

const apiCards = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64/cards",
  headers: {
    authorization: "f1dcddbe-9f41-4d4b-a5fb-88f41f215a01",
    "Content-Type": "application/json",
  },
});

const apiCardsPost = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64/cards",
  method: "POST",
  headers: {
    authorization: "f1dcddbe-9f41-4d4b-a5fb-88f41f215a01",
    "Content-Type": "application/json",
  },
});

const apiUser = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64/users/me",
  headers: {
    authorization: "f1dcddbe-9f41-4d4b-a5fb-88f41f215a01",
    "Content-Type": "application/json",
  },
});

const apiUserPost = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64/users/me",
  method: "PATCH",
  headers: {
    authorization: "f1dcddbe-9f41-4d4b-a5fb-88f41f215a01",
    "Content-Type": "application/json",
  },
});

const apiUserAvatarPost = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64/users/me/avatar",
  method: "PATCH",
  headers: {
    authorization: "f1dcddbe-9f41-4d4b-a5fb-88f41f215a01",
    "Content-Type": "application/json",
  },
});

const apiDeleteCard = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64/cards",
  method: "DELETE",
  headers: {
    authorization: "f1dcddbe-9f41-4d4b-a5fb-88f41f215a01",
    "Content-Type": "application/json",
  },
});

const apiPutLike = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64/cards",
  method: "PUT",
  headers: {
    authorization: "f1dcddbe-9f41-4d4b-a5fb-88f41f215a01",
    "Content-Type": "application/json",
  },
});

const apiDeleteLike = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64/cards",
  method: "DELETE",
  headers: {
    authorization: "f1dcddbe-9f41-4d4b-a5fb-88f41f215a01",
    "Content-Type": "application/json",
  },
});

const handleCardClick = new PopupWithImage(".popup_window_big-image");

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__name-info",
  ".profile__avatar"
);

const openPopUpInfo = new PopupWithForm(".popup_window_profile", (data) => {
  apiUserPost.postUser(data);
  apiUser.getInitialCards().then((data) => {
    userInfo.setUserInfo(data);
  });
});

const openPopUpPicture = new PopupWithForm(".popup_window_image", () => {
  const newCard = openPopUpPicture.getInputValues();
  apiCardsPost.postCards(newCard);
});

const openPopUAvatar = new PopupWithForm(".popup__window_avatar", () => {
  const newCard = openPopUAvatar.getInputValues();
  apiUserAvatarPost.postUserAvatar(newCard);
});

const openPopUDelete = new PopupWithForm(".popup__card_delete", (item) => {
  apiDeleteCard.deleteCard(item);
});

handleCardClick.setEventListeners();

openPopUAvatar.setEventListeners();

openPopUDelete.setEventListeners();

function createCard(item) {
  const createItem = new Card(
    item,
    cardElementTemplate,
    () => {
      handleCardClick.openPopUp(item);
    },
    (item) => {
      apiDeleteCard.deleteCard(item);
    },
    () => {
      openPopUDelete.open();
    },
    () => {
      apiPutLike.like(item._id);
    },
    () => {
      apiDeleteLike.like(item._id);
    }
  );
  if (item.owner._id == "d74d89b6b7e8b71fc709cb64") {
  }
  return createItem.createCard(item);
}

apiCards.getInitialCards().then((data) => {
  const cards = data;
  const newSection = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = createCard(item);
        return card;
      },
    },
    ".elements__list"
  );
  newSection.renderItems();
});

openPopUpInfo.setEventListeners();

function openPopUpProfile() {
  apiUser.getInitialCards().then((data) => {});
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.info;
  openPopUpInfo.open();
}

openPopUpPicture.setEventListeners();

function openPopUpImage() {
  openPopUpPicture.open();
  validationImage.disabledButton();
}

function openPopUpAvatarEdit() {
  openPopUAvatar.open();
  validationImage.disabledButton();
}

const validationInfo = new FormValidator(validationConfig, formInfo);
validationInfo.enableValidation();

const validationImage = new FormValidator(validationConfig, formImage);
validationImage.enableValidation();

const validationAvatar = new FormValidator(validationConfig, formAvatar);
validationAvatar.enableValidation();

profileEditButton.addEventListener("click", openPopUpProfile);
buttonOpenAddCardPopup.addEventListener("click", openPopUpImage);
avatarEditButton.addEventListener("click", openPopUpAvatarEdit);

fetch("https://mesto.nomoreparties.co/v1/cohort-64/users/me ", {
  headers: {
    authorization: "f1dcddbe-9f41-4d4b-a5fb-88f41f215a01",
  },
})
  .then((res) => res.json())
  .then((result) => {
    userInfo.setUserInfo(result);
  });
