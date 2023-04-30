import { PopUp } from "./Popup.js";

export class PopupWithImage extends PopUp {
  constructor(popUpSelector) {
    super(popUpSelector);
    this.popIpBigImageImage = this.popUp.querySelector(
      ".popup__big-image-image"
    );
    this.popUpBigImageDescription = this.popUp.querySelector(
      ".popup__description"
    );
  }

  openPopUp(cardData) {
    this.popIpBigImageImage.src = cardData.link;
    this.popUpBigImageDescription.alt = cardData.name;
    this.popUpBigImageDescription.textContent = cardData.name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
