import apiUrl from "../config/apiUrl";
const API_URL = `${apiUrl}/goal` 

export async function localDateFinder() {
    let date = new Date();
    let localDateString = date.toLocaleString()
    let resultDateList = localDateString.split(",")[0].split("/");
    let result = resultDateList[2] + "-" + (resultDateList[0].length === 2 ? resultDateList[0] : "0" + resultDateList[0]) + "-" + (resultDateList[1].length === 2 ? resultDateList[1] : "0" + resultDateList[1])
    return result
}

const accessToken = localStorage.getItem("accessToken");

export async function fetchGoals() {
    if (!accessToken || accessToken === "") {
        throw new Error("Access token not found");
    }
    let todayDate = await localDateFinder();
    //console.log(todayDate)
    const response = await fetch(`${API_URL}?date=${todayDate}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    if (!response.ok) {
        localStorage.clear();
        throw new Error("Failed to fetch goals");
    }
    return await response.json();
}

export async function createGoalAPI(newGoalObject) {
    if (!accessToken || accessToken === "") {
        throw new Error("Access token not found");
    }
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(newGoalObject)
    })
    if (!response.ok) {
        throw new Error("Failed to create todo");
    }

    return await response.json();
}

export async function updateGoal(id, updateObject) {
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

export async function deleteGoal(id) {
    if (!accessToken || accessToken === "") {
        throw new Error("Access token not found");
    }
    const response = await fetch(`${API_URL}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ goalId: id })
    });
    if (!response.ok) {
        throw new Error("Failed to delete goal");
    }

    return await response.json();
}