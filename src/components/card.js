export { createCard, deleteCard, likeCard }

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, deleteCard, likeCard, openImagePopup) {
    const itemElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    const deleteButton = itemElement.querySelector(".card__delete-button");
    const likeButton = itemElement.querySelector(".card__like-button");
    const cardImage = itemElement.querySelector(".card__image");

    itemElement.querySelector(".card__title").textContent = cardData.name;
    itemElement.querySelector(".card__image").src = cardData.link;
    itemElement.querySelector(".card__image").alt = cardData.name;
    deleteButton.addEventListener("click", deleteCard);
    likeButton.addEventListener("click", likeCard);
    cardImage.addEventListener("click", openImagePopup);
    return itemElement;
} // объявление функции создания карточки

function deleteCard(event) {
    const card = event.target.closest(".places__item");
    card.remove();
} // удаление карточки

function likeCard(event) {
    event.target.classList.toggle("card__like-button_is-active");
} // лайк карточки
