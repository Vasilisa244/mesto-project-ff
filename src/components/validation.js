export { clearValidation, enableValidation };

function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
      checkInputValidity(config, formElement, inputElement);
      hideInputError(config, formElement, inputElement);
    });
    toggleButtonState(config, inputList, buttonElement);
  } // очищаем ошибки валидации

function checkInputValidity(config, formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
      showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(config, formElement, inputElement);
    }
  } // проверяем валидность и выводим сообщение об ошибке
  
  const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }; // добавляем классы ошибок
  
  const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }; // убираем классы ошибок
  
  function hasInvalidInput(inputList) {
    return inputList.some(input => !input.validity.valid)
  } // каждый эл массива проверяем на корректносить содержимого
  
  function toggleButtonState(config, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) { 
        buttonElement.setAttribute('disabled', true);        
      buttonElement.classList.add(config.inactiveButtonClass);    
    } else {
        buttonElement.removeAttribute('disabled', false);
      buttonElement.classList.remove(config.inactiveButtonClass); 
    } 
    }; // функция активности-неактивности кнопки
  
  
  function setEventListeners(config, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(config, inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(config, formElement, inputElement);
        toggleButtonState(config, inputList, buttonElement);
      });
    });
  }; // добавляем обработчики полям формы
  
  function enableValidation(config) {
   const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      setEventListeners(config, formElement);
  }); 
  } // добавляем обработчики формам
