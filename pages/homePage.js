import { fetchGoals } from "../api/goal_api.js";
import { renderAuthPage } from "./authPage";

{/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar w/ text</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
          </ul>
          <span class="navbar-text">
            Navbar text with an inline element
          </span>
        </div>
      </div>
    </nav> */}

export async function renderHomepage() {
    const goals = await fetchGoals();

    const app = document.getElementById("app");
    const navbar = document.createElement("nav");
    navbar.className = "navbar navbar-expand-lg bg-body-tertiary"
    
    navbar.innerHTML = `
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Goals</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Calendar</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">New Goal</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">Progress</a>
            </li>
        </ul>
        <button class="btn btn-dark mx-2" id="logout-button">
            Logout
        </button>
        <span class="navbar-text">
            "Aim up"
        </span>
        </div>
    </div>

    `


    const mainDiv = document.createElement("div");
    const todayDiv = document.createElement("div");
    const weekDiv = document.createElement("div");
    const monthDiv = document.createElement("div");
    const seasonDiv = document.createElement("div");
    weekDiv.className = "p-5";
    todayDiv.className = "p-5"
    monthDiv.className = "p-5"
    seasonDiv.className = "p-5"

    console.log(goals)

    // Create the list items using template literals
    // TODAY
    const listItemsToday = goals.dayGoals.map(goal => {
        return `
            <li class="list-group-item ">
                <input class="form-check-input me-1" type="checkbox" id="${goal._id}" ${goal.completed ? 'checked' : ''}>
                <label class="form-check-label" for="${goal._id}">${goal.goalTitle}</label>
            </li>
        `;
    }).join('');

    // Create the entire list
    const ulToday = `
        <ul class="list-group">
            ${listItemsToday}
        </ul>
    `;
    todayDiv.innerHTML = `
        <h2>Today's goals</h2
        ${ulToday}
    `

    // WEEK
    const listItemsWeek = goals.weekGoals.map(goal => {
        return `
            <li class="list-group-item ">
                <input class="form-check-input me-1" type="checkbox" id="${goal._id}" ${goal.completed ? 'checked' : ''}>
                <label class="form-check-label" for="${goal._id}">${goal.goalTitle}</label>
            </li>
        `;
    }).join('');

    // Create the entire list
    const ulWeek = `
        <ul class="list-group">
            ${listItemsWeek}
        </ul>
    `;
    weekDiv.innerHTML = `
        <h2>This week's goals</h2
        ${ulWeek}
    `

    // MONTH
    const listItemsMonth = goals.monthGoals.map(goal => {
        return `
            <li class="list-group-item ">
                <input class="form-check-input me-1" type="checkbox" id="${goal._id}" ${goal.completed ? 'checked' : ''}>
                <label class="form-check-label" for="${goal._id}">${goal.goalTitle}</label>
            </li>
        `;
    }).join('');

    // Create the entire list
    const ulMonth = `
        <ul class="list-group">
            ${listItemsMonth}
        </ul>
    `;
    monthDiv.innerHTML = `
        <h2>This month's goals</h2
        ${ulMonth}
    `

    // SEASON
    const listItemsSeason = goals.seasonGoals.map(goal => {
        return `
            <li class="list-group-item ">
                <input class="form-check-input me-1" type="checkbox" id="${goal._id}" ${goal.completed ? 'checked' : ''}>
                <label class="form-check-label" for="${goal._id}">${goal.goalTitle}</label>
            </li>
        `;
    }).join('');

    // Create the entire list
    const ulSeason = `
        <ul class="list-group">
            ${listItemsSeason}
        </ul>
    `;
    seasonDiv.innerHTML = `
        <h2>This season's goals</h2
        ${ulSeason}
    `

    mainDiv.appendChild(todayDiv)
    mainDiv.appendChild(weekDiv)
    mainDiv.appendChild(monthDiv);
    mainDiv.appendChild(seasonDiv);
    app.appendChild(navbar);
    app.appendChild(mainDiv)


    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        window.location.reload();
    })
}