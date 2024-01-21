export { createCard, deleteCard, likeCard }
import { ownDeleteCard, addCardLike, deleteCardLike} from './api.js';

const cardTemplate = document.querySelector("#card-template").content;


function createCard(cardData, profileId, deleteCard, likeCard, openImagePopup) {
    const itemElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    const deleteButton = itemElement.querySelector(".card__delete-button");
    const likeButton = itemElement.querySelector(".card__like-button");
    const cardImage = itemElement.querySelector(".card__image");
    const cardTitle = itemElement.querySelector(".card__title");
    const counterLikes = itemElement.querySelector(".card__likes");

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    counterLikes.textContent = cardData.likes.length;


    if (defineOwnerCard(cardData.owner._id, deleteButton, profileId))
   {
    deleteButton.addEventListener("click", (event) => {
      deleteCard(event, cardData._id);
    });
  } // удаляем только нашу карточку

  const checkLike = cardData.likes.some((like) => like._id === profileId);
  if (checkLike) {
      likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (event) => {
    likeCard(event, cardData._id, counterLikes);
  });
    cardImage.addEventListener("click", openImagePopup);

    return itemElement;
} // объявление функции создания карточки

function defineOwnerCard(cardOwnerId, button, profileId) {
    if (cardOwnerId !== profileId) {
      button.classList.add('card__delete-button-disabled'); // если не владелец, скрываем кнопку удаления
    } 
    return true
  } // определяем владельца

function deleteCard(event, cardId) {
    ownDeleteCard(cardId).then(() => event.target.closest(".card").remove());
} // удаление карточки

function likeCard(event, cardId, counterLikes) {

      const likeMethod = event.target.classList.contains("card__like-button_is-active") ? deleteCardLike : addCardLike;
      likeMethod(cardId)
        .then((res) => {
          event.target.classList.toggle("card__like-button_is-active");
          counterLikes.textContent = res.likes.length;
        })
        .catch((err) => console.log(err));
    }
   // лайк карточки
