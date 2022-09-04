//переменные
const profileEditButton = document.querySelector('.profile__edit-button');
const imageEditButton = document.querySelector('.profile__add-button');
const popUpProfile = document.querySelector('.popup_window_profile');
const popUpImage = document.querySelector('.popup_window_image');
const closeButtons = document.querySelectorAll('.popup__btn-close');
const popupProfileButtonClose = document.querySelector('.popup__profile-btn-close');
const poUpImageButtonClose = document.querySelector('.popup__image-btn-close');
const popUpBigImageBtnClose = document.querySelector('.popup__big-image-btn-close')
const imageCard = document.querySelector('#element').content;
const cardsList = document.querySelector('.elements__list');
const formElement = document.querySelector('.popup__form-info');
const formElementImage = document.querySelector('.popup__form-image');
const nameInput = formElement.querySelector('.popup__input_info_name');
const jobInput = formElement.querySelector('.popup__input_info_job');
const popupInputImageName = formElementImage.querySelector('.popup__input_image_name')
const popupInputImageLink = formElementImage.querySelector('.popup__input_image_link')
const profileName = document.querySelector('.profile__name');
const profilejob = document.querySelector('.profile__name-info');
const popUpBigImage = document.querySelector('.popup_window_big-image');
const popIpBigImageImage = document.querySelector('.popup__big-image-image');
const popUpBigImageDescription = document.querySelector('.popup__description');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  function createCard(item) {
    // тут создаете карточку и возвращаете ее
  return cardElement
}

  initialCards.forEach(function (item) {
    const cardsElement = imageCard.querySelector('.elements__element').cloneNode(true);
    cardsElement.querySelector('.elements__like').addEventListener('click', function(evt) {
      evt.target.classList.toggle('elements__like_active');
    });
    cardsElement.querySelector('.elements__delete').addEventListener('click', function(evt) {
      evt.target.closest('.elements__element').remove();
    });
    cardsElement.querySelector('.elements__image').addEventListener('click', function(evt) {
      popUpBigImage.classList.add('popup_opened');
      popIpBigImageImage.src = item.link;
      popUpBigImageDescription.alt = item.name;
      popUpBigImageDescription.textContent = item.name;
    });
    cardsElement.querySelector('.elements__image').src = item.link;
    cardsElement.querySelector('.elements__image').alt = item.name;
    cardsElement.querySelector('.elements__text').textContent = item.name;
    cardsList.append(cardsElement);
  });


//открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function OpenPopUpProfile() {
    openPopup(popUpProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profilejob.textContent;
}

function OpenPopUpImage() {
    openPopup(popUpImage);
    popupInputImageLink.value = '';
    popupInputImageName.value = '';
}


//закрытие popUp

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;;
    profilejob.textContent = jobInput.value;
    closePopup(popUpProfile)
}

function HandlerImageFormSubmit (evt) {
  evt.preventDefault(); 
  const popupInputImageLinkValue = popupInputImageLink.value;
  const popupInputImageNameValue = popupInputImageName.value;
  const cardsElement = imageCard.querySelector('.elements__element').cloneNode(true);
  cardsElement.querySelector('.elements__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  cardsElement.querySelector('.elements__delete').addEventListener('click', function(evt) {
    evt.target.closest('.elements__element').remove();
  });
  cardsElement.querySelector('.elements__image').addEventListener('click', function(evt) {
    popUpBigImage.classList.add('popup_opened');
    popIpBigImageImage.src = popupInputImageLinkValue;
    popUpBigImageDescription.alt = popupInputImageNameValue;
    popUpBigImageDescription.textContent = popupInputImageNameValue;
  });
  cardsElement.querySelector('.elements__image').src = popupInputImageLinkValue;
  cardsElement.querySelector('.elements__image').alt = popupInputImageNameValue;
  cardsElement.querySelector('.elements__text').textContent = popupInputImageNameValue;
  cardsList.prepend(cardsElement);
  closePopup(popUpImage)
}

//обработчики
profileEditButton.addEventListener('click', OpenPopUpProfile);
imageEditButton.addEventListener('click', OpenPopUpImage);
formElement.addEventListener('submit', handleProfileFormSubmit);
formElementImage.addEventListener('submit', HandlerImageFormSubmit);