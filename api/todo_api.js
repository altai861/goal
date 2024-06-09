import apiUrl from "../config/apiUrl";
const API_URL = `${apiUrl}/todo` 

const accessToken = localStorage.getItem("accessToken");

export async function fetchTodos() {
    if (!accessToken || accessToken === "") {
        throw new Error("Access token not found");
    }
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    if (!response.ok) {
        localStorage.clear();
        throw new Error("Failed to fetch todos");
    }
    return await response.json();
}

export async function createTodo(newTodoObject) {
    if (!accessToken || accessToken === "") {
        throw new Error("Access token not found");
    }
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(newTodoObject)
    })
    if (!response.ok) {
        throw new Error("Failed to create todo");
    }

    return await response.json();
}

export async function updateTodo(id, updateObject) {
    if (!accessToken || accessToken === "") {
        throw new Error("Access token not found");
    }

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        throw new Error("Failed to update todo");
    }

    return await response.json();
}

export async function deleteTodo(id) {
    if (!accessToken || accessToken === "") {
        throw new Error("Access token not found");
    }
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to delete todo");
    }

    return await response.json();
}