export { createCard, handleCardDeleteClick, likeCard };
import { deleteCard, addCardLike, deleteCardLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

// объявление функции создания карточки
function createCard(
  cardData,
  profileId,
  handleCardDeleteClick,
  likeCard,
  openImagePopup
) {
  const itemElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = itemElement.querySelector(".card__delete-button");
  const likeButton = itemElement.querySelector(".card__like-button");
  const cardImage = itemElement.querySelector(".card__image");
  const cardTitle = itemElement.querySelector(".card__title");
  const counterLikes = itemElement.querySelector(".card__likes");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  counterLikes.textContent = cardData.likes.length;

  if (defineOwnerCard(cardData.owner._id, profileId)) {
    deleteButton.addEventListener("click", () => {
      handleCardDeleteClick(cardData._id, itemElement);
    });
  } else {
    deleteButton.classList.add("card__delete-button-disabled");
  } // удаляем только нашу карточку

  const checkLike = cardData.likes.some((like) => like._id === profileId);
  if (checkLike) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () =>
    likeCard(likeButton, cardData._id, counterLikes)
  );
  cardImage.addEventListener("click", openImagePopup);

  return itemElement;
}

// определяем владельца
function defineOwnerCard(cardOwnerId, profileId) {
  return cardOwnerId === profileId;
}

// удаление карточки
function removeCard(card) {
  card.remove();
}

function handleCardDeleteClick(cardId, itemElement) {
  deleteCard(cardId)
    .then(() => removeCard(itemElement))
    .catch((err) => {
      console.log(err);
    });
}

// переключение лайка
function switchLike(likeButton, counterLikes, res) {
  likeButton.classList.toggle("card__like-button_is-active");
  counterLikes.textContent = res.likes.length;
}

// лайк карточки
function likeCard(likeButton, cardId, counterLikes) {
  const likeMethod = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteCardLike
    : addCardLike;
  likeMethod(cardId)
    .then((res) => switchLike(likeButton, counterLikes, res))
    .catch((err) => console.log(err));
}
