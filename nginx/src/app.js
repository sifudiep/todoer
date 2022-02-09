window.addEventListener('DOMContentLoaded', (e) => {
    const ESCAPE_KEY_CODE = 27
    const CLASS_COLORED_BUTTON = "button is-warning width-100"
    const CLASS_UNCOLORED_BUTTON = "button is-light width-100"
    const PAGE_SIGNIN = "PAGE_SIGNIN"
    const PAGE_TODO = "PAGE_TODO"

    let main = document.querySelector("main")
    let todosPageButton = document.querySelector("#todosPageButton")
    let signInPageButton = document.querySelector("#signInPageButton")
    
    let currentPage = ""

    todosPageButton.addEventListener("click", (e) => {
        generateTodoPage()
    })

    signInPageButton.addEventListener("click", (e) => {
        if (currentPage != PAGE_SIGNIN) {
            generateSignInPage()
        }
    })

    let todos = [
        { title: "This is dummy", description: "data" },
        { title: "This is wat" },
        { title: "This is ddt", description: "eee" },

    ]

    const usernameInput = document.querySelector("input#email")
    const passwordInput = document.querySelector("input#password")

    async function checkIfUserIsAuthorized () {
        fetch("localhost:8000/auth/")
    }

    function generateSignInErrorMessage(message) {
        const loginFeedback = document.querySelector("#login-feedback")

        // Updates text if element exists, otherwise generates new element and append it to div.content
        if (loginFeedback) {
            loginFeedback.textContent = message
        } else {
            const article = document.createElement("article")
            article.className = "message is-danger"

            const div = document.createElement("div")
            div.className = "message-body"

            const errorMessage = document.createElement("p")
            errorMessage.textContent = message
            errorMessage.id = "login-feedback"

            let divContent = document.querySelector("div.content")
            divContent.appendChild(article)
            article.appendChild(div)
            div.appendChild(errorMessage)
        }
    }

    function attemptSignIn() {
        var url = `http://localhost:8000/auth/sign-in?grant_type=password&username=${usernameInput.value}&password=${passwordInput.value}`
        fetch(url, {
            method: "POST"
        })
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    generateSignInErrorMessage(data.err)
                }

                if (data.jwt) {
                    sessionStorage.setItem("jwt", data.jwt)
                    usernameInput.value = ""
                    passwordInput.value = ""
                }
            })
    }

    function resetMainElement() {
        while (main.firstChild) {
            main.firstChild.remove()
        }
    }

    function generateSignInPage() {
        resetMainElement()

        currentPage = PAGE_SIGNIN

        todosPageButton.className = CLASS_UNCOLORED_BUTTON
        signInPageButton.className = CLASS_COLORED_BUTTON

        // Text Section
        let divContent = document.createElement("div")
        divContent.className = "content"

        main.appendChild(divContent)

        let signInHeader = document.createElement("h2")
        signInHeader.textContent = "Sign in"

        let signInText = document.createElement("p")
        signInText.textContent = "Sign in using form below."

        divContent.appendChild(signInHeader)
        divContent.appendChild(signInText)

        // Input Section
        let usernameInput = document.createElement("input")
        usernameInput.className = "input is-large"
        usernameInput.placeholder = "Email"
        usernameInput.id = "email"
        usernameInput.pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,14}$"

        let passwordInput = document.createElement("input")
        passwordInput.className = "input is-large"
        passwordInput.placeholder = "Password"
        passwordInput.id = "password"
        passwordInput.type ="password"

        main.appendChild(usernameInput)
        main.appendChild(passwordInput)

        let loginButtonContainer = document.createElement("div")
        loginButtonContainer.id = "login-button-container"

        let loginButton = document.createElement("button")
        loginButton.className = "button is-warning"
        loginButton.type = "password"
        loginButton.id = "login-button"
        loginButton.textContent = "Sign In!"

        loginButtonContainer.appendChild(loginButton)

        main.appendChild(loginButtonContainer)

        loginButton.addEventListener('click', (e) => {
            attemptSignIn()
        })
    }

    function generateTodoPage() {
        resetMainElement()

        currentPage = PAGE_TODO

        todosPageButton.className = CLASS_COLORED_BUTTON
        signInPageButton.className = CLASS_UNCOLORED_BUTTON

        // Header + Add Todo Button Section
        const divHome = document.createElement("div")
        divHome.className = "home"

        const homeHeader = document.createElement("p")
        homeHeader.className = "is-size-2 home-title"
        homeHeader.textContent = "Today"

        const homeSubheader = document.createElement("span")
        homeSubheader.className = "is-size-6"
        homeSubheader.textContent = " Mon 31 Jan"

        homeHeader.appendChild(homeSubheader)

        const addTodoButton = document.createElement("button")
        addTodoButton.className = "button is-warning home-add-todo js-modal-trigger"
        addTodoButton.dataset.target = "modal-add-todo"

        const addTodoButtonP = document.createElement("p")
        addTodoButtonP.className = "is-size-4"
        addTodoButtonP.textContent = "+ Todo"

        addTodoButton.appendChild(addTodoButtonP)

        divHome.appendChild(homeHeader)
        divHome.appendChild(addTodoButton)

        main.appendChild(divHome)


        // All Todos
        updateTodosView()

        // MODAL SECTION
        const modal = document.createElement("div")
        modal.className = "modal"
        modal.id = "modal-add-todo"

        const modalBackground = document.createElement("div")
        modalBackground.className = "modal-background"

        const modalCard = document.createElement("div")
        modalCard.className = "modal-card"

        modal.appendChild(modalBackground)
        modal.appendChild(modalCard)

        const modalCardHead = document.createElement("header")
        modalCardHead.className = "modal-card-head"

        modalCard.appendChild(modalCardHead)

        const modalCardTitle = document.createElement("p")
        modalCardTitle.className = "modal-card-title"
        modalCardTitle.textContent = "Add Todo!"

        const deleteButton = document.createElement("button")
        deleteButton.className = "delete"
        deleteButton.ariaLabel = "close"

        modalCardHead.appendChild(modalCardTitle)

        modalCardHead.appendChild(deleteButton)

        const modalCardBody = document.createElement("section")
        modalCardBody.className = "modal-card-body"

        modalCard.appendChild(modalCardBody)


        // Title Field
        const titleField = document.createElement("div")
        titleField.className = "field"
        const titleLabel = document.createElement("label")
        titleLabel.className = "label"
        titleLabel.textContent = "Title"
        const titleControl = document.createElement("div")
        titleControl.className = "control"
        const titleInput = document.createElement("input")
        titleInput.className = "input"
        titleInput.placeholder = "Title"
        titleInput.maxLength = "50"

        titleField.appendChild(titleLabel)
        titleField.appendChild(titleControl)
        titleControl.appendChild(titleInput)

        // Description Field
        const descriptionField = document.createElement("div")
        descriptionField.className = "field"
        const descriptionLabel = document.createElement("label")
        descriptionLabel.className = "label"
        descriptionLabel.textContent = "Description"
        const descriptionControl = document.createElement("div")
        descriptionControl.className = "control"
        const descriptionInput = document.createElement("input")
        descriptionInput.className = "input"
        descriptionInput.placeholder = "Description"
        descriptionInput.maxLength = "100"

        descriptionField.appendChild(descriptionLabel)
        descriptionField.appendChild(descriptionControl)
        descriptionControl.appendChild(descriptionInput)

        const modalAddTodoButton = document.createElement("button")
        modalAddTodoButton.className = "button is-warning width-100"
        modalAddTodoButton.id = "modal-add-todo-button"
        modalAddTodoButton.textContent = "Add Todo"

        modalCardBody.appendChild(titleField)
        modalCardBody.appendChild(descriptionField)
        modalCardBody.appendChild(modalAddTodoButton)


        main.appendChild(modal);


        // Add a click event on buttons to open a specific modal
        (document.querySelectorAll('.js-modal-trigger') || []).forEach((trigger) => {
            const modal = trigger.dataset.target;
            const target = document.getElementById(modal);

            trigger.addEventListener('click', () => {
                openModal(target);
            });
        });

        // Add a click event on various child elements to close the parent modal
        (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach((close) => {
            const target = close.closest('.modal');

            close.addEventListener('click', () => {
                closeModal(target);
            });
        });

        // Add a keyboard event to close all modals
        document.addEventListener('keydown', (event) => {
            const e = event || window.event;

            if (e.keyCode === ESCAPE_KEY_CODE) { // Escape key
                closeAllModals();
            }
        });
    }

    function updateTodosView() {
        const divContainer = document.querySelector("div.box")

        if (divContainer) {
            main.removeChild(divContianer)
        }

        for (let i = 0; i < todos.length; i++) {
            const container = document.createElement("div")
            container.className = "box"

            const todoItem = document.createElement("div")
            todoItem.className = "todo-item"

            const todoItemTitle = document.createElement("p")
            todoItemTitle.className = "is-size-4 todo-title"
            todoItemTitle.textContent = todos[i].title

            const todoItemDescription = document.createElement("p")
            todoItemDescription.className = "is-size-7 todo-description"
            todoItemDescription.textContent = todos[i].description

            const doneButton = document.createElement("button")
            doneButton.className = "button is-success is-light todo-done"
            doneButton.textContent = "Done"

            todoItem.appendChild(todoItemTitle)
            todoItem.appendChild(todoItemDescription)
            todoItem.appendChild(doneButton)

            container.appendChild(todoItem)

            main.appendChild(container)
        }
    }

    // MODAL boilerplate code from BULMA.
    function openModal(el) {
        el.classList.add('is-active');
    }

    function closeModal(el) {
        el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach((modal) => {
            closeModal(modal);
        });
    }


})

