import {API} from './config.js';

const DEVICE = localStorage.getItem('emon_id');
let schema;

const selectElement = document.getElementById("modalInputFieldSelect");
const inputElement = document.getElementById("modalInputFieldValue");


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
        selectElement.innerHTML = "";
        let enumValues = getEnumValues(field_name);
        if (enumValues !== undefined){
            for (let i = 0; i < enumValues.length; i++) {
                const option = document.createElement("option");
                option.textContent = enumValues[i];
                selectElement.appendChild(option);

                if (enumValues[i] === field_value) {
                    option.selected = true;
                }

            }
            inputElement.style.display = "none";
            selectElement.style.display = "block";

        }else{
            inputElement.value=field_value;
            inputElement.style.display = "block";
            selectElement.style.display = "none";
        }


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
                if (inputElement.style.display !== "none")
                    inputElement.focus();

                if (selectElement.style.display !== "none")
                    selectElement.focus();
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
    fetch_META_schema();
    metadata_update_from_API();


    document.getElementById('modalUpdateButton').addEventListener('click', function() { // when the update button is clicked on the model pop up
        let value = inputElement.value;
        if (inputElement.style.display === "none")
            value = selectElement.value;
        update_metadata_field(document.getElementById('modalInputFieldName').value, value)
    })

    inputElement // when the modal input field value is on focus and the user presses enter trigger the update button
        .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.key === "Enter" || event.keyIdentifier === "Enter") {
                document.getElementById("modalUpdateButton").click();
            }
        });

}

function fetch_META_schema(){

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${API}/meta/schema`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.responseType = 'json';

    xhr.onload = function() {

        if (xhr.status === 200) {

            schema = xhr.response;
        } else {
            console.error('Failed to fetch schema: ' + xhr.statusText);
        }
    };

// Handle the onerror event, which fires if there is a network error
    xhr.onerror = function() {

        console.error('Failed to fetch schema: network error');
    };

// Send the HTTP request
    xhr.send();
}

function getEnumValues(propertyName) {
    const property = schema.properties[propertyName];
    if (property && property.enum) {
        return property.enum;
    } else if (property && property.$ref) {
        const refPropertyName = property.$ref.split('/').pop();
        const refProperty = schema.definitions.sharedProperties[refPropertyName];
        if (refProperty && refProperty.enum) {
            return refProperty.enum;
        }
    }else if (property && property.type === "boolean"){
        return [true, false]
    }
    return undefined;
}