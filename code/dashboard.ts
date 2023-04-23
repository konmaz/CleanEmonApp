interface EnergyData {
    power: number;
    kwh: number;
    vrms: number;
    temp: number;
    timestamp: number;
}

interface APIResponse {
    date: string;
    energy_data: EnergyData[];
}
const API = "http://192.168.12.42:8000";
const DEVICE = "emon_4c5bc44b";
function get_material_icon_by_content(x:string):string {
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

function add_element_to_realtime_div(x: string, y: string) {
    let doc = document.getElementById("realtime_data_divs");
    if (doc){ //If doc not null
        x = get_material_icon_by_content(x)+ " "+ x;
        y = y + " " + SI_units(x);
        doc.insertAdjacentHTML('beforeend',
        `<div class="row justify-content-center">
            <div class="col-4">
                <p class="fs-3">${x}</p>
            </div>
            <div class="col-4">
                <p class="fs-3 green text-nowrap">${y}</p>
            </div>
        </div>
  `)
    }
}
function epochToRelativeTime(epoch: number): string {
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

function SI_units(name:string): string {
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

function realtime_data_update_from_API(): void {
    // Create a new XMLHttpRequest object
    const xhr: XMLHttpRequest = new XMLHttpRequest();

    // Set the request URL and method

    xhr.open('GET', `${API}/dev_id/${DEVICE}/json/last_value`);

    // Set the onload function to update the DOM element with the response
    xhr.onload = function(): void {

        let x;
        if (xhr.status === 200) {
            const response: APIResponse = JSON.parse(xhr.responseText);
            document.getElementById("realtime_data_divs")!.innerHTML = "";
            x = response.energy_data;
            for (const item in x) {
                if (item=== "timestamp"){
                    // @ts-ignore
                    const epochTimestamp = Number(x[item as keyof EnergyData]);
                    document.getElementById("relative_time")!.innerHTML = epochToRelativeTime(epochTimestamp);
                    continue;
                }
                // @ts-ignore
                add_element_to_realtime_div(item, Number(x[item as keyof EnergyData]).toFixed(2));
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

function realtime_data_put_placeholders(number_of_placeholders: number) {

    for (let i = 0; i < number_of_placeholders; i++) {
        add_element_to_realtime_div(`<span class="placeholder col-10">`, `<span class="placeholder col-8">`);
    }
}

function realtime_data_refresh() {
    document.getElementById("realtime_data_divs")!.innerHTML = "";
    realtime_data_put_placeholders(4);
    realtime_data_update_from_API();

}

realtime_data_put_placeholders(4);
realtime_data_update_from_API();
