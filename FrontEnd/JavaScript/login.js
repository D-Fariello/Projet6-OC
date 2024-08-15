const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");
const loginError = document.querySelector(".login-error");

/////// LogIn + Error message //////

async function eventListenerLogin() {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
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
            window.location.href = "./index.html";

            window.localStorage.setItem("token", result.token);

        } catch (error) {
            loginError.innerText = "Une erreur est survenue lors de la connexion.";
            loginError.style.color = "#c40606";
            console.error("Login error", error);
        }
    }
    );
}


/////// Calling the functions ///////////
eventListenerLogin();


