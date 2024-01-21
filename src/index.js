import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { clearValidation, enableValidation } from './components/validation.js';
import { getInitialInfo, allUserInfo, addNewCard, changeUserAvatar } from './components/api.js';

const placesList = document.querySelector(".places__list");

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const imagePopupText = document.querySelector(".popup__caption");
const formElement = document.querySelector('form[name="edit-profile"]');
const popupButtonProfile = formElement.querySelector('.popup__button');
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="description"]');
const jobProfile = document.querySelector(".profile__description");
const nameProfile = document.querySelector(".profile__title");
// профиль
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const formElementCard = document.querySelector('form[name="new-place"]');
const popupButtonCard = formElementCard.querySelector('.popup__button');
const nameCard = formElementCard.querySelector('input[name="place-name"]');
const linkCard = formElementCard.querySelector('input[name="link"]');
// карточки
const cardPopupImage = document.querySelector(".popup__image");
const imagePopup = document.querySelector(".popup_type_image");
// попап открытой карточки
const buttonsPopupClose = document.querySelectorAll(".popup__close");
const popupButtons = document.querySelectorAll(".popup__button");
// общие
const profileAvatar = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_avatar');
const formElementAvatar = document.querySelector('form[name="edit-avatar"]');
const popupButtonAvatar = formElementAvatar.querySelector('.popup__button');
const linkAvatar = formElementAvatar.querySelector('input[name="avatar-link"]');
// аватар



const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error'
};
let userId 
// = "ca2b7d4fde938f9490c40ab0"

for (let i = 0; i < popupButtons.length; i++) {
    popupButtons[i].addEventListener('click', function() {
     if(this.textContent === 'Сохранить') {
     this.textContent = 'Сохранение...';
    }
    })
  } // с помощью цикла меняем текст кнопки на сохранение

getInitialInfo() 
    .then((res) => {
        const profileId = res[0]; // инфа от пользователе
        userId = profileId._id; // наш идентификатор пользователя
        const initialCards = res[1]; // массив карточек
        fillProfileInfo(profileId); // вызываем функцию, в которой получили ответ от сервера об инфе о пользовтеле
        renderInitialCards(initialCards, userId); // вызываем функцию, в которой получили ответ от сервера с выводом карточек
    })
    .catch((err) => {
        console.log(err);
    });
    // работаем с данными api

const fillProfileInfo = (profileId) => {
      nameProfile.textContent = profileId.name; // имя пользователя из ответа от сервера
      jobProfile.textContent = profileId.about; // о пользователе из ответа от сервера
      profileAvatar.style.backgroundImage = `url(${profileId.avatar})`; // новый аватар
  }; // работаем с данными пользователя

function renderInitialCards(initialCards, profileId) {
  initialCards.forEach((cardData) => {
    placesList.append(createCard(cardData, profileId, deleteCard, likeCard, openImagePopup));
  });
} // вывод карточек

profileEditButton.addEventListener("click", function () {
    openPopup(popupTypeEdit);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    popupButtonProfile.textContent = 'Сохранить';
    clearValidation(formElement, validationConfig); 
}); // открываем попап редактирования

profileAddButton.addEventListener("click", function () {
    openPopup(popupTypeNewCard);
    popupButtonCard.textContent = 'Сохранить';
    clearValidation(formElementCard, validationConfig); 
}); // открываем попап новой карточки

profileAvatar.addEventListener("click", function () {
    openPopup(popupAvatar);
    popupButtonAvatar.textContent = 'Сохранить';
    clearValidation(formElementAvatar, validationConfig); 
}); // открываем попап аватара

buttonsPopupClose.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener("click", () => closePopup(popup)); 
}) // закрываем любой попап на кнопку закрытия

function handleFormProfileSubmit(event) {
    event.preventDefault();
    allUserInfo({name: nameInput.value, about: jobInput.value}) // присваиваем значения существующей сущности на сервере
    .then((user) => {
      fillProfileInfo(user);
    closePopup(popupTypeEdit);
    })
    .catch((err) => {
        console.log(err); 
      })
    } // изменение значений карточки профиля

formElement.addEventListener("submit", handleFormProfileSubmit);

function handleFormAvatarSubmit(event) {
    event.preventDefault();
    changeUserAvatar(linkAvatar) // присваиваем значения существующей сущности на сервере
    .then((user) => {
      fillProfileInfo(user);
    closePopup(popupAvatar);
    })
    .catch((err) => {
        console.log(err); 
      })
    } // изменение значений аватара

formElementAvatar.addEventListener("submit", handleFormAvatarSubmit);

function handleFormCardSubmit(event) {
    event.preventDefault();
    addNewCard({ name: nameCard.value, link: linkCard.value })
    .then((cardData) => {
        const newCard = createCard(cardData, userId, deleteCard, likeCard, openImagePopup);
        placesList.prepend(newCard);
        nameCard.value = "";
        linkCard.value = "";
    closePopup(popupTypeNewCard)
})
.catch((err) => {
    console.log(err); 
  })
} // добавление новой карточки

formElementCard.addEventListener("submit", handleFormCardSubmit)

function openImagePopup(event) {
    const card = event.target.closest(".places__item");
    const cardImage = card.querySelector(".card__image");

    cardPopupImage.src = cardImage.src;
    cardPopupImage.alt = cardImage.alt;
    imagePopupText.textContent = card.innerText;

    openPopup(imagePopup);
} // открываем и закрываем попап с картинкой

enableValidation(validationConfig)
