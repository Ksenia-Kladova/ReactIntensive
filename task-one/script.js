const linkEmpty = document.querySelectorAll("[href='#']");
linkEmpty.forEach(link => {
  link.addEventListener('click', el => el.preventDefault());
});

const modal = document.querySelector('.modal');
const form = document.querySelector('.modal__form');
const inputEmail = document.querySelector('.modal__input-email');
const inputPassword = document.querySelector('.modal__input-password');
const placeholder = document.querySelectorAll('.input-label');
const btnHidden = document.querySelector('.modal__btn-password');
const btnCloseModal = document.querySelector('.modal__btn-close');
const errorPassword = document.querySelector('.modal__input-password-error');
const errorEmail = document.querySelector('.modal__input-email-error');

btnHidden.addEventListener('click', () => {
  if (inputPassword.type == 'password') {
    btnHidden.innerHTML = '<svg class="btn-password-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 13C6.6 5 17.4 5 21 13M12 17C11.606 17 11.2159 16.9224 10.8519 16.7716C10.488 16.6209 10.1573 16.3999 9.87868 16.1213C9.6001 15.8427 9.37913 15.512 9.22836 15.1481C9.0776 14.7841 9 14.394 9 14C9 13.606 9.0776 13.2159 9.22836 12.8519C9.37913 12.488 9.6001 12.1573 9.87868 11.8787C10.1573 11.6001 10.488 11.3791 10.8519 11.2284C11.2159 11.0776 11.606 11 12 11C12.7956 11 13.5587 11.3161 14.1213 11.8787C14.6839 12.4413 15 13.2044 15 14C15 14.7956 14.6839 15.5587 14.1213 16.1213C13.5587 16.6839 12.7956 17 12 17Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    inputPassword.type = 'text';
  } else {
    btnHidden.innerHTML = '<svg class="btn-password-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M19.5 16L17.025 12.604M12 17.5V14M4.5 16L6.969 12.612M3 8C6.6 16 17.4 16 21 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </svg>';
    inputPassword.type = 'password';
  }
})

function validateEmail(email) {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
}

inputEmail.addEventListener("input", function () {
  if (validateEmail(inputEmail.value) == false) {
    errorEmail.textContent = "неверный Email";
    inputEmail.classList.add('modal__input-email--error');
  } else {
    errorEmail.textContent = "";
    inputEmail.classList.remove('modal__input-email--error');
  }
});
inputPassword.addEventListener("input", function () {
  if (inputPassword.value.length < 8) {
    errorPassword.textContent = "Пароль должен быть не менее 8 символов";
    inputPassword.classList.add('modal__input-password--error');
  } else {
    errorPassword.textContent = "";
    inputPassword.classList.remove('modal__input-password--error');
  }
});

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const isValid = validateForm();

  if (isValid) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        email: inputEmail.value,
        password: inputPassword.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const formData = await response.json();
    alert(`${formData.email}, вход выполнен!`);
  }
});

function validateForm() {
  let isValid = true;

  if (validateEmail(inputEmail.value) == false) {
    isValid = false;
  }
  if (inputPassword.value.length < 8) {
    isValid = false;
  }
  return isValid;
}