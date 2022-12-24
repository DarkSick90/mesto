const popUpOverlay = Array.from(document.querySelectorAll(".popup"));

export const handleEsc = (evt) => {
  popUpOverlay.forEach((popup) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
};

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEsc);
}
