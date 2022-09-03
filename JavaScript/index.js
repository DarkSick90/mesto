//переменные
const profileEditButton = document.querySelector('.profile__edit-button');
const imageEditButton = document.querySelector('.profile__add-button');
const popUpProfile = document.querySelector('.popup__profile');
const popUpImage = document.querySelector('.popup__image');
const popupProfileButtonClose = document.querySelector('.popup__profile-btn-close');
const poUpImageButtonClose = document.querySelector('.popup__image-btn-close');
const popUpBigImageBtnClose = document.querySelector('.popup__big-image-btn-close')
const imageCard = document.querySelector('#element').content;
let cardsList = document.querySelector('.elements__list');
let formElement = document.querySelector('.popup__form-info');
let formElementImage = document.querySelector('.popup__form-image');
let nameInput = formElement.querySelector('.popup__input_info_name');
let jobInput = formElement.querySelector('.popup__input_info_job');
let popupInputImageName = formElementImage.querySelector('.popup__input_image_name')
let popupInputImageLink = formElementImage.querySelector('.popup__input_image_link')
let profileName = document.querySelector('.profile__name');
let profilejob = document.querySelector('.profile__name-info');
let popUpBigImage = document.querySelector('.popup__big-image');
let popIpBigImageImage = document.querySelector('.popup__big-image-image');
let popUpBigImageDescription = document.querySelector('.popup__description');

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

  initialCards.forEach(function (item) {
    let cardsElement = imageCard.querySelector('.elements__element').cloneNode(true);
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
function popUpProfileOpen() {
    popUpProfile.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profilejob.textContent;
}

function popUpImageOpen() {
    popUpImage.classList.add('popup_opened');
    popupInputImageLink.value = '';
    popupInputImageName.value = '';
}


//закрытие popUp
function popUpProfileClose() {
    popUpProfile.classList.remove('popup_opened');
}

function popUpImageClose() {
    popUpImage.classList.remove('popup_opened');
}

function popUpBigImageClose() {
  popUpBigImage.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    profileName.textContent = nameInputValue;
    profilejob.textContent = jobInputValue;
    popUpProfileClose()
}

function formSubmitHandlerImage (evt) {
  evt.preventDefault(); 
  let popupInputImageLinkValue = popupInputImageLink.value;
  let popupInputImageNameValue = popupInputImageName.value;
  let cardsElement = imageCard.querySelector('.elements__element').cloneNode(true);
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
  popUpImageClose()
}

//обработчики
profileEditButton.addEventListener('click', popUpProfileOpen);
imageEditButton.addEventListener('click', popUpImageOpen);
popupProfileButtonClose.addEventListener('click', popUpProfileClose);
poUpImageButtonClose.addEventListener('click', popUpImageClose);
popUpBigImageBtnClose.addEventListener('click', popUpBigImageClose)
formElement.addEventListener('submit', formSubmitHandler);
formElementImage.addEventListener('submit', formSubmitHandlerImage);