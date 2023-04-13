import { PopUp } from "./PopUp.js";
import { handleEsc, openPopup, closePopup } from "./utils/utils.js";

const popIpBigImageImage = document.querySelector(".popup__big-image-image");
const popUpBigImageDescription = document.querySelector(".popup__description");

export class PopupWithImage extends PopUp {
  constructor(popUpSelector) {
    super(popUpSelector);
  }

  openPopUp(cardData) {
    popIpBigImageImage.src = cardData.link;
    popUpBigImageDescription.alt = cardData.name;
    popUpBigImageDescription.textContent = cardData.name;
    super.open();
    super.setEventListeners();
  }
}
