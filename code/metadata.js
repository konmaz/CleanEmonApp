
import configJSON from './config.json' assert {type: 'json'};

const API = configJSON.api;
const DEVICE = localStorage.getItem('emon_id');

function add_element_to_realtime_div(x, y) {
    let doc = document.getElementById("metadata_divs");
    x = x.replaceAll("_","<wbr>_")
    if (doc) { //If doc not null
        doc.insertAdjacentHTML('beforeend', `<div class="row justify-content-center">
            <div class="col-6">
                <p class="fs-3">${x}</p>
            </div>
            <div class="col-4">
                <p class="fs-3 green">${y}</p>
            </div>
        </div>
  `);
    }
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

            }

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
}
