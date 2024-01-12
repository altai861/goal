import './style.css'

document.addEventListener("DOMContentLoaded", async () => {
    const app = document.getElementById("app");

    const deleteListModal = document.getElementById("deleteListModal");
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');
    
    const contextMenu = document.getElementById('contextMenu');

    const deleteTodoModal = document.getElementById("deleteTodoModal");
    const confirmDeleteButtonTodo = document.getElementById('confirmDeleteTodo');
    const cancelDeleteButtonTodo = document.getElementById('cancelDeleteTodo');
    
    const todoContextMenu = document.getElementById('todoContextMenu');

    // Api "https://todobackend-re9d.onrender.com"
    const apiUrl = "https://todobackend-re9d.onrender.com";
    const state = {
        username: null,
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
                state.username = data.username;
                checkUserAuth();
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
                //window.location.reload();
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
                state.username = data.username
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
            <h2>Нэвтрэх</h2>
            <label for="username">Хэрэглэгчийн нэр:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Нууц үг:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">нэвтрэх</button>
        `;
        app.appendChild(loginForm);
    }

    const checkUserAuth = async () => {
        if (await fetchLists() && await fetchTodos()) {
            console.log(state.lists)
            console.log(state.todos)
            console.log("You are authenticated.");
            renderMainWindow();
            
        } else {
            console.log("You are not authenticated. Login");
            renderLogin();
        }
        
    }

    const renderMainWindow = async () => {
        app.innerHTML = "";

        const header = await createHeader();

        const container = document.createElement("div");
        container.id = "container";

        const lists = await createLists();

        const todos = await createTodos();

        const todoDetail = await createDetails();

        app.appendChild(header);
        container.appendChild(lists);
        container.appendChild(todos);
        container.appendChild(todoDetail);
        app.appendChild(container)
    }

    const createHeader = async () => {
        const header = document.createElement("div");
        header.classList.add("header")

        //Logout button
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Гарах"
        header.appendChild(logoutButton);
        logoutButton.addEventListener("click", () => logOut());

        // Hi username text
        const hiUsername = document.createElement("h2");
        hiUsername.textContent = `За юу байна, хөөрхөнөө ${state.username}`
        header.appendChild(hiUsername)


        return header;
    }

    const createLists = async () => {
        const lists = document.createElement("div");
        lists.id = "lists";
        const listsTitle = document.createElement("h2");
        listsTitle.textContent = "Жагсаалтууд";
        lists.appendChild(listsTitle);

        //My Day
        const myDayList = document.createElement("div");
        myDayList.classList.add("single-list")
        const myDayListName = document.createElement("p");
        myDayListName.textContent = "Өнөөдрийн төлөвлөгөө";
        myDayList.appendChild(myDayListName);

        lists.appendChild(myDayList);

        myDayList.addEventListener("click", async () => {
            const allLists = document.querySelectorAll('.single-list');
            allLists.forEach(list => list.classList.remove('selected'));

            // Add "selected" class to the clicked div
            myDayList.classList.add('selected');

            state.selectedList = "myDay";
            await updateTodos();
        })



        // Planned
        const plannedList = document.createElement("div");
        plannedList.classList.add("single-list")
        const plannedName = document.createElement("p");
        plannedName.textContent = "Төлөвлөсөн";
        plannedList.appendChild(plannedName);

        lists.appendChild(plannedList);

        plannedList.addEventListener("click", async () => {
            const allLists = document.querySelectorAll('.single-list');
            allLists.forEach(list => list.classList.remove('selected'));

            // Add "selected" class to the clicked div
            plannedList.classList.add('selected');

            state.selectedList = "planned";
            await updateTodos();
        })

        // All
        const allList = document.createElement("div");
        allList.classList.add("single-list");
        const allName = document.createElement("p");
        allName.textContent = "Бүгд";
        allList.appendChild(allName);

        lists.appendChild(allList);

        allList.addEventListener("click", async () => {
            const allLists = document.querySelectorAll('.single-list');
            allLists.forEach(list => list.classList.remove('selected'));

            // Add "selected" class to the clicked div
            allList.classList.add('selected');
            state.selectedList = "all";
            await updateTodos();
        })

        lists.appendChild(document.createElement("hr"));

        // Custom Lists
        if (state.lists.length === 0) {
            const infoText = document.createElement("p");
            infoText.textContent = "You have no lists created, buddy";
            lists.appendChild(infoText);
        } else {
            state.lists.map((list) => {

                const singleList = document.createElement("div");
                singleList.classList.add("single-list")
                const listName = document.createElement("p");
                listName.textContent = list.title;
                singleList.appendChild(listName);
    
                lists.appendChild(singleList);

                singleList.addEventListener("click", async () => {
                    const allLists = document.querySelectorAll('.single-list');
                    allLists.forEach(list => list.classList.remove('selected'));

                    // Add "selected" class to the clicked div
                    singleList.classList.add('selected');

                    state.selectedList = list;
                    await updateTodos();
                })

                singleList.addEventListener("contextmenu", (event) => {
                    const listId = list._id;

                    handleListContextMenu(event, listId);
                })
                
            })
        }

        const newListInput = document.createElement("input");
        const addListButton = document.createElement("button");

        addListButton.innerText = "Нэмэх";
        
        lists.appendChild(newListInput)
        lists.appendChild(addListButton)

        addListButton.addEventListener("click", async () => {
            if (newListInput.value === "") {
                console.log("HOOSON BAINA");
            } else {
                try {
                    const response = await fetch(`${apiUrl}/list`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({ title: newListInput.value.trim() })
                    });
    
                    if (response.ok) {
                        const responseData = await response.json();
                        console.log('List created successfully:', responseData);
                        window.location.reload();
                        // Add any additional logic after successful creation
                      } else {
                        console.error('Failed to create list');
                        // Handle the error or show a message to the user
                      }
                } catch (error) {
                    console.error('Error creating list:', error);
                }
            
            }
        })

        return lists
    }

    const handleListContextMenu = (event, listId) => {
        // Prevent the default context menu
        event.preventDefault();
      
        // Show the custom context menu
        contextMenu.style.display = 'block';
      
        // Position the context menu at the cursor location
        contextMenu.style.left = `${event.pageX}px`;
        contextMenu.style.top = `${event.pageY}px`;
      
        // Handle click outside the context menu to hide it
        document.addEventListener('click', hideContextMenu);
      
        // Handle "Delete List" option click
        const deleteListOption = document.getElementById('deleteListOption');
        deleteListOption.addEventListener('click', () => {
          // Show the modal
          deleteListModal.style.display = 'block';
      
          // Handle confirm delete button click
          confirmDeleteButton.addEventListener('click', () => {
            // Add logic to delete the list (you can make an API call, update state, etc.)
            console.log(`List ${listId} deleted`);
            
            deleteList(listId);
      
            // Close the modal
            deleteListModal.style.display = 'none';
      
            // Hide the custom context menu
            contextMenu.style.display = 'none';
      
            // Remove the click outside event listener
            document.removeEventListener('click', hideContextMenu);

            window.location.reload();
          });
      
          // Handle cancel delete button click
          cancelDeleteButton.addEventListener('click', () => {
            // Close the modal without deleting the list
            deleteListModal.style.display = 'none';
      
            // Hide the custom context menu
            contextMenu.style.display = 'none';
      
            // Remove the click outside event listener
            document.removeEventListener('click', hideContextMenu);
          });
        });
      };
      
      // Function to hide the custom context menu
      const hideContextMenu = () => {
        contextMenu.style.display = 'none';
        document.removeEventListener('click', hideContextMenu);
      };
    
    const deleteList = async (listId) => {
        try {
            const response = await fetch(`${apiUrl}/list/${listId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (response.ok) {
                console.log(`List ${listId} deleted successfully`);
            } else {
                console.error(`Failed to delete ${listId}`);
            }


        } catch (error) {
            console.error("Error deleting a list:", error);
        }
    }

    const updateTodos = async () => {
        let todos;
        const today = new Date().toLocaleDateString();
        const todosDiv = document.getElementById("todos");
        todosDiv.innerHTML = "";

        const addTodoForm = document.createElement("div");
        addTodoForm.classList = "container";
        const form = document.createElement("form");
        form.id = "addTodoForm";
        const inputTitle = document.createElement("input");
        inputTitle.type = "text";
        inputTitle.id = "todoTitle";
        inputTitle.name = 'todoTitle';
        inputTitle.required = true;

        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.id = "todoDate";
        dateInput.name = "todoDate";

        const button = document.createElement("button");
        button.innerText = "Let's Roll"
        button.type = "submit";

        form.appendChild(inputTitle)
        form.appendChild(dateInput);
        form.appendChild(button);

        addTodoForm.appendChild(form);

        todosDiv.appendChild(addTodoForm)

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log(inputTitle.value.trim());
            console.log(dateInput.value)

            let data = {};
            data.todoTitle = inputTitle.value.trim();
            data.date = dateInput.value;
            if (typeof state.selectedList !== 'string') {
                data.listId = state.selectedList.listId
            }

            const response = await fetch(`${apiUrl}/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            if (response.ok) {
                console.log("Added todo");
                window.location.reload();
            } else {
                console.log("Error adding todo");
            }

        })


        if (typeof state.selectedList === "string") {
            if (state.selectedList === "myDay") {
                todos = state.todos.filter(todo => {
                    const todoDate = new Date(todo.date).toLocaleDateString();
                    return todoDate === today;
                })
            } else if (state.selectedList === "planned") {
                todos = state.todos.filter(todo => {
                    return todo.date !== null
                })
            } else if (state.selectedList === "all") {
                todos = state.todos
            } else {
                console.log("No list");
            }
            
        } else {
            todos = state.todos.filter(todo => {
                console.log(state.selectedList.listId)
                return todo.listId === state.selectedList.listId
            })
        }

        if (todos.length !== 0) {
            todos.forEach(todo => {
                const singleTodo = document.createElement("div");
                singleTodo.classList.add("single-todo")
                const otherInfoDiv = document.createElement("div");
                const title = document.createElement("h4");
                const date = document.createElement("p");
                title.textContent = todo.todoTitle;
                date.textContent = todo.date;

                const completedInput = document.createElement("input");
                completedInput.type = 'checkbox';
                completedInput.checked = todo.completed

                otherInfoDiv.appendChild(date)
                otherInfoDiv.appendChild(completedInput)

                singleTodo.appendChild(title);
                singleTodo.appendChild(otherInfoDiv)
                todosDiv.appendChild(singleTodo)

                singleTodo.addEventListener("click", async () => await updateDetails(todo))

                singleTodo.addEventListener("contextmenu", (event) => {
                    const todoId = todo._id;

                    handleTodoContextMenu(event, todoId);
                })

                completedInput.addEventListener("change", async () => {
                    const newCompletedValue = !todo.completed;
                    console.log(newCompletedValue)
                    try {
                        const response = await fetch(`${apiUrl}/todo/completed/${todo._id}`, {
                          credentials: 'include',
                        });
                    
                        // Handle the response as needed
                        if (response.ok) {
                          console.log(response);
                          window.location.reload();
                          // Additional handling if needed
                        } else {
                          console.error('PUT request failed');
                          // Additional error handling if needed
                        }
                      } catch (error) {
                        console.error('Error making PUT request:', error);
                        // Handle the error as needed
                      }
                      await createTodos();
                })
            })
            console.log(todos);
        } else {
            const p = document.createElement("p");
            p.textContent = "Юм алгадаа хөгшөөн";
            todosDiv.appendChild(p);
            console.log("YOu have no todos, buddy");
        }

        
    }


    const handleTodoContextMenu = (event, todoId) => {
        // Prevent the default context menu
        event.preventDefault();
      
        // Show the custom context menu
        todoContextMenu.style.display = 'block';
      
        // Position the context menu at the cursor location
        todoContextMenu.style.left = `${event.pageX}px`;
        todoContextMenu.style.top = `${event.pageY}px`;
      
        // Handle click outside the context menu to hide it
        document.addEventListener('click', hideTodoContextMenu);
      
        // Handle "Delete List" option click
        const deleteTodoOption = document.getElementById('deleteTodoOption');
        deleteTodoOption.addEventListener('click', () => {
          // Show the modal
          deleteTodoModal.style.display = 'block';
      
          // Handle confirm delete button click
          confirmDeleteButtonTodo.addEventListener('click', () => {
            // Add logic to delete the list (you can make an API call, update state, etc.)
            console.log(`Todo ${todoId} deleted`);
            
            deleteTodo(todoId);
      
            // Close the modal
            deleteTodoModal.style.display = 'none';
      
            // Hide the custom context menu
            todoContextMenu.style.display = 'none';
      
            // Remove the click outside event listener
            document.removeEventListener('click', hideTodoContextMenu);

            window.location.reload();
          });
      
          // Handle cancel delete button click
          cancelDeleteButtonTodo.addEventListener('click', () => {
            // Close the modal without deleting the list
            deleteTodoModal.style.display = 'none';
      
            // Hide the custom context menu
            todoContextMenu.style.display = 'none';
      
            // Remove the click outside event listener
            document.removeEventListener('click', hideTodoContextMenu);
          });
        });
      };
      
      // Function to hide the custom context menu
      const hideTodoContextMenu = () => {
        todoContextMenu.style.display = 'none';
        document.removeEventListener('click', hideTodoContextMenu);
      };

    const createTodos = async () => {
        const todos = document.createElement("div");
        todos.id = "todos";
        const todosTitle = document.createElement("h2");
        todosTitle.textContent = "Хийх зүйлс";
        todos.appendChild(todosTitle)
        return todos;
    }

    const deleteTodo = async (todoId) => {
        try {
            const response = await fetch(`${apiUrl}/todo/${todoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (response.ok) {
                console.log(`Todo ${todoId} deleted successfully`);
            } else {
                console.error(`Failed to delete ${todoId}`);
            }


        } catch (error) {
            console.error("Error deleting a todo:", error);
        }
    }

    const updateDetails = async (todo) => {
        const detailDiv = document.getElementById("details");
        detailDiv.innerHTML = ""
        console.log(detailDiv);
        console.log(todo);

        let todoTitle = todo.todoTitle
        let todoId = todo._id
        let completed = todo.completed
        let date = todo.date
        console.log(date);
        date = date.split("T")[0]
        let description = todo.description

        const todoTitleElement = document.createElement("h3")
        todoTitleElement.textContent = "Title";
        const titleInput = document.createElement("textarea");
        titleInput.id = "title-text-area"
        const dateInput = document.createElement("input");
        dateInput.type = "date"
        const completedElement = document.createElement("h4");
        completedElement.textContent = "Completed";
        const completedInput = document.createElement("input");
        completedInput.type = "checkbox"
        const descElement = document.createElement("h4");
        descElement.textContent = "Description";
        const descTextarea = document.createElement("textarea");
        descTextarea.id = "desc-text-area"
        
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";

        titleInput.value = todoTitle;
        dateInput.value = date;
        completedInput.checked = completed ? true : false
        descTextarea.value = description

        detailDiv.appendChild(todoTitleElement)
        detailDiv.appendChild(titleInput);
        detailDiv.appendChild(dateInput);
        detailDiv.appendChild(completedElement)
        detailDiv.appendChild(completedInput);
        detailDiv.appendChild(descElement)
        detailDiv.appendChild(descTextarea);
        detailDiv.appendChild(saveButton);

        titleInput.addEventListener("change", async () => {
            todoTitle = titleInput.value
            console.log(todoTitle)
        })

        dateInput.addEventListener("change", async () => {
            date = dateInput.value;
            console.log(date)
        })

        completedInput.addEventListener("change", async () => {
            completed = completedInput.checked
            console.log(completed);
        })

        descTextarea.addEventListener("change", async () => {
            description = descTextarea.value;
            console.log(description);
        })

        saveButton.addEventListener("click", async () => {
            if (!todoTitle) alert("Todo should have title");

            const response = await fetch(`${apiUrl}/todo/${todoId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ todoTitle, date, completed, description })
            })

            if (response.ok) {
                console.log(response.json());
                window.location.reload();
            } else {
                console.log(response.json());
            }
        })
    }

    const createDetails = async () => {
        const todoDetail = document.createElement("div");
        todoDetail.id = "details"
        const detailsTitle = document.createElement("h2");
        detailsTitle.textContent = "Дэлгэрэнгүй";
        todoDetail.appendChild(detailsTitle)
        return todoDetail;
    }

    renderApp();
})