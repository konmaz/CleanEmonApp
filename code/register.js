import {API} from './config.js';

const form = document.getElementById('login-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // prevent default form submission behavior

    const username = form.elements.username.value;
    const password = form.elements.password.value;

    // create a new FormData object to retrieve form data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // send the AJAX request to the server
    const response = await fetch(`${API}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
    });

    // handle the server response using a callback function
    const responseData = await response.json();
    if (response.ok) {
        showHappyMessage(responseData.message)
        // display success message
        // alert('Registration successful!');
    } else {
        // display error message
        showErrorMessage(responseData.detail)
        // alert(`Error: ${responseData.detail}`);
    }
});

function showErrorMessage(message){
    document.getElementById('messagePlaceholder').innerHTML = `
<div class="alert alert-danger mt-4 mb-0"  role="alert" id="modalErrorMessage">
<i class="material-icons align-middle">warning</i>
${message}</div>`
}

function showHappyMessage(message){
    document.getElementById('messagePlaceholder').innerHTML = `
<div class="alert alert-success mt-4 mb-0"  role="alert" id="modalErrorMessage">
<i class="material-icons align-middle">done</i>
${message}</div>`
}