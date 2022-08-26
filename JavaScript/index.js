//переменные
let profileEditButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let popupButtonClose = document.querySelector('.popup__btn-close');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.input_info_name');
let jobInput = formElement.querySelector('.input_info_job');
let profileName = document.querySelector('.profile__name');
let profilejob = document.querySelector('.profile__name-info');

//открытие popup
function popUpOpen() {
    popUp.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profilejob.textContent;
}


//закрытие popUp
function popUpClose() {
    popUp.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    profileName.textContent = nameInputValue;
    profilejob.textContent = jobInputValue;
    popUpClose()
}

//обработчики
profileEditButton.addEventListener('click', popUpOpen);
popupButtonClose.addEventListener('click', popUpClose);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);