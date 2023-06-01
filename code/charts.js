import {API} from './config.js';

const DEVICE = localStorage.getItem('emon_id');

const SPINER = `<div class="spinner-border text-primary mt-5" role="status" style="width:5rem; height: 5rem" >
  <span class="visually-hidden">Loading...</span>
</div>`


function single_day_consumption(date) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}/dev_id/${DEVICE}/json/date/${date}?downsampling=true`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('bearer_token')}`);

    xhr.onloadstart = function () {
        const loadingText = document.getElementById('image-placeholder');
        loadingText.innerHTML = SPINER;
    };

    xhr.onload = function () {
        if (this.status === 200) {
            // console.log(JSON.parse(xhr.responseText).energy_data);
            let data;
            data = JSON.parse(xhr.responseText).energy_data
            if (data.length !== 0) {

                console.log(data)
                plot_sensor_data(data);
                document.getElementById('image-placeholder').innerHTML = "";

            } else {
                if (dayChartObj !== null) {
                    dayChartObj.destroy();
                }
                document.getElementById('image-placeholder').innerHTML = "No data for this date";
            }
        }
    };
    xhr.send();
}
let doc = document.getElementById("date_picker");
if (doc)
    doc.addEventListener('change', (event) => {
        if (event.target) {
            let selectedText = event.target;
            if (selectedText.value) {
                single_day_consumption(selectedText.value);
            }

        }
    });


function fetch_consumptions(number_of_days) {

    const today = new Date();
    const isoDateToday = today.toISOString().split('T')[0];

// Get the ISO date of X days before
    const XDaysAgo = new Date(today.setDate(today.getDate() - (number_of_days - 1)));
    let from = XDaysAgo.toISOString().split('T')[0];
    let until = isoDateToday;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}/dev_id/${DEVICE}/days_consumptions/range/${from}/${until}?summarize=false`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('bearer_token')}`);

    xhr.onloadstart = function () {
        const loadingText = document.getElementById('image-placeholder_consumption_history');
        loadingText.innerHTML = SPINER;
    };

    xhr.onload = function () {
        if (this.status === 200) {
            // console.log(JSON.parse(xhr.responseText).energy_data);
            let data;
            data = JSON.parse(xhr.responseText)
            if (data.length !== 0) {

                const keys = [];
                const values = [];

                for (let i = 0; i < data.length; i++) {
                    keys.push(data[i].key);
                    values.push(data[i].value);
                }
                console.log(data)
                plot_multiple_days_consumption(keys, values);
                document.getElementById('image-placeholder_consumption_history').innerHTML = "";

            } else {
                if (dayChartObj !== null) {
                    dayChartObj.destroy();
                }
                document.getElementById('image-placeholder_consumption_history').innerHTML = "No data";
            }
        }
    };

    xhr.send();

}
let consumption_history_chart_obj;
consumption_history_chart_obj = null

function plot_multiple_days_consumption(dates, values) {
    if (consumption_history_chart_obj !== null) {
        consumption_history_chart_obj.destroy();
    }

    const datesFormatted = dates.map(function (entry) {
        const date = new Date(entry);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
    });

    var ctx = document.getElementById('consumption_history_canvas').getContext('2d');
    // Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--bs-emphasis-color');
    consumption_history_chart_obj = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datesFormatted,
            datasets: [{
                data: values,
                label: 'kWh'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,

            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }

                }
            },

            plugins: {
                legend: {
                    onClick: null
                },
                title: {
                    display: true,
                    text: `${dates.length}-days consumption history`

                }
            }
        }

    });
}

let dayChartObj;
dayChartObj = null;

function plot_sensor_data(data) {
    if (dayChartObj !== null) {
        dayChartObj.destroy();
    }
    let dates = data.map(function (entry) {
        let timestamp = entry.timestamp * 1000; // Convert Unix epoch to milliseconds
        return new Date(timestamp);
    });

    let datasets = [];
    let sensorKeys = Object.keys(data[0]).filter(function (key) {
        return key !== 'timestamp' && key !== 'original_timestamp';
    });

    sensorKeys.forEach(function (key) {
        let dataset;
        const values = data.map(function (entry) {
            return entry[key];
        });
        if (key === 'kwh' || key === 'vrms' || key === 'temp' || key === 'noise' || key.startsWith("pred")) { // hide those by default
            dataset = {
                data: values,
                label: key,
                hidden: true
            };
        } else {
            dataset = {
                data: values,
                label: key,
            };
        }

        datasets.push(dataset);

    });

    var ctx = document.getElementById('dayChart').getContext('2d');
    dayChartObj = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            elements: {
                point: {
                    radius: 0 // default to disabled in all datasets
                }
            },

            scales: {
                x: {
                    type: 'time',
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Sensor Data'
                }
            }
        }
    });
}

const buttonGroup = document.querySelector('.btn-group-toggle');

