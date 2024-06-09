// https://todobackend-re9d.onrender.com
import apiUrl from "../config/apiUrl";
const API_URL = apiUrl

export async function login(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
        throw new Error("Failed to login");
    } else {
        const data = await response.json()
        localStorage.setItem("accessToken", data?.accessToken);
        return data;
    }
    
}

export async function register(username, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
        throw new Error("Failed to register");
    }
    return await response.json();
}

export async function logout() {
    localStorage.setItem("accessToken", "");
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Failed to logout");
    }
    return await response.json();
}