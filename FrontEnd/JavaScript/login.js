const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");
const loginError = document.querySelector(".login-error");
const passwordError = document.querySelector(".password-error");

/////// Error message //////

form.addEventListener('submit', (e) => {
    let messages = [];
    if (email.value === '' || email.value == null ) {
        messages.push("Email requis");
    }

    if (password.value.length <= 6){
        messages.push("Le mot de passe doit comporter plus de 6 caractères");
    }

    if (password.value.length >= 15){
        messages.push("Le mot de passe doit comporter moins de 15 caractères");
    }

    if (password.value === "password"){
        messages.push("Le mot de passe doit etre different du mot 'password'");
    }

    if (messages.length > 0) {
    e.preventDefault(); //prevent our page of submitting
    loginError.innerText = messages.join(", ");
    passwordError.innerText = messages.join(", ");
    }
})