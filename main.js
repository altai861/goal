document.addEventListener("DOMContentLoaded", async () => {
    const app = document.getElementById("app");
    const apiUrl = "http://localhost:3500";
    const state = {
        lists: [],
        selectedList: null,
        todos: [],
        selectedTodo: null,
    };

    const loginUser = async (username, password) => {
        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username: username, password: password })
            })

            const data = await response.json();

            if (response.ok) {
                console.log(data)
                renderMainWindow();
            } else {
                console.log("Login failed: ", data)
            }
        } catch (error) {
            console.error("Error during login: ", error)
        }
    }

    const registerUser = async (username, password) => {
        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ username, password })
            })

            const data = await response.json();

            if (response.ok) {
                console.log(data);
            } else {
                console.error("Registration failed: ", data);
            }
        } catch (error) {
            console.error("Error during register: ", error)
        }
    }

    const logOut = async () => {
        try {
            const response = await fetch(`${apiUrl}/auth/logout`, {
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                window.location.reload();
            } else {
                console.error("Logout failed: ", response.message);
            }
        } catch (error) {
            console.error("Error during logout: ", error);
        }
    }

    const fetchLists = async () => {
        try {
            const response = await fetch(`${apiUrl}/list`, {
                credentials: "include",
            });
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                state.lists = data.lists
                return true;
            } else {
                console.log("fetchin is failed: ", data);
                return false;
            }

        } catch (error) {
            console.error('Error during fetchLists:', error);
            return false
        }
    }

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${apiUrl}/todo`, {
                credentials: 'include',
            })
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                state.todos = data.todos;
                return true
            } else {
                console.error('Error fetching todos:', data);
                return false
            }
        } catch (error) {
            console.error("Todo fetch error: ", error);
            return false
        }
    }

    const renderApp = () => {
        app.innerHTML = "";

        
        checkUserAuth();
        
    }

    const renderLogin = () => {
        app.innerHTML = "";
        const loginForm = document.createElement("form");

        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = event.target.elements.username.value;
            const password = event.target.elements.password.value;
            await loginUser(username, password);
        })

        loginForm.innerHTML = `
            <h2>Login</h2>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Login</button>
        `;
        app.appendChild(loginForm);
    }

    const checkUserAuth = async () => {
        if (await fetchLists() && await fetchTodos()) {
            console.log(state.lists)
            console.log(state.todos)
            console.log("You are authenticated.");
            
        } else {
            console.log("You are not authenticated. Login");
            renderLogin();
        }
        
    }

    renderApp();
})