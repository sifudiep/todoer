const ESCAPE_KEY_CODE = 27 
const HOME_URL = "http://localhost:8000/"

document.addEventListener('DOMContentLoaded', () => {
    // Redirects user back to HOME_URL, band aid fix for POST form default redirecting behaviour.
    if (location != HOME_URL) {
        location.assign(HOME_URL)
    }

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

    // const modalAddTodo = document.getElementById("modal-add-todo")
    // modalAddTodo.addEventListener("click", (event) => {
    //     let xhttp = new XMLHttpRequest()
    //     let url = "add-todo"
    //     let params = "title=ThisIsMyTitle&description=DescriptionISMINE!!"
    //     xhttp.open('POST', url, true);
    //     xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //     xhttp.onreadystatechange = function() {//Call a function when the state changes.
    //         if(xhttp.readyState == 4 && xhttp.status == 200) {
    //             alert(xhttp.responseText);
    //         }
    //     }
    //     xhttp.send(params);
    //     console.log(`sent post method`);
    // })

})