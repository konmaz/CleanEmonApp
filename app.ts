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

function add(x: string, y: string) {
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
// add("power", "215 w");
// add("temp", "25 °C");
// add("vrms", "243 V");
// add("kwh", "800 kWh");
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

function SI_units(x:string) {
    x = x.toLowerCase();
    switch (true) {
        case x.includes("power"):
            return `W`;
        case x.includes("temp"):
            return `°C`;
        case x.includes("vrm"):
            return `V`;
        case x.includes("kwh"):
            return `kWh`;
        default:
            return "";
    }

}

function sendRequest(): void {
    // Create a new XMLHttpRequest object
    const xhr: XMLHttpRequest = new XMLHttpRequest();

    // Set the request URL and method
    xhr.open('GET', 'http://192.168.1.11:8000/dev_id/emon_4c5bc44b/json/last_value?cache=true');

    // Set the onload function to update the DOM element with the response
    xhr.onload = function(): void {

        let x;
        if (xhr.status === 200) {
            const response: APIResponse = JSON.parse(xhr.responseText);
            document.getElementById("realtime_data_divs")!.innerHTML = "";
            x = response.energy_data[0];
            for (const item in x) {
                if (item=== "timestamp"){
                    const epochTimestamp = Number(x[item as keyof EnergyData]);
                    document.getElementById("relative_time")!.innerHTML = epochToRelativeTime(epochTimestamp);
                    continue;
                }
                add(item, Number(x[item as keyof EnergyData]).toFixed(2));
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

function metadata_put_loading(x: number) {

    for (let i = 0; i < x; i++) {
        add(`<span class="placeholder col-10">`, `<span class="placeholder col-8">`);
    }
}
metadata_put_loading(4);
sendRequest();