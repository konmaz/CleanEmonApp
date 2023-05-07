import {API} from './config.js';

function get_devices_from_API() {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // Set the request URL and method
    xhr.open('GET', `${API}/devices`);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('bearer_token')}`);
    // Set the onload function to update the DOM element with the response
    xhr.onload = function () {
        let x;
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById("devices_list").innerHTML = "";
            x = response;
            for (const item of x) {
                add_device_element(item, localStorage.getItem('emon_id') === item);
            }
        }
        //document.getElementById("realtime_data_divs")!.innerHTML = response.title;
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    // Send the request
    xhr.send();
}
function add_device_element(device_name, is_checked) {
    let doc = document.getElementById("devices_list");
    let checked_str = "";
    if (is_checked) {
        checked_str = "checked";
    }
    if (doc) { //If doc not null
        doc.insertAdjacentHTML('beforeend', `<li class="list-group-item">
                 <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="${device_name}" id="${device_name}" ${checked_str}>
                 <label class="form-check-label stretched-link" for="${device_name}">${device_name}</label>
                </li>
  `);
    }
}
let doc = document.getElementById("devices_list");
if (doc) {
    doc.addEventListener('change', (event) => {
        let selectedText;
        if (event.target)
            selectedText = event.target;
        localStorage.setItem('emon_id', selectedText.id);
    });
}

let bearer_token_saved = localStorage.getItem('bearer_token') === null;
window.addEventListener('load', function () {

    if (bearer_token_saved) {
        const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        myModal.show();
    }else {
        document.getElementById("account_login_info").style.visibility = 'visible';
        document.getElementById("username").textContent = localStorage.getItem('username') ;
        get_devices_from_API();
    }

    document.getElementById('modalUpdateButton').addEventListener('click', function() { // when the update button is clicked on the model pop up
        let username = document.getElementById('input_username').value;
        let password = document.getElementById('input_password').value;

        if (username === "" || password === "")
            showErrorMessage("Please provide both a username and password to continue.")
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




});

document.getElementById('staticBackdrop').addEventListener('shown.bs.modal', function () {
    document.getElementById("input_username").focus();
});






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
            console.log(data.access_token);
            localStorage.setItem('bearer_token', data.access_token);
            localStorage.setItem('username', username);
            location.reload();
        } else if (xhr.status === 401) {
            data = JSON.parse(xhr.responseText);
            showErrorMessage(data.detail);
        } else {
            console.log('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.onerror = function () {
        console.log('Request failed');
    };
    xhr.send(params);
}

function clearErrorMessage(){
    let doc = document.getElementById("modalErrorMessage");
    if (doc) { //If doc not null
        doc.classList.add("d-none")
    }
}
function showErrorMessage(message){
    let doc = document.getElementById("modalErrorMessage");
    if (doc) { //If doc not null
        doc.classList.remove("d-none")

        let doc2 = document.getElementById("modalErrorMessageText");
        if (doc2) { //If doc not null
            doc2.innerText =message;
        }
    }
}
document.getElementById("logout_button").addEventListener("click", clear_local_storage, false);
function clear_local_storage(){
    localStorage.clear();
    location.reload();
}