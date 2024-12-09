const arrowRightElement = document.querySelector('.bi-arrow-bar-right');
const formContainer = document.querySelector('.login-signup-form');
 
arrowRightElement.addEventListener('click', () => {
  formContainer.style.display = "block"; // opening the form
  arrowRightElement.style.visibility = "hidden";
});

const arrowLeftElement = document.querySelector('.bi-arrow-bar-left');

arrowLeftElement.addEventListener('click', () => {
  formContainer.style.display = "none"; // closing the form
  arrowRightElement.style.visibility = "visible";
});


// Show password when clicked eye icon
const eyeElement = document.querySelector('.eye');
const eyeButtonElement = document.querySelector('.password-eye-icon');
eyeButtonElement.addEventListener('click', () => {
  var passwordInput = document.getElementById("input-auth");

  if(passwordInput.type === 'password') { 
    passwordInput.type = 'text';
    eyeElement.classList.remove('bi-eye-slash');
    eyeElement.classList.add('bi-eye');
  }
  else {
    passwordInput.type = 'password';
    eyeElement.classList.remove('bi-eye');
    eyeElement.classList.add('bi-eye-slash');
  }
});