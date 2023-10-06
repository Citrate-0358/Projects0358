const toggleButton = document.querySelector('#toggle-password-button');
const passwordField = document.querySelector('#password');
const closedEye = document.querySelector('#closed-eye');
const openEye = document.querySelector('#open-eye');
let isPasswordHidden = true;
toggleButton.addEventListener('click', function() {
 if (isPasswordHidden) {
 passwordField.type = 'text';
 openEye.classList.remove('hide');
 openEye.classList.add('show');
 closedEye.classList.add('hide');
 closedEye.classList.remove('show');
 } else {
 passwordField.type = 'password';
 closedEye.classList.remove('hide');
 closedEye.classList.add('show');
 openEye.classList.add('hide');
 openEye.classList.remove('show');
 }
 isPasswordHidden = !isPasswordHidden;
});