// Add event listener to the parent div
buttonGroup.addEventListener('click', function (event) {
    // Check if the clicked element is a radio button
    if (event.target.classList.contains('btn-check')) {
        // Code to execute when a button is clicked
        fetch_consumptions(event.target.value);
        // Add your custom logic here
    }
});



fetch_consumptions(7);
function dateToISO(date){
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    return `${currentYear}-${currentMonth}-${currentDay}`;
}


const date = new Date();



var datepicker = document.getElementById('date_picker');
datepicker.value = dateToISO(date);
datepicker.dispatchEvent(new Event('change'));

const div_list_appliances_consumptions_list = document.getElementById('Appliances_Consumptions_list');
const button_query_appliances_consumptions = document.getElementById('button_query_appliances_consumptions');
const appliances_consumption_start = document.getElementById('appliances_date_picker_start');
const appliances_consumption_end = document.getElementById('appliances_date_picker_end');


function appliances_consumptions_list(start,end) {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}/dev_id/${DEVICE}/pred_consumption/range/${start}/${end}?summarize=true`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('bearer_token')}`);

    xhr.onloadstart = function () {
        div_list_appliances_consumptions_list.innerHTML = SPINER;
    };

    xhr.onload = function () {

        if (this.status === 200) {
            // console.log(JSON.parse(xhr.responseText).energy_data);
            div_list_appliances_consumptions_list.innerHTML = ""
            let data;
            data = JSON.parse(xhr.responseText)
            console.log(data)

            for(const key in data){
                let key_formatted = key.replaceAll("_", " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                if (key.startsWith('pred'))
                    key_formatted = key_formatted.substring(4);

                div_list_appliances_consumptions_list.insertAdjacentHTML('beforeend',
                    `<div class="row justify-content-center">
            <div class="col-5">
                <p class="fs-3">${key_formatted}</p>
            </div>
            <div class="col-5">
                <p class="fs-3 green text-nowrap bg-body-tertiary rounded">${Number(data[key]).toFixed(2) + ' kWh'}</p>
            </div>
        </div>`)
            }
        }
        else if (this.status === 400){
            div_list_appliances_consumptions_list.innerHTML = JSON.parse(xhr.responseText).message;
        }
    }

    xhr.send();
}

function appliances_consumptions_graph(start,end) {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API}/dev_id/${DEVICE}/pred_consumption/range/${start}/${end}?summarize=false`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('bearer_token')}`);

    xhr.onloadstart = function () {
    };

    xhr.onload = function () {

        if (this.status === 200) {
            // console.log(JSON.parse(xhr.responseText).energy_data);
            let data;
            data = JSON.parse(xhr.responseText)
            console.log(data)

            const labels = data.map(item => {
                let key = item.id;
                return key.replaceAll("_", " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
            });

            const keys = Object.keys(data[0].value);
            const datasets = keys.map((key, index) => {
                let key_formatted = key.replaceAll("_", " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                if (key.startsWith('pred'))
                    key_formatted = key_formatted.substring(4);

                return {
                    label: key_formatted,
                    data: data.map(item => item.value[key]),
                    borderWidth: 1,
                    order: index,
                    hidden: key_formatted === 'Noise'
                };
            });

            show_appliances_consumptions_graph(labels, datasets);

        }
    }

    xhr.send();
}
let appliancesChart;
appliancesChart = null;
function show_appliances_consumptions_graph(labels, datasets){
    if (appliancesChart !== null)
        appliancesChart.destroy();

    const datesFormatted = labels.map(function (entry) {
        const date = new Date(entry);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
    });

    var ctx = document.getElementById('appliancesChart').getContext('2d');
    appliancesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datesFormatted,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        // Adjust the font size of the legend items
                        font: {
                            size: 16
                        },padding: 10
                    }
                }
            }
            ,
            indexAxis: 'x',
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    })

}

button_query_appliances_consumptions.addEventListener('click', function () {
    //div_list_appliances_consumptions_list.innerHTML = SPINER;

    appliances_consumptions_graph(appliances_consumption_start.value, appliances_consumption_end.value);
    appliances_consumptions_list(appliances_consumption_start.value, appliances_consumption_end.value);


})

const startDateInput = document.getElementById('appliances_date_picker_start');
const endDateInput = document.getElementById('appliances_date_picker_end');

const today = new Date();

// Subtract one day to get yesterday's date
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);


// Set max date for start date input
endDateInput.setAttribute('max', dateToISO(yesterday));

startDateInput.setAttribute('max', dateToISO(yesterday));

// Set min date for end date input
startDateInput.addEventListener('change', function () {
    endDateInput.setAttribute('min', startDateInput.value);
});

// Set min date for start date input
endDateInput.addEventListener('change', function () {
    startDateInput.setAttribute('max', endDateInput.value);
});




