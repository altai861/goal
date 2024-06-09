import { fetchTodos } from "../api/todo_api";
import { renderAuthPage } from "./authPage";

export async function renderHomepage() {
    
    const todos = await fetchTodos();
    console.log(todos);
    document.getElementById("app").innerHTML = JSON.stringify(todos)
    
    
}