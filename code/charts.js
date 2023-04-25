import configJSON from './config.json' assert {type: 'json'};

const API = configJSON.api;
const DEVICE = localStorage.getItem('emon_id');
function image_update(date) {
    document.getElementById("img_element").src = `${API}/dev_id/${DEVICE}/plot/date/${date}`;
}

let doc = document.getElementById("date_picker");
if (doc)
    doc.addEventListener('change', (event) => {
        if (event.target) {
            let selectedText = event.target;
            if (selectedText.value) {
                image_update(selectedText.value);
            }

        }
    });