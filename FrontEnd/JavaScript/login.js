const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");
const loginError = document.querySelector(".login-error");
const passwordError = document.querySelector(".password-error");

/////// LogIn + Error message //////

async function eventListenerLogin() {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // let messages = [];
        // if (messages.length > 0) {
        //     e.preventDefault();
        // } else {
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email: email.value, password: password.value })
            });
            if (!response.ok) {
                throw new Error("error" + response.status);
            }
            const result = await response.json();
            window.location.href = "/FrontEnd";

            window.localStorage.setItem("token", result.token);
            isLoggedIn()
        } catch (error) {
            loginError.innerText = "Une erreur est survenue lors de la connexion.";
            console.error("Login error", error);
        }
    }
    );
}
///////// Calling the Event Listener Function //////////

eventListenerLogin();


///////// LoggedIn Function ////////////

function isLoggedIn() {
    const token = localStorage.getItem("token"); // retrieves the token from local storage
    if (token) { //checks if the token exists
        const loginLogout = document.querySelector(".login-logout");

        if (loginLogout) { // it's refering to the class
            if (token) { // it's refering to the const token
                loginLogout.innerText = "logout";
                loginLogout.addEventListener('click', handleLogout); //hanldeLogout function called in response of this click action
            } else {
                loginLogout.innerText = "login";
                loginLogout.removeEventListener('click', handleLogout); //hanldeLogout function called in response of this click action
            }
        }
    }
}

/////////// Handle logout action/////////// 

function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload(); // Reload the page to reflect changes
}

/////// Calling the functions ///////////

eventListenerLogin();
isLoggedIn();
