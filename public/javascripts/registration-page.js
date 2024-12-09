// FILLED INPUT VALIDATION BEFORE SUBMIT
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


// SHOWING NEXT FORM WHEN CLICKING A NEXT BUTTON
const formElement = document.querySelectorAll('.form');
const nextButtonElemet = document.querySelectorAll('.next');
let currentFormNumber = 0;
nextButtonElemet.forEach((next, i) => {
  next.addEventListener('click', () => {
    if(currentFormNumber < formElement.length-1) {
      formElement[currentFormNumber].classList.add('hidden');

      // increment whenever click next button to show the next form
      currentFormNumber++
      formElement[currentFormNumber].classList.remove('hidden');
    }
  });
});

// SHOWING PREVIOUS FORM WHEN CLICKING BACK BUTTON 
const backButtonElement = document.querySelectorAll('.back');
backButtonElement.forEach((back, i) => {
  back.addEventListener('click', () => {
    if(currentFormNumber > 0) {
       // Hide the current form
       formElement[currentFormNumber].classList.add('hidden');

       // Show the previous form
       currentFormNumber--;
       formElement[currentFormNumber].classList.remove('hidden');
    }
  });
});


// Show password when clicked eye icon
const eyeElement = document.querySelector('.eye');
const eyeButtonElement = document.querySelector('.password-eye-icon');
eyeButtonElement.addEventListener('click', () => {
  var passwordInput = document.getElementById("validationCustomPassword");

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