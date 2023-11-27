// @todo: Темплейт карточки есть

// @todo: DOM узлы есть

// @todo: Функция создания карточки есть

// @todo: Функция удаления карточки есть 

// @todo: Вывести карточки на страницу есть

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(initialCards, deleteCard) {
  const itemElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = itemElement.querySelector(".card__delete-button");
  itemElement.querySelector(".card__title").textContent = initialCards.name;
  itemElement.querySelector(".card__image").src = initialCards.link;
  itemElement.querySelector(".card__image").alt = initialCards.name;
  deleteButton.addEventListener('click', deleteCard);
  return itemElement;
}

function addCard(initialCards) {
  const newCard = createCard(initialCards, deleteCard);
  placesList.append(newCard);
  return newCard;
}

function deleteCard(element) {
  const card = element.target.closest(".places__item");
  card.remove();
}

initialCards.forEach((card) => {
  addCard(card, deleteCard)
});

