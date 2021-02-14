// Personal API Key for OpenWeatherMap API
// Switched to metric system as described in the openweathermap FAQ
const baseURL = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "&appid=27b37b27cc8d1671fba76ce7e1bff8b8";

// Create a new date instance dynamically with JS. 
// getMonth() shows values from 0 to 11, to get the current month 1 had to be added.
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Listening for click and then running getData-Function
document.getElementById("generate").addEventListener('click', getData);

// Function to get the weather data
function getData() {
    const zip = document.getElementById("zip").value;
    if (zip.length != 5) {
        alert("Zipcode is invalid - please enter five digits!")
    } else {
        const feelings = document.getElementById("feelings").value;
        getWeather(baseURL, zip, apiKey)
            .then(function (weather) {
                const city = weather.name;
                const temp = weather.main.temp;
                const tempFeels = weather.main.feels_like;

                //posting weather data
                postData('/add', {
                    city,
                    temp,
                    tempFeels,
                    feelings,

                }).then(() => {
                    // function to be called as soon as the weather data is ready
                    updateUI();
                });

            })
    }

};

//call API with this function 
const getWeather = async (baseURL, zip, apiKey) => {
    const fetchURL = baseURL + zip + apiKey
    const res = await fetch(fetchURL)
    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log("An error has occured", error);
    }
};

// Make a POST request to our route:

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        // the method is set to POST because we are accessing the POST route we setup in server.js.
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
}

async function updateUI() {
    // Get the gathered data and get it to be displayed in the weather-journal-app
    const response = await fetch('/all');
    const latestData = await response.json();
    document.querySelector('#city').innerHTML = "The temperature in " + latestData.city + " is ";
    document.querySelector('#temp').innerHTML = Math.floor(latestData.temp) + " &#8451";
    document.querySelector('#tempFeels').innerHTML = "... but it feels like " + Math.floor(latestData.tempFeels) + " &#8451";
    document.querySelector('#date').innerHTML = "Todays date: " + newDate;
    document.querySelector('#content').innerHTML = "My feelings: " + latestData.feelings;
}