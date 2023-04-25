
import configJSON from './config.json' assert {type: 'json'};

const API = configJSON.api;
const DEVICE = localStorage.getItem('emon_id');
function get_material_icon_by_content(x) {
    x = x.toLowerCase();
    switch (true) {
        case x.includes("power"):
            return `<i class=\"material-icons align-middle\">bolt</i>`;
        case x.includes("temp"):
            return `<i class=\"material-icons align-middle\">thermostat</i>`;
        case x.includes("vrm"):
            return `<i class=\"material-icons align-middle\">power_input</i>`;
        case x.includes("kwh"):
            return `<i class=\"material-icons align-middle\">electric_meter</i>`;
        default:
            return "";
    }
}
function add_element_to_realtime_div(x, y) {
    let doc = document.getElementById("realtime_data_divs");
    if (doc) { //If doc not null
        x = get_material_icon_by_content(x) + " " + x;
        y = y + " " + SI_units(x);
        doc.insertAdjacentHTML('beforeend', `<div class="row justify-content-center">
            <div class="col-6">
                <p class="fs-3">${x}</p>
            </div>
            <div class="col-4">
                <p class="fs-3 green text-nowrap">${y}</p>
            </div>
        </div>
  `);
    }
}
function epochToRelativeTime(epoch) {
    const secondsAgo = Math.floor((new Date().getTime() / 1000) - epoch);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    if (secondsAgo < 60) {
        return `${secondsAgo} sec ago`;
    }
    else if (minutesAgo < 60) {
        return `${minutesAgo} min ago`;
    }
    else if (hoursAgo < 24) {
        return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
    }
    else {
        return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
    }
}
function SI_units(name) {
    /*
    Returns the SI_unit Watts, Celsius Volts etc according to the name provided.
     */
    name = name.toLowerCase();
    switch (true) {
        case name.includes("power"):
            return `W`;
        case name.includes("temp"):
            return `°C`;
        case name.includes("vrm"):
            return `V`;
        case name.includes("kwh"):
            return `kWh`;
        default:
            return "";
    }
}
function realtime_data_update_from_API() {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // Set the request URL and method
    xhr.open('GET', `${API}/dev_id/${DEVICE}/json/last_value`);
    // Set the onload function to update the DOM element with the response
    xhr.onload = function () {
        let x;
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById("realtime_data_divs").innerHTML = "";
            x = response.energy_data;
            for (const item in x) {
                if (item === "timestamp") {
                    // @ts-ignore
                    const epochTimestamp = Number(x[item]);
                    document.getElementById("relative_time").innerHTML = epochToRelativeTime(epochTimestamp);
                    continue;
                }
                // @ts-ignore
                add_element_to_realtime_div(item, Number(x[item]).toFixed(2));
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
function realtime_data_put_placeholders(number_of_placeholders) {
    for (let i = 0; i < number_of_placeholders; i++) {
        add_element_to_realtime_div(`<span class="placeholder col-10">`, `<span class="placeholder col-8">`);
    }
}
function realtime_data_refresh() {
    document.getElementById("realtime_data_divs").innerHTML = "";
    realtime_data_put_placeholders(4);
    realtime_data_update_from_API();
}
function consumptions_update(api_call, DOM_id) {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // Set the request URL and method
    xhr.open('GET', `${API}/dev_id/${DEVICE}/${api_call}`);
    // Set the onload function to update the DOM element with the response
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById(DOM_id).innerHTML = Number(response).toFixed(2) + " kWh";
        }
        //document.getElementById("realtime_data_divs")!.innerHTML = response.title;
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    // Send the request
    xhr.send();
}
realtime_data_put_placeholders(4)
if (localStorage.getItem('emon_id')) {
    realtime_data_refresh();
    consumptions_update("json/yesterday/consumption?from_cache=false&simplify=true", "cons_yesterday");
    consumptions_update("json/last_month/consumption?from_cache=false&simplify=true", "cons_last_month");
    consumptions_update("json/30days/average_consumption?from_cache=false&simplify=true", "cons_30_day_avg");
}
let refresh_button;
refresh_button = document.getElementById("realtime_refresh_btn");
if (refresh_button)
    refresh_button.addEventListener("click", realtime_data_refresh, false);
let doc = document.getElementById("cons_date_picker");
if (doc)
    doc.addEventListener('change', (event) => {
        if (event.target) {
            let selectedText = event.target;
            if (selectedText.value) {
                consumptions_update(`json/date/${selectedText.value}/consumption?from_cache=false&simplify=true`, "cons_user_defined_date");
            }
            else {
                document.getElementById('cons_user_defined_date').innerHTML = "<span class=\"placeholder col-8\"></span>";
            }
        }
    });
