export { openPopup, closePopup };

function openPopup(popup) {
    popup.classList.add("popup_is-opened");

    document.addEventListener("keydown", closeEscPopup);
    document.addEventListener("click", closeOnLayout);
    popup.addEventListener("submit", () => {
        closePopup;
    });
} // функция открытия попапа

function closePopup() {
    const popup = document.querySelector(".popup_is-opened");
    popup.classList.remove("popup_is-opened");
} // функция закрытия попапа

function closeOnLayout(event) {
    if (event.target.classList.contains("popup_is-opened")) {
        const popup = document.querySelector(".popup_is-opened");
        closePopup(popup);
    }
} // закрываем попап по оверлею

function closeEscPopup(event) {
    if (event.key === "Escape") {
        const popup = document.querySelector(".popup_is-opened");
        closePopup(popup);
    }
} // закрываем по esc
