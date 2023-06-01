import {API} from './config.js';

const DEVICE = localStorage.getItem('emon_id');

function getMaterialIconByContent(content) {
    content = content.toLowerCase();
    switch (true) {
        case content.includes("power"):
            return `<i class=\"material-icons align-middle\">bolt</i>`;
        case content.includes("temp"):
            return `<i class=\"material-icons align-middle\">thermostat</i>`;
        case content.includes("vrm"):
            return `<i class=\"material-icons align-middle\">power_input</i>`;
        case content.includes("kwh"):
            return `<i class=\"material-icons align-middle\">electric_meter</i>`;
        default:
            return "";
    }
}

function addElementToRealTimeDiv(element, value) {
    let doc = document.getElementById("realtime_data_divs");
    if (doc) { //If doc not null
        element = getMaterialIconByContent(element) + " " + element;
        value = value + " " + SI_units(element);
        doc.insertAdjacentHTML('beforeend', `<div class="row justify-content-center">
            <div class="col-5">
                <p class="fs-3">${element}</p>
            </div>
            <div class="col-5">
                <p class="fs-3 green text-nowrap bg-body-tertiary rounded">${value}</p>
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
    } else if (minutesAgo < 60) {
        return `${minutesAgo} min ago`;
    } else if (hoursAgo < 24) {
        return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
    } else {
        return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
    }
}

// Returns the SI_unit Watts, Celsius Volts etc according to the name provided.
function SI_units(name) {
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
    const url = `${API}/dev_id/${DEVICE}/json/last_value`;
    const options = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('bearer_token')}`
        }
    };

    fetch(url, options)
        .then(checkStatus)
        .then(parseJson)
        .then(function (response) {
            let x;
            const responseJson = response;
            document.getElementById("realtime_data_divs").innerHTML = "";
            x = responseJson.energy_data;
            for (const item in x) {
                if (item === "timestamp") {
                    const epochTimestamp = Number(x[item]);
                    document.getElementById("relative_time").innerHTML = epochToRelativeTime(epochTimestamp);
                    continue;
                }
                addElementToRealTimeDiv(item, Number(x[item]).toFixed(2));
            }
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else if(response.status === 401){
        console.log('Credentials expired!')
        localStorage.clear();
        location.reload();
    }
    else {
        return Promise.reject(new Error(response.statusText));
    }
}

function parseJson(response) {
    return response.json();
}

function realtime_data_put_placeholders(number_of_placeholders) {
    for (let i = 0; i < number_of_placeholders; i++) {
        addElementToRealTimeDiv(`<span class="placeholder col-10">`, `<span class="placeholder w-100">`);
    }
}

function realtime_data_refresh() {
    document.getElementById("realtime_data_divs").innerHTML = "";
    realtime_data_put_placeholders(4);
    realtime_data_update_from_API();
}

function consumptions_update(api_call, DOM_id) {
    if (!navigator.onLine) {
        document.getElementById(DOM_id).innerHTML = "Offline";
        return;
    }
    document.getElementById(DOM_id).innerHTML = `<span class="spinner-border text-primary"></span>`
    fetch(`${API}/dev_id/${DEVICE}/${api_call}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('bearer_token')}`
        }
    })
        .then(checkStatus)
        .then(parseJson)
        .then(function (response) {
            document.getElementById(DOM_id).innerHTML = Number(response).toFixed(2) + " kWh";
        })
        .catch(function (error) {
            console.log('Request failed', error);
            document.getElementById(DOM_id).innerHTML = `<p class="text-danger">-</p>`;
        });
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
                consumptions_update(`json/date/${selectedText.value}/consumption?simplify=true`, "cons_user_defined_date");
            } else {
                document.getElementById('cons_user_defined_date').innerHTML = "<span class=\"placeholder w-100\"></span>";
            }
        }
    });

realtime_data_put_placeholders(4)
if (localStorage.getItem('emon_id')) {
    realtime_data_refresh();
    consumptions_update("json/yesterday/consumption?simplify=true", "cons_yesterday");
    consumptions_update("json/last_month/consumption?simplify=true", "cons_last_month");
    consumptions_update("json/30days/average_consumption?simplify=true", "cons_30_day_avg");
    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    const datepicker = document.getElementById('cons_date_picker');
    datepicker.value = currentDate;
    datepicker.dispatchEvent(new Event('change'));


}
