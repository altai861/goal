import { fetchGoals, localDateFinder, createGoalAPI, deleteGoal, updateGoal } from "../api/goal_api.js";
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
    localStorage.setItem("goals", goals);
    const localDate = await localDateFinder();
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
                <a class="nav-link" style="cursor: pointer;">Calendar</a>
            </li>
            <li class="nav-item cursor-pointer">
            <a class="nav-link" data-bs-toggle="modal" data-bs-target="#new-goal-modal" style="cursor: pointer;">New Goal</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" style="cursor: pointer;">Progress</a>
            </li>
        </ul>
        <span class="navbar-text px-2">
            ${localDate}
        </span>
        <span class="navbar-text">
            "Aim up"
        </span>
        <button class="btn btn-dark mx-2" id="logout-button">
            Logout
        </button>
        </div>
    </div>

    `


    const mainDiv = document.createElement("div");
    const todayDiv = document.createElement("div");
    const weekDiv = document.createElement("div");
    const monthDiv = document.createElement("div");
    const seasonDiv = document.createElement("div");
    let goalContainerClass = "border rounded m-3 m-md-5 p-3 p-md-5";
    weekDiv.className = goalContainerClass
    todayDiv.className = goalContainerClass
    monthDiv.className = goalContainerClass
    seasonDiv.className = goalContainerClass

    //console.log(goals)

    // Create the list items using template literals
    // TODAY
    const listItemsToday = goals.dayGoals.length > 0 ? goals.dayGoals.map(goal => {
        return `
            <li data-bs-toggle="modal" data-bs-target="#single-goal-modal" data-identity="goal" data-goal-id=${goal._id} class="list-group-item list-group-item-action ${goal.completed === true ? "list-group-item-success" : ""}">
                ${goal.goalTitle}
            </li>
        `;
    }).join('') : "No goals for today";

    // Create the entire list
    const ulToday = `
        <ol class="list-group list-group-numbered">
            ${listItemsToday}
        </ol>
    `;
    todayDiv.innerHTML = `
        <h2>Today's goals</h2>
        ${ulToday}
    `

    // WEEK
    const listItemsWeek = goals.weekGoals.length > 0 ? goals.weekGoals.map(goal => {
        return `
        <li data-bs-toggle="modal" data-bs-target="#single-goal-modal" data-identity="goal" data-goal-id=${goal._id} class="list-group-item list-group-item-action ${goal.completed === true ? "list-group-item-success" : ""}">
            ${goal.goalTitle}
        </li>
        `;
    }).join('') : "No goals for this week";

    // Create the entire list
    const ulWeek = `
        <ol class="list-group list-group-numbered">
            ${listItemsWeek}
        </ol>
    `;
    weekDiv.innerHTML = `
        <h2>This week's goals</h2>
        ${ulWeek}
    `

    // MONTH
    const listItemsMonth = goals.monthGoals.length > 0 ? goals.monthGoals.map(goal => {
        return `
            <li data-bs-toggle="modal" data-bs-target="#single-goal-modal" data-identity="goal" data-goal-id=${goal._id} class="list-group-item list-group-item-action ${goal.completed === true ? "list-group-item-success" : ""}">
                ${goal.goalTitle}
            </li>
        `;
    }).join('') : "No goals for this month";

    // Create the entire list
    const ulMonth = `
        <ol class="list-group list-group-numbered">
            ${listItemsMonth}
        </ol>
    `;
    monthDiv.innerHTML = `
        <h2>This month's goals</h2>
        ${ulMonth}
    `

    // SEASON
    const listItemsSeason = goals.seasonGoals.length > 0 ? goals.seasonGoals.map(goal => {
        return `
            <li data-bs-toggle="modal" data-bs-target="#single-goal-modal" data-identity="goal" data-goal-id=${goal._id} class="list-group-item list-group-item-action ${goal.completed === true ? "list-group-item-success" : ""}">
                ${goal.goalTitle}
            </li>
        `;
    }).join('') : "No goals for this season";

    // Create the entire list
    const ulSeason = `
        <ol class="list-group list-group-numbered">
            ${listItemsSeason}
        </ol>
    `;
    seasonDiv.innerHTML = `
        <h2>This season's goals</h2>
        ${ulSeason}
    `

    const newGoalModal = document.createElement("div");
    newGoalModal.className = "modal fade"
    newGoalModal.id = "new-goal-modal"
    newGoalModal.tabIndex = "-1"
    newGoalModal.setAttribute("aria-hidden", "true");
    newGoalModal.setAttribute("aria-labelledby", "newGoalModalLabel")

    newGoalModal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="newGoalModalLabel">New Goal</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger" id="alert-div" role="alert" style="display:none;">
                    <div>All three information is required to create Goal.</div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Your Goal</span>
                    <textarea class="form-control" aria-label="With textarea" id="goal-title-textarea"></textarea>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Span</label>
                    <select class="form-select" id="span-selector">
                        <option selected>Choose span</option>
                        <option value="1">Day</option>
                        <option value="2">Week</option>
                        <option value="3">Month</option>
                        <option value="4">Season</option>
                    </select>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Date</label>
                    <input type="date" id="new-goal-date">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="create-goal-button">Create Goal</button>
            </div>
            </div>
        </div>

    `

    const singleGoalModal = document.createElement("div");
    singleGoalModal.className = "modal fade"
    singleGoalModal.id = "single-goal-modal"
    singleGoalModal.tabIndex = "-1"
    singleGoalModal.setAttribute("aria-hidden", "true");
    singleGoalModal.setAttribute("aria-labelledby", "singleGoalModalLabel")

    singleGoalModal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="singleGoalModalLabel">Single Goal</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="single-goal-modal-body">
                <div class="input-group mb-3">
                    <span class="input-group-text">Your Goal</span>
                    <textarea class="form-control" aria-label="With textarea" id="goal-title-field"></textarea>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Span</label>
                    <select class="form-select" id="span-selector-field">
                        <option selected>Choose span</option>
                        <option value="1">Day</option>
                        <option value="2">Week</option>
                        <option value="3">Month</option>
                        <option value="4">Season</option>
                    </select>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Date</label>
                    <input type="date" id="goal-date-field">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-text">
                        <label for="goal-completed-field" class="mx-2">Completed</label>
                        <input class="form-check-input mt-0" type="checkbox" value="" id="goal-completed-field">
                    </div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Description</span>
                    <textarea class="form-control" aria-label="With textarea" id="goal-description-field"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" id="delete-button">Delete</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="save-changes-button">Save changes</button>
            </div>
            </div>
        </div>

    `


    mainDiv.appendChild(todayDiv)
    mainDiv.appendChild(weekDiv)
    mainDiv.appendChild(monthDiv);
    mainDiv.appendChild(seasonDiv);
    mainDiv.appendChild(newGoalModal);
    mainDiv.appendChild(singleGoalModal);
    app.appendChild(navbar);
    app.appendChild(mainDiv)

   


    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", () => {
        localStorage.clear();
        window.location.reload();
    })

    const createGoal = document.getElementById("create-goal-button");
    if (createGoal) {
        createGoal.addEventListener("click", async () => {
            const goalTitle = document.getElementById("goal-title-textarea");
            const goalSpan = document.getElementById("span-selector");
            const goalDate = document.getElementById("new-goal-date");
            if (!goalTitle.value || !goalSpan.value || !goalDate.value) {
                const alertDiv = document.getElementById("alert-div");
                if (alertDiv) {
                    alertDiv.style.display = "block";
                }
            } else {
                console.log(typeof goalTitle.value);
                console.log(typeof goalSpan.value);
                console.log(typeof goalDate.value);
                let newGoalObject = {
                    goalTitle: goalTitle.value,
                    type: goalSpan.value === "1" ? "D" : goalSpan.value === "2" ? "W" : goalSpan.value === "3" ? "M" : "S",
                    date: goalDate.value
                }

                const response = await createGoalAPI(newGoalObject);
                console.log(response);
                window.location.reload();
            }
        })
    }

    const goalItems = document.querySelectorAll('[data-identity="goal"]');
    goalItems.forEach(goal => {
        goal.addEventListener("click", function() {
            const id = this.getAttribute('data-goal-id');

            function findGoalById(id) {
                let foundGoal = goals.seasonGoals.find(goal => goal._id === id);
                if (foundGoal) return foundGoal
                // Check monthGoals
                foundGoal = goals.monthGoals.find(goal => goal._id === id);
                if (foundGoal) return foundGoal
                // Check weekGoals
                foundGoal = goals.weekGoals.find(goal => goal._id === id);
                if (foundGoal) return foundGoal
                // Check dayGoals
                foundGoal = goals.dayGoals.find(goal => goal._id === id);
                if (foundGoal) return foundGoal

                return null;
            }

            const goal = findGoalById(id);
            const goalTitleField = document.getElementById("goal-title-field");
            const goalTypeField = document.getElementById("span-selector-field");
            const goalDateField = document.getElementById("goal-date-field");
            const goalCompletedField = document.getElementById("goal-completed-field");
            const goalDescriptionField = document.getElementById("goal-description-field");
            goalTitleField.value = goal.goalTitle;
            goalTypeField.value = goal.type === "D" ? "1" : goal.type === "W" ? "2" : goal.type === "M" ? "3" : "4";
            goalDateField.value = goal.date;
            goalCompletedField.checked = goal.completed === true ? "true" : ""
            goalDescriptionField.value = goal.description;

            const deleteButton = document.getElementById("delete-button");
            if (deleteButton) {
                deleteButton.addEventListener("click", async () => {
                    console.log("delete button clicked", id);
                    const response = await deleteGoal(id);
                    console.log(response);
                    window.location.reload();
                })
            }

            const saveChangesButton = document.getElementById("save-changes-button");
            if (saveChangesButton) {
                saveChangesButton.addEventListener("click", async () => {
                    const updateGoalObject = {
                        goalTitle: goalTitleField.value,
                        type: goalTypeField.value === "1" ? "D" : goalTypeField.value === "2" ? "W" : goalTypeField.value === "3" ? "M" : "S",
                        date: goalDateField.value,
                        completed: goalCompletedField.checked ? true : false,
                        description: goalDescriptionField.value
                    }
                    const response = await updateGoal(id, updateGoalObject);
                    console.log(response);
                    window.location.reload();
                })
            }
        })
    })
}