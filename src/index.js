import "./pages/index.css";
import { initialCards, createCard, deleteCard, likeCard } from "./components/cards.js";
import { openPopup, closePopup } from "./components/modal.js";

const placesList = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const buttonPopupClose = document.querySelectorAll(".popup__close");
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

function addCard(initialCards) {
    const newCard = createCard(initialCards, deleteCard, likeCard, openImagePopup);
    placesList.prepend(newCard);
    return newCard;
}

initialCards.forEach((card) => {
    addCard(card, deleteCard);
});

profileEditButton.addEventListener("click", function () {
    openPopup(popupTypeEdit);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}); // открываем попап редактирования

profileAddButton.addEventListener("click", function () {
    openPopup(popupTypeNewCard);
}); // открываем попап новой карточки

buttonPopupClose.forEach((button) => {
    button.addEventListener("click", closePopup);
}); // закрываем любой попап на кнопку закрытия

function handleFormSubmit(event) {
    event.preventDefault();
    const newName = nameInput.value;
    const newJob = jobInput.value;

    nameProfile.textContent = newName;
    jobProfile.textContent = newJob;
    closePopup()
} // изменение значений карточки профиля

formElement.addEventListener("submit", handleFormSubmit);

function handleFormCardSubmit(event) {
    event.preventDefault();
    const newPlace = { name: nameCard.value, link: linkCard.value };
    addCard(newPlace, deleteCard);
    formElementCard.reset();
    closePopup()
} // добавление новой карточки

formElementCard.addEventListener("submit", handleFormCardSubmit);

function openImagePopup(event) {
    if (event.target.classList.contains("card__delete-button") || event.target.classList.contains("card__like-button")) {
        return;
    }
    const card = event.target.closest(".places__item");
    const cardImage = card.querySelector(".card__image");

    cardPopupImage.src = cardImage.src;
    cardPopupImage.alt = cardImage.alt;
    imagePopupText.textContent = card.innerText;

    openPopup(imagePopup);
} // открываем и закрываем попап с картинкой