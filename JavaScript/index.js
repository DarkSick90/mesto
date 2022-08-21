//открытие popup
let profileEditButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');

function popUpOpen() {
    popUp.classList.add('popup_opened')
}

profileEditButton.addEventListener('click', popUpOpen);
//---

//закрытие popUp
let popupButtonClose = document.querySelector('.popup__btn-close');

function popUpClose() {
    popUp.classList.remove('popup_opened')
}

popupButtonClose.addEventListener('click', popUpClose);
//---

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__info');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let profilejob = document.querySelector('.profile__name-info');
    let nameInputSave = nameInput.getAttribute('value');
    let jobInputSave = nameInput.getAttribute('value');
    // Вставьте новые значения с помощью textContent
    nameInputSave.textContent = nameInputValue;
    jobInputSave.textContent = jobInputValue;
    profileName.textContent = nameInputValue;
    profilejob.textContent = jobInputValue;
    console.log(jobInputValue);
    popUpClose()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);