

const API = "http://192.168.12.42:8000";

function get_devices_from_API(): void {
    // Create a new XMLHttpRequest object
    const xhr: XMLHttpRequest = new XMLHttpRequest();

    // Set the request URL and method

    xhr.open('GET', `${API}/devices`);

    // Set the onload function to update the DOM element with the response
    xhr.onload = function(): void {

        let x;
        if (xhr.status === 200) {
            const response: Array<string> = JSON.parse(xhr.responseText);
            document.getElementById("devices_list")!.innerHTML = "";
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

function add_device_element(device_name: string, is_checked:boolean){
    let doc = document.getElementById("devices_list");
    let checked_str = ""
    if (is_checked){
        checked_str = "checked"
    }

    if (doc){ //If doc not null

        doc.insertAdjacentHTML('beforeend',
            `<li class="list-group-item">
                 <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="${device_name}" id="${device_name}" ${checked_str}>
                 <label class="form-check-label stretched-link" for="${device_name}">${device_name}</label>
                </li>
  `)
    }
}
let doc = document.getElementById("devices_list");
if (doc) {
    doc.addEventListener('change', (event) => {
        let selectedText: any;
        if (event.target)
            selectedText = event.target as HTMLInputElement;
        localStorage.setItem('emon_id', selectedText.id);
    });
}
get_devices_from_API()

export {};