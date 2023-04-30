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

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__name-info",
  ".profile__avatar"
);

const popUpInfoOpen = new PopupWithForm(
  ".popup_window_profile",
  (data, form) => {
    api.postUser(data, "PATCH").then(() => {
      api.getUserInfo().then((data) => {
        userInfo.setUserInfo(data);
        popUpInfoOpen.close();
        form.reset();
      });
    });
  }
);

const popUpPictureOpen = new PopupWithForm(
  ".popup_window_image",
  (data, form) => {
    api
      .postCards(data, "POST")
      .then(() => {
        api.getInitialCards().then((data) => {
          const cards = data;
          api.getUserInfo().then((userId) => {
            newSection.renderItems([cards[0]], userId._id);
          });
        });
      })
      .then(() => {
        popUpPictureOpen.close();
        form.reset();
      });
  }
);

const PopUAvatarOpen = new PopupWithForm(
  ".popup_window_avatar",
  (data, form) => {
    api.postUserAvatar(data, "PATCH").then(() => {
      api.getUserInfo().then((data) => {
        userInfo.setUserInfo(data);
        PopUAvatarOpen.close();
        form.reset();
      });
    });
  }
);

const popUDeleteOpen = new PopupWithConfirmation(
  ".popup_card_delete",
  (item, evt) => {
    api.deleteCard(item, "DELETE").then(() => {
      popUDeleteOpen.closeDelete();
      evt.target.closest(".elements__element").remove();
    });
  }
);

handleCardClick.setEventListeners();

PopUAvatarOpen.setEventListeners();

popUDeleteOpen.setEventListenersDelet();

function createCard(item, userId) {
  const createItem = new Card(
    item,
    cardElementTemplate,
    () => {
      handleCardClick.openPopUp(item);
    },
    (id) => {
      popUDeleteOpen.openDelete(id);
    },
    (evt) => {
      api.like(item._id, "PUT").then(() => {
        evt.target.classList.toggle("elements__like_active");
        api.getInitialCards(item, "GET").then((data) =>
          data.forEach((elem) => {
            if (elem._id == item._id) {
              evt.target
                .closest(".elements__element")
                .querySelector(".elements__like-counte").textContent =
                elem.likes.length;
            }
          })
        );
      });
    },
    (evt) => {
      api.like(item._id, "DELETE").then(() => {
        evt.target.classList.toggle("elements__like_active");
        api.getInitialCards(item, "GET").then((data) =>
          data.forEach((elem) => {
            if (elem._id == item._id) {
              evt.target
                .closest(".elements__element")
                .querySelector(".elements__like-counte").textContent =
                elem.likes.length;
            }
          })
        );
      });
    }
  );

  return createItem.createCard(item, userId);
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

api.getInitialCards().then((data) => {
  const cards = data;
  api.getUserInfo().then((userId) => {
    newSection.renderItems(cards, userId._id);
  });
});

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
  PopUAvatarOpen.open();
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

api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, initialCards]) => {})
  .catch((err) => {
    console.log(err);
  });
