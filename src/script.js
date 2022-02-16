let now = new Date();
let h1 = document.querySelector("h1");
let h4 = document.querySelector("h4");

let days = now.getDate()
let years = now.getFullYear();

let daysNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let weekDays = daysNames[now.getDay()];

let monthsNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
let months = monthsNames[now.getMonth()];

h1.innerHTML = `${weekDays} ${months} ${days}, ${years}`;

let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10){
    hours = `0${hours}`;
}
if (minutes < 10){
    minutes = `0${minutes}`;
}

let timePeriod = [
    "AM",
    "PM",
]
if (hours >= 12){
    timePeriod = `PM`;
}else{
    timePeriod = `AM`;
}
h4.innerHTML = `${hours}: ${minutes} ${timePeriod}`;

function cities(event){
    event.preventDefault();
    let searchInput = document.querySelector("#enter-city-input");

    let h2 = document.querySelector("h2");
    h2.innerHTML = `${searchInput.value}`;

    console.log(searchInput.value);
    let metricUnit = `metric`;
    let apiKey = `647c7f64d4d8e2cb344d1165b1ce2c4e`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
    axios.get(`${apiUrl}${searchInput.value}&appid=${apiKey}&units=${metricUnit}`).then(showWeather);
}

function showWeather(response) {
    console.log(response);
    console.log(response.data.main.temp);
    console.log(response.data.weather[0].icon);
    console.log(response.data.wind.speed)
    console.log(response.data.weather[0].description)


    let p = document.querySelector("#city-temp");
    p.innerHTML = `${response.data.main.temp}°`;

    let speed = document.getElementById(`wind-speed`);
    speed.innerHTML = `${response.data.wind.speed}`;

    let description = document.getElementById(`weather-descriptions`);
    description.innerHTML = `${response.data.weather[0].description}`;

    let images = document.getElementById(`weather-icons`);
    images.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

}

let searchEngine = document.querySelector("#enter-city");
searchEngine.addEventListener("submit", cities);

function conversionTemp(event){
    event.preventDefault();

    let searchInput = document.querySelector("#enter-city-input");
    
    let imperialUnit = `imperial`;
    let apiKey = `647c7f64d4d8e2cb344d1165b1ce2c4e`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
    axios.get(`${apiUrl}${searchInput.value}&appid=${apiKey}&units=${imperialUnit}`).then(fahrenheitTemp);
}

function fahrenheitTemp(response){
    console.log(response);
    console.log(response.data.main.temp);

    let p = document.querySelector("#city-temp");
    p.innerHTML = `${response.data.main.temp}°`;

}

let conversionLinks = document.querySelector("#fahrenheit-conversion");
conversionLinks.addEventListener("click", conversionTemp);

function celsiusTemp(event){
    event.preventDefault();

    let searchInput = document.querySelector("#enter-city-input");
    let metricUnit = `metric`;
    let apiKey = `647c7f64d4d8e2cb344d1165b1ce2c4e`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
    axios.get(`${apiUrl}${searchInput.value}&appid=${apiKey}&units=${metricUnit}`).then(backToCelsius);
}

function backToCelsius(response){
    console.log(response);
    console.log(response.data.main.temp);
    let p = document.querySelector("#city-temp");
    p.innerHTML = `${response.data.main.temp}°`;
}

let revertCelsius = document.querySelector("#celsius-conversion");
revertCelsius.addEventListener("click", celsiusTemp)
