import configJSON from './config.json' assert {type: 'json'};
const API = configJSON.api;

function get_devices_from_API() {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // Set the request URL and method
    xhr.open('GET', `${API}/devices`);
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
get_devices_from_API();
