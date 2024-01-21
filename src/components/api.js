export { getInitialInfo, allUserInfo, addNewCard, ownDeleteCard, addCardLike, deleteCardLike, changeUserAvatar }

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '2805580d-35e3-4b90-8bbe-1cc5c46791e0',
    'Content-Type': 'application/json'
  }
} // авторизация

const request = (res) => {
  if (res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const getUserInfo  = () => {
  return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
}).then((res) => request(res));
};// получение данных пользователя


const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
}).then((res) => request(res));
};// загрузка карточек с сервера

const getInitialInfo = () => {
  return Promise.all([getUserInfo(), getInitialCards()]);
}; // получаем все данные

  const allUserInfo = (profileUser) => {
   return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileUser.name,
      about: profileUser.about,
    })
  }).then((res) => request(res));
}; // редактирование профиля

const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then((res) => request(res));
}; // добавление новой карточки на страницу

const ownDeleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => request(res));
}; // удаление карточки

const addCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => request(res));
}; // добавление лайка

const deleteCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => request(res));
}; // удаление лайка

const changeUserAvatar = (linkNewAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkNewAvatar.value,
    }),
  }).then((res) => request(res));
}; // смена аватара