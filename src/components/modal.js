export { openPopup, closePopup };

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscPopup);
  document.addEventListener("click", closeOnLayout);
} // функция открытия попапа

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscPopup);
  document.removeEventListener("click", closeOnLayout);
} // функция закрытия попапа

function closeOnLayout(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(event.target);
  }
} // закрываем попап по оверлею

function closeEscPopup(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
} // закрываем по esc
