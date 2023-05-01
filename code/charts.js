import configJSON from './config.json' assert {type: 'json'};

const API = configJSON.api;
const DEVICE = localStorage.getItem('emon_id');
function image_update(date) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}/dev_id/${DEVICE}/plot/date/${date}`, true);
    xhr.responseType = 'blob';

    xhr.onloadstart = function() {
        const loadingText = document.getElementById('image-placeholder');
        loadingText.innerHTML = `<div class="spinner-border text-primary mt-5" role="status" style="width:5rem; height: 5rem" >
  <span class="visually-hidden">Loading...</span>
</div>`;
    };

    xhr.onload = function() {
        if (this.status === 200) {
            const myImage = new Image();
            myImage.src = window.URL.createObjectURL(this.response);
            myImage.className="img-fluid mt-3";
            myImage.style['width']= '100%';
            document.getElementById('image-placeholder').innerHTML = "";
            document.getElementById('image-placeholder').appendChild(myImage);
        }
    };

    xhr.send();


    //document.getElementById("img_element").src = `${API}/dev_id/${DEVICE}/plot/date/${date}`;
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