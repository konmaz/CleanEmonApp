import {API} from './config.js';

const DEVICE = localStorage.getItem('emon_id');

function image_update(date) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}/dev_id/${DEVICE}/plot/date/${date}`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('bearer_token')}`);
    xhr.responseType = 'blob';

    xhr.onloadstart = function () {
        const loadingText = document.getElementById('image-placeholder');
        loadingText.innerHTML = `<div class="spinner-border text-primary mt-5" role="status" style="width:5rem; height: 5rem" >
  <span class="visually-hidden">Loading...</span>
</div>`;
    };

    xhr.onload = function () {
        if (this.status === 200) {
            const myImage = new Image();
            myImage.src = window.URL.createObjectURL(this.response);
            myImage.className = "img-fluid mt-3";
            myImage.style['width'] = '100%';
            document.getElementById('image-placeholder').innerHTML = "";
            document.getElementById('image-placeholder').appendChild(myImage);
        }
    };

    xhr.send();


    //document.getElementById("img_element").src = `${API}/dev_id/${DEVICE}/plot/date/${date}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {day: 'numeric', month: 'short'};
    return date.toLocaleDateString('en-UK', options);
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

async function fetch_30_days_daily_consumptions() {
    const baseUrl = `${API}/dev_id/${DEVICE}/json/date/DATE?/consumption?from_cache=false&simplify=true`;

    const today = new Date();
    const dateStrings = [];

    for (let i = 0; i < 40; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().substr(0, 10);
        dateStrings.push(dateString);
    }
    dateStrings.reverse();

    const requests = dateStrings.map(dateString => {
        const url = baseUrl.replace('DATE?', dateString);
        return fetch(url,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('bearer_token')}`
                }}
            );
    });

    const responses = await Promise.all(requests);

    const dates = [];
    const values = [];

    for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        const data = await response.text();
        const value = parseFloat(data);
        dates.push(dateStrings[i]);
        values.push(value);
    }

    return {dates, values};
}

function plot_30_days_daily_consumptions(dates, values) {
    var ctx = document.getElementById('myChart').getContext('2d');
    // Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--bs-emphasis-color');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                data: values,
                cubicInterpolationMode: 'monotone',
                label : 'kWh'
            }]
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            scales: {
                x: {
                    ticks: {
                        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                        callback: function(val, index) {
                            // Hide every 2nd tick label
                            return index % 2 === 0 ? this.getLabelForValue(val) : '';
                        }
                    }
                }
            },

            plugins: {
                legend: {
                    onClick: null
                },
                title: {
                    display: true,
                    text: '30-day daily consumption history'

                }
            }
        }

    });
}

async function fetch_and_plot_30_days_daily_consumptions() {
    const {dates, values} = await fetch_30_days_daily_consumptions();
    const formattedDates = dates.map(date => formatDate(date));
    plot_30_days_daily_consumptions(formattedDates, values);
}

fetch_and_plot_30_days_daily_consumptions();