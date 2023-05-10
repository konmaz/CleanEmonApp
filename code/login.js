import {API} from './config.js';

let bearer_token_saved = localStorage.getItem('bearer_token') === null;
function insertModalHTML(){
    let body = document.getElementsByTagName("BODY")[0];
    body.insertAdjacentHTML('beforeend',
        `<!-- Modal -->
<div class="modal fade mt-5" id="modalLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog ">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel"><i class="material-icons align-middle">lock</i> Login</h1>
            </div>
            <div class="modal-body">

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="input_username" placeholder="Username" autocapitalize="off">
                    <label for="input_username">Username</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="input_password" placeholder="Password">
                    <label for="input_password">Password</label>
                </div>

                <div class="alert alert-danger mt-4 mb-0 d-none"  role="alert" id="modalErrorMessage">
                    <i class="material-icons align-middle">error</i>
                    <span id="modalErrorMessageText"></span>
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="modalUpdateButton">Login</button>
            </div>
        </div>
    </div>
</div>
`)
}

function login(username, password) {
    const xhr = new XMLHttpRequest();
    const url = `${API}/token`;
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('accept', 'application/json');
    xhr.onload = function () {
        let data;
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            // console.log(data.access_token);
            localStorage.setItem('bearer_token', data.access_token);
            localStorage.setItem('username', username);
            location.reload();
        } else if (xhr.status === 401) {
            data = JSON.parse(xhr.responseText);
            showErrorMessageInLogin(data.detail);
        } else {
            console.log('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.onerror = function () {
        console.log('Request failed');
    };
    xhr.send(params);
}
function showErrorMessageInLogin(message){
    let doc = document.getElementById("modalErrorMessage");
    if (doc) { //If doc not null
        doc.classList.remove("d-none")

        let doc2 = document.getElementById("modalErrorMessageText");
        if (doc2) { //If doc not null
            doc2.innerText =message;
        }
    }
}

function addModalLoginListeners(){
    document.getElementById('modalUpdateButton').addEventListener('click', function() { // when the login button is clicked
        let username = document.getElementById('input_username').value;
        let password = document.getElementById('input_password').value;

        if (username === "" || password === "")
            showErrorMessageInLogin("Please provide both a username and password to continue.")
        else{
            login(username, password);
        }
    })

    document.getElementById("input_password") // when the modal input field value is on focus and the user presses enter trigger the update button
        .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.key === "Enter" || event.keyIdentifier === "Enter") {
                document.getElementById("modalUpdateButton").click();
            }
        });
}

export function showLoginModal(){
    insertModalHTML();
    const myModal = new bootstrap.Modal(document.getElementById('modalLogin'));
    myModal.show();
    addModalLoginListeners();
}
/**
 * Check if they are credentials saved in localStorage
 */
export function isLoggedIn(){
    return !bearer_token_saved;

}
