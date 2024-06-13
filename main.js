import "./style.css"
// Api "https://todobackend-re9d.onrender.com"
import { fetchGoals, createGoalAPI, updateGoal, deleteGoal } from './api/goal_api.js'
import { login, register,logout } from './api/auth_api.js'
import { renderAuthPage } from './pages/authPage'
import { renderHomepage } from './pages/homePage'

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await renderHomepage();
    } catch (error) {
        await renderAuthPage();
    }
})


