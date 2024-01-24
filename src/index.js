import "./pages/index.css";
import {
  createCard,
  handleCardDeleteClick,
  likeCard,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getInitialInfo,
  editUserProfile,
  addNewCard,
  changeUserAvatar,
} from "./components/api.js";

const cardsContainer = document.querySelector(".places__list");

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const imagePopupText = document.querySelector(".popup__caption");
const formElementProfile = document.querySelector('form[name="edit-profile"]');
const popupButtonProfile = formElementProfile.querySelector(".popup__button");
const nameInput = formElementProfile.querySelector('input[name="name"]');
const jobInput = formElementProfile.querySelector('input[name="description"]');
const jobProfile = document.querySelector(".profile__description");
const nameProfile = document.querySelector(".profile__title");
// профиль
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const formElementCard = document.querySelector('form[name="new-place"]');
const popupButtonCard = formElementCard.querySelector(".popup__button");
const nameCard = formElementCard.querySelector('input[name="place-name"]');
const linkCard = formElementCard.querySelector('input[name="link"]');
// карточки
const cardPopupImage = document.querySelector(".popup__image");
const imagePopup = document.querySelector(".popup_type_image");
// попап открытой карточки
const buttonsPopupClose = document.querySelectorAll(".popup__close");
// общие
const profileAvatar = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_avatar");
const formElementAvatar = document.querySelector('form[name="edit-avatar"]');
const popupButtonAvatar = formElementAvatar.querySelector(".popup__button");
const linkAvatar = formElementAvatar.querySelector('input[name="avatar-link"]');
// аватар

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error",
};

let userId; // = "ca2b7d4fde938f9490c40ab0"

// работаем с данными api
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

// работаем с данными пользователя
const fillProfileInfo = (profileId) => {
  nameProfile.textContent = profileId.name; // имя пользователя из ответа от сервера
  jobProfile.textContent = profileId.about; // о пользователе из ответа от сервера
  profileAvatar.style.backgroundImage = `url(${profileId.avatar})`; // новый аватар
};

// вывод карточек
function renderInitialCards(initialCards, profileId) {
  initialCards.forEach((cardData) => {
    cardsContainer.append(
      createCard(
        cardData,
        profileId,
        handleCardDeleteClick,
        likeCard,
        openImagePopup
      )
    );
  });
}

// открываем попап редактирования
function openProfilePopup() {
  openPopup(popupTypeEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  clearValidation(formElementProfile, validationConfig);
}

// открываем попап новой карточки
function openCardPopup() {
  openPopup(popupTypeNewCard);
  clearValidation(formElementCard, validationConfig);
}

// открываем попап аватара
function openAvatarPopup() {
  openPopup(popupAvatar);
  clearValidation(formElementAvatar, validationConfig);
}

// открываем и закрываем попап с картинкой
function openImagePopup(event) {
  const card = event.target.closest(".places__item");
  const cardImage = card.querySelector(".card__image");

  cardPopupImage.src = cardImage.src;
  cardPopupImage.alt = cardImage.alt;
  imagePopupText.textContent = card.innerText;

  openPopup(imagePopup);
}

// закрываем любой попап на кнопку закрытия
buttonsPopupClose.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// переключение текста кнопки в зависимости от передаваемого состояния
function setIsLoading(button, isLoading) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

// изменение значений карточки профиля после запроса на сервер
function handleFormProfileSubmit(event) {
  event.preventDefault();
  setIsLoading(popupButtonProfile, true);
  editUserProfile({ name: nameInput.value, about: jobInput.value }) // присваиваем значения существующей сущности на сервере
    .then((user) => {
      fillProfileInfo(user);
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(popupButtonProfile, false);
    });
}

// изменение значений аватара после запроса на сервер
function handleFormAvatarSubmit(event) {
  event.preventDefault();
  setIsLoading(popupButtonAvatar, true);
  changeUserAvatar(linkAvatar) // присваиваем значения существующей сущности на сервере
    .then((user) => {
      fillProfileInfo(user);
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(popupButtonAvatar, false);
    });
}

// добавление новой карточки после запроса на сервер
function handleFormCardSubmit(event) {
  event.preventDefault();
  setIsLoading(popupButtonCard, true);
  addNewCard({ name: nameCard.value, link: linkCard.value })
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        userId,
        handleCardDeleteClick,
        likeCard,
        openImagePopup
      );
      cardsContainer.prepend(newCard);
      nameCard.reset;
      linkCard.reset;
      closePopup(popupTypeNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(popupButtonCard, false);
    });
}

profileEditButton.addEventListener("click", openProfilePopup);

profileAddButton.addEventListener("click", openCardPopup);

profileAvatar.addEventListener("click", openAvatarPopup);

formElementProfile.addEventListener("submit", handleFormProfileSubmit);

formElementAvatar.addEventListener("submit", handleFormAvatarSubmit);

formElementCard.addEventListener("submit", handleFormCardSubmit);

enableValidation(validationConfig);
