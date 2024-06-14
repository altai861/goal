import { login, register } from "../api/auth_api";
import { renderHomepage } from "./homePage";

export async function renderAuthPage() {
    const app = document.getElementById("app");
    app.innerHTML = ""
    const main = document.createElement("main");
    main.id = "auth-container"
    main.className = "container-fluid d-flex justify-content-center align-items-center flex-column mt-2"
   main.innerHTML = `
   <h2>Login</h2>
    <div class="form-floating mb-3">
        <input id="username-input" type="text" class="form-control" id="floatingInput" placeholder="username">
        <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating mb-3">
        <input id="password-input" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
    </div>
    <button class="btn btn-primary" id="login-button">Login</button>
    <p>Don't have an account, register <a id="register-here" style="cursor:pointer; color: blue;">here</a></p>
   `
    app.appendChild(main);


    const registerHereA = document.getElementById("register-here");
    registerHereA.addEventListener("click", () => {
        renderRegister();
    })

    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", async () => {
        const username = document.getElementById("username-input").value;
        const password = document.getElementById("password-input").value;

        if (!username || !password) {
            alert("Username and password are required");
        } else {
            const response = await login(username, password);
            //console.log(response)
            window.location.reload();
        }
    })

}

export default function renderRegister() {
    const app = document.getElementById("app");
    app.innerHTML = ""
    const main = document.createElement("main");
    main.id = "auth-container"
    main.className = "container-fluid d-flex justify-content-center align-items-center flex-column mt-2"
   main.innerHTML = `
   <h2>Register</h2>
    <div class="form-floating mb-3">
        <input id="username-input" type="text" class="form-control" id="floatingInput" placeholder="username">
        <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating mb-3">
        <input id="password-input" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
    </div>
    <div class="form-floating mb-3">
        <input id="confirm-password-input" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Confirm password</label>
    </div>
    <button class="btn btn-primary" id="register-button">Register</button>
    <p>Have an account, login <a id="login-here" style="cursor:pointer; color: blue;">here</a></p>
   `
    app.appendChild(main);


    const registerHereA = document.getElementById("login-here");
    registerHereA.addEventListener("click", () => {
        renderLogin();
    })

    const registerButton = document.getElementById("register-button");
    registerButton.addEventListener("click", async () => {
        const username = document.getElementById("username-input").value;
        const password = document.getElementById("password-input").value;
        const confirmPassword = document.getElementById("confirm-password-input").value;

        if (!username || !password || !confirmPassword) {
            alert("Username, password and confirmed password are required");
        } else {
            if (password !== confirmPassword) {
                alert("Confirmed password does not match");
            } else {
                const response = await register(username, password);
                //console.log(response)
                window.location.reload();
            }
        }
    })

}