export { initialCards, createCard, deleteCard, likeCard }
const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector("#card-template").content;

function createCard(initialCards, deleteCard, likeCard, openImagePopup) {
    const itemElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    const deleteButton = itemElement.querySelector(".card__delete-button");
    const likeButton = itemElement.querySelector(".card__like-button");

    itemElement.querySelector(".card__title").textContent = initialCards.name;
    itemElement.querySelector(".card__image").src = initialCards.link;
    deleteButton.addEventListener("click", deleteCard);
    likeButton.addEventListener("click", likeCard);
    itemElement.addEventListener("click", openImagePopup);
    return itemElement;
} // объявление функции создания карточки

function deleteCard(event) {
    const card = event.target.closest(".places__item");
    card.remove();
} // удаление карточки

function likeCard(event) {
    event.target.classList.toggle("card__like-button_is-active");
} // лайк карточки
