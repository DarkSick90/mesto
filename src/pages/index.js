const profileEditButton = document.querySelector(".profile__edit-button");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit");
const formInfo = document.querySelector(".popup__form-info");
const formImage = document.querySelector(".popup__form-image");
const formAvatar = document.querySelector(".popup_window_avatar");
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
import { PopupWithConfirmation } from "../JavaScript/components/PopupWithConfirmation";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "f1dcddbe-9f41-4d4b-a5fb-88f41f215a01",
    "Content-Type": "application/json",
  },
});

const handleCardClick = new PopupWithImage(".popup_window_big-image");
const card = new Card();

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__name-info",
  ".profile__avatar"
);

const popUpInfoOpen = new PopupWithForm(".popup_window_profile", (data) => {
  api
    .postUser(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popUpInfoOpen.close();
      popUpInfoOpen.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popUpInfoOpen.returnText("Сохранить");
    });
});

const popUpPictureOpen = new PopupWithForm(".popup_window_image", (data) => {
  api
    .postCards(data)
    .then((data) => {
      const cards = data;
      api.getUserInfo().then((userId) => {
        newSection.renderItems([cards], userId._id);
        popUpPictureOpen.close();
        popUpPictureOpen.reset();
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popUpPictureOpen.returnText("Создать");
    });
});

const popUAvatarOpen = new PopupWithForm(".popup_window_avatar", (data) => {
  api
    .postUserAvatar(data, "PATCH")
    .then((data) => {
      userInfo.setUserInfo(data);
      popUAvatarOpen.close();
      popUAvatarOpen.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popUAvatarOpen.returnText("Сохранить");
    });
});

const popUDeleteOpen = new PopupWithConfirmation(
  ".popup_card_delete",
  (item, evt) => {
    api
      .deleteCard(item, "DELETE")
      .then(() => {
        card.deletCard(evt);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popUDeleteOpen.close();
      });
  }
);

handleCardClick.setEventListeners();

popUAvatarOpen.setEventListeners();

popUDeleteOpen.setEventListeners();

function createCard(item, userId) {
  const createItem = new Card(
    item,
    userId,
    cardElementTemplate,
    () => {
      handleCardClick.openPopUp(item);
    },
    (id) => {
      popUDeleteOpen.open(id);
    },
    (evt) => {
      api.like(item._id, "PUT").then((data) => {
        card.toggleLike(evt);
        card.setLikeCounte(evt, data);
      });
    },
    (evt) => {
      api.like(item._id, "DELETE").then((data) => {
        card.toggleLike(evt);
        card.setLikeCounte(evt, data);
      });
    }
  );

  return createItem.createCard();
}

const newSection = new Section(
  {
    renderer: (item, id) => {
      const card = createCard(item, id);
      return card;
    },
  },
  ".elements__list"
);

popUpInfoOpen.setEventListeners();

function openPopUpProfile() {
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.info;
  popUpInfoOpen.open();
}

popUpPictureOpen.setEventListeners();

function openPopUpImage() {
  popUpPictureOpen.open();
  validationImage.disabledButton();
}

function openPopUpAvatarEdit() {
  popUAvatarOpen.open();
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, initialCards]) => {
    userInfo.setUserInfo(info);
    newSection.renderItems(initialCards, info._id);
  })
  .catch((err) => {
    console.log(err);
  });
