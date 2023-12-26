import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const placesList = document.querySelector(".places__list");

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const buttonsPopupClose = document.querySelectorAll(".popup__close");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const cardPopupImage = document.querySelector(".popup__image");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupText = document.querySelector(".popup__caption");
const formElement = document.querySelector('form[name="edit-profile"]');
const jobProfile = document.querySelector(".profile__description");
const nameProfile = document.querySelector(".profile__title");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const formElementCard = document.querySelector('form[name="new-place"]');
const nameCard = formElementCard.querySelector('input[name="place-name"]');
const linkCard = formElementCard.querySelector('input[name="link"]');

function addCard(cardData) {
    const newCard = createCard(cardData, deleteCard, likeCard, openImagePopup);
    placesList.prepend(newCard);
}

initialCards.forEach((cardData) => {
    addCard(cardData);
});

profileEditButton.addEventListener("click", function () {
    openPopup(popupTypeEdit);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}); // открываем попап редактирования

profileAddButton.addEventListener("click", function () {
    openPopup(popupTypeNewCard);
}); // открываем попап новой карточки

buttonsPopupClose.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener("click", () => closePopup(popup)); 
}) // закрываем любой попап на кнопку закрытия

function handleFormProfileSubmit(event) {
    event.preventDefault();
    const newName = nameInput.value;
    const newJob = jobInput.value;

    nameProfile.textContent = newName;
    jobProfile.textContent = newJob;
    closePopup(popupTypeEdit)
} // изменение значений карточки профиля


formElement.addEventListener("submit", handleFormProfileSubmit);

function handleFormCardSubmit(event) {
    event.preventDefault();
    const card = { name: nameCard.value, link: linkCard.value };
    addCard(card);
    formElementCard.reset();
    closePopup(popupTypeNewCard)
} // добавление новой карточки

formElementCard.addEventListener("submit", handleFormCardSubmit);

function openImagePopup(event) {
    const card = event.target.closest(".places__item");
    const cardImage = card.querySelector(".card__image");

    cardPopupImage.src = cardImage.src;
    cardPopupImage.alt = cardImage.alt;
    imagePopupText.textContent = card.innerText;

    openPopup(imagePopup);
} // открываем и закрываем попап с картинкой

