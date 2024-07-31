const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");
const loginError = document.querySelector(".login-error");
const passwordError = document.querySelector(".password-error"); 

/////// Error message //////
export async function eventListenerLogin() {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let messages = [];
        if (messages.length > 0) {
            e.preventDefault();
        } else {
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
                window.location.href="/FrontEnd";
            
                window.localStorage.setItem("token" , result.token);
            } catch (error) {
                loginError.innerText ="Une erreur est survenue lors de la connexion.";
                console.error("Login error", error);
            }
    }
});
}
///////// Calling the Event Listener Function //////////

eventListenerLogin();