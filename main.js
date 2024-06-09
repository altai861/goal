import './style.css'
// Api "https://todobackend-re9d.onrender.com"
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todo_api'
import { login, register,logout } from './api/auth_api'
import { renderAuthPage } from './pages/authPage'
import { renderHomepage } from './pages/homePage'

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await renderHomepage();
    } catch (error) {
        await renderAuthPage();
    }
})


