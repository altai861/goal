import { login, register } from "../api/auth_api";
import { renderHomepage } from "./homePage";

export async function renderAuthPage() {
    const app = document.getElementById("app");
    app.innerHTML = ""
    const main = document.createElement("main");
    main.id = "auth-container"

    const title = document.createElement("h1");

    const loginForm = document.createElement("form");
    const usernameInput = document.createElement("input");
    usernameInput.type = "text"
    usernameInput.id = "username-input"
    usernameInput.placeholder = "username"

    const passwordInput = document.createElement("input");
    passwordInput.type = "password"
    passwordInput.id = "password-input"
    passwordInput.placeholder = "password"

    usernameInput.required = true;
    passwordInput.required = true;

    const loginButton = document.createElement("button");
    loginButton.type = "submit"
    loginButton.textContent = "Login";
    loginButton.id = "login-button";

    loginForm.appendChild(usernameInput);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(loginButton);

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await login(usernameInput.value, passwordInput.value);
            //console.log(loginResponse)
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    })

    const p = document.createElement("p")
    p.innerHTML = "Don't have an account, register " + "<a id='register-here'>here</a>"
    title.innerHTML = "Login";

    main.appendChild(title)
    main.appendChild(loginForm)
    main.appendChild(p)

    app.appendChild(main);

    document.getElementById("register-here").addEventListener("click", () => {
        renderRegister();
    })

}

export default function renderRegister() {
    const app = document.getElementById("app");
    app.innerHTML = ""
    const main = document.createElement("main");
    main.id = "auth-container"

    const title = document.createElement("h1");

    const registerForm = document.createElement("form");
    const usernameInput = document.createElement("input");
    usernameInput.type = "text"
    usernameInput.id = "username-input"
    usernameInput.placeholder = "username"

    const passwordInput = document.createElement("input");
    passwordInput.type = "password"
    passwordInput.id = "password-input"
    passwordInput.placeholder = "password"
    const passwordConfirmInput = document.createElement("input");
    passwordConfirmInput.type = "password"
    passwordConfirmInput.id = "password-input-confirm"
    passwordConfirmInput.placeholder = "confirm password"

    usernameInput.required = true;
    passwordInput.required = true;
    passwordConfirmInput.required = true;

    const registerButton = document.createElement("button");
    registerButton.type = "submit"
    registerButton.textContent = "Register";
    registerButton.id = "login-button";

    registerForm.appendChild(usernameInput);
    registerForm.appendChild(passwordInput);
    registerForm.appendChild(passwordConfirmInput);
    
    registerForm.appendChild(registerButton);

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            if (passwordConfirmInput.value !== passwordInput.value) {
                alert("Password does not match"); return;
            }
            const registerResponse = await register(usernameInput.value, passwordInput.value);
            console.log(registerResponse)
            alert("Registration successful");
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    })

    const p = document.createElement("p")
    p.innerHTML = "Have an account, login " + "<a id='register-here'>here</a>"
    title.innerHTML = "Register";

    main.appendChild(title)
    main.appendChild(registerForm)
    main.appendChild(p)

    app.appendChild(main);

    document.getElementById("register-here").addEventListener("click", () => {
        renderAuthPage();
    })

}