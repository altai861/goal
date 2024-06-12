import { fetchGoals } from "../api/goal_api.js";
import { renderAuthPage } from "./authPage";
import '../styles/home_style.css'

export async function renderHomepage() {
    
    const goals = await fetchGoals();
    console.log(goals);
    document.getElementById("app").innerHTML = JSON.stringify(goals)
    
    
}