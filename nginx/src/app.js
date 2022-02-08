window.addEventListener('DOMContentLoaded', (e) => {
    const main = document.querySelector("main")
    generateSignInPage()

    const usernameInput = document.querySelector("input#email")
    const passwordInput = document.querySelector("input#password")

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

    function generateSignInPage() {
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

        main.appendChild(usernameInput)
        main.appendChild(passwordInput)

        let loginButtonContainer = document.createElement("div")
        loginButtonContainer.id = "login-button-container"

        let loginButton = document.createElement("button")
        loginButton.className = "button is-warning"
        loginButton.id = "login-button"
        loginButton.textContent = "Sign In!"

        loginButtonContainer.appendChild(loginButton)

        main.appendChild(loginButtonContainer)

        loginButton.addEventListener('click', (e) => {
            attemptSignIn()
        })
    }



})

