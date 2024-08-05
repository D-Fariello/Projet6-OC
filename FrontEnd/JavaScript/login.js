const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");
const loginError = document.querySelector(".login-error");

/////// LogIn + Error message //////

export async function eventListenerLogin() {
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

///////// LoggedIn Function ////////////

export function isLoggedIn() {
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

    modifierButton(); // Adjust button visibility based on token
    removeFilters(); // Adjust filter visibility based on token
}

///////////// Handle logout action /////////// 

export function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload(); // Reload the page to reflect changes
}

/////////// Adding the modifier button ////////

export function modifierButton() {
    const token = localStorage.getItem("token"); // retrieves the token from local storage
    const modifyBtn = document.getElementById("modify-btn");
    const modifyMode = document.querySelector(".modify-mode");
    if (token) {
        modifyBtn.style.display = "inline-flex";
        modifyMode.style.display = "flex";
    } else {
        modifyBtn.style.display = "none";
        modifyMode.style.display = "none";
    }
}


/////////// Remove Filters //////////////

export function removeFilters() {
    const filterDiv = document.querySelector(".filterDiv");
    const token = localStorage.getItem("token");

    if (filterDiv) {
        if (token) {
            filterDiv.style.display = "none";
        } else {
            filterDiv.style.display = "flex";
        }
    }
}

/////// Calling the functions ///////////
eventListenerLogin();
isLoggedIn();


