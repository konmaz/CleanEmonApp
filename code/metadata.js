import {API} from './config.js';

const DEVICE = localStorage.getItem('emon_id');

function add_element_to_realtime_div(x, y) {
    let doc = document.getElementById("metadata_divs");
    if (doc) { //If doc not null
        doc.insertAdjacentHTML('beforeend', `<div class="row justify-content-center">
            <div class="col">
            
            
                <p class="fs-5 font-monospace"><button type="button" class="btn btn-outline-info btn-sm" id="${x}">
              <i class="material-icons align-text-bottom spin">edit</i>
            </button> ${x.replaceAll("_","<wbr>_")}</p>
            </div>
            <div class="col-5">
                <p class="fs-5 green font-monospace">${y}</p>
            </div>
        </div>
  `);
    }
}
function add_modal_listener_button(button_element, field_name, field_value){
    button_element.addEventListener('click', function() {
        const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));

        document.getElementById('modalInputFieldName').value=field_name;
        document.getElementById('modalInputFieldValue').value=field_value;
        clearErrorMessage();
        myModal.show();
    })
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
function hide_modal(){
    document.getElementById('modalCloseX').click();
}

function update_metadata_field(field, value){
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // Set the request URL and method
    xhr.open('GET', `${API}/dev_id/${DEVICE}/set-meta/${field}/${value}`);
    // Set the onload function to update the DOM element with the response
    xhr.onload = function () {
        let x;
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            x = response;
            console.log(x);
            hide_modal();
            metadata_update_from_API();
        }
        else if (xhr.status === 400) {
            const response = JSON.parse(xhr.responseText);
            x = response;
            console.log(x);
            showErrorMessage(x.message);

        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    // Send the request
    xhr.send();

}
function metadata_update_from_API() {
    if (localStorage.getItem('emon_id') === null)
        return;
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // Set the request URL and method
    xhr.open('GET', `${API}/dev_id/${DEVICE}/meta`);
    // Set the onload function to update the DOM element with the response
    xhr.onload = function () {
        let x;
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById("metadata_divs").innerHTML = "";
            x = response;
            for (const item in x) {
                add_element_to_realtime_div(item, x[item]);
                add_modal_listener_button(document.getElementById(item), item, x[item]);
            }

            document.getElementById('staticBackdrop').addEventListener('shown.bs.modal', function () {
                document.getElementById('modalInputFieldValue').focus();
            });
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    // Send the request
    xhr.send();
}

// main
if (localStorage.getItem('emon_id')) {
    metadata_update_from_API();

    document.getElementById('modalUpdateButton').addEventListener('click', function() {
        console.log(document.getElementById('modalInputFieldName').value)
        update_metadata_field(document.getElementById('modalInputFieldName').value, document.getElementById('modalInputFieldValue').value)
    })

    document.getElementById("modalInputFieldValue") // when the modal input field value is on focus and the user presses enter trigger the update button
        .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.key === "Enter" || event.keyIdentifier === "Enter") {
                document.getElementById("modalUpdateButton").click();
            }
        });

}
