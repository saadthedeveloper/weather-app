let base_Url = "https://api.openweathermap.org/data/2.5/weather?q=";
let APIKeyWeather = "35dd47446cb0e4d5eb601989c945ed63";

let userInputCityName = document.querySelector("#search-div input");
let searchButton = document.querySelector("#search-div button");
let weatherIcon = document.querySelector("#weather-icon");
let tempratureElement = document.querySelector("#Temprature");
let cityNameDisplayed = document.querySelector("#city-name")
let windSpeedDisplayed = document.querySelector("#wind-speed");
let humidityPercentageDisplayed = document.querySelector("#humidity-percentage");
let body = document.querySelector("body");



body.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
        searchButton.click();
    }
});


searchButton.addEventListener("click", async () => {
    let URL = `${base_Url}${userInputCityName.value}&appid=${APIKeyWeather}`;

    let dataJSON = await fetch(URL);

    let data = await dataJSON.json();

    displayWeatherData(data);


});


const displayWeatherData = (data) => {
    if (data.cod === 200) {
        let temprature = Math.floor(data.main.temp - 273.15); //Temprature In Celsius
        let country = data.sys.country;
        let windSpeed = Math.ceil((data.wind.speed) * 3.6); //Wind Speed In Km/h
        let weatherDescription = data.weather[0].main.toLowerCase();
        let humidity = data.main.humidity;

        tempratureElement.innerText = `${temprature}°C`;
        cityNameDisplayed.innerText = userInputCityName.value.charAt(0).toUpperCase() + userInputCityName.value.slice(1);
        windSpeedDisplayed.innerText = `${windSpeed}km/h`;
        humidityPercentageDisplayed.innerText = `${humidity}%`;

        if (cityNameDisplayed.innerText.length === 8 && window.innerWidth > 565) {
            cityNameDisplayed.style.fontSize = "84px";
            cityNameDisplayed.style.marginTop = "0px";
        }
        else if (cityNameDisplayed.innerText.length >= 9 && window.innerWidth > 565) {
            cityNameDisplayed.style.fontSize = "70px";
            cityNameDisplayed.style.marginTop = "0px";
        }
        else if (cityNameDisplayed.innerText.length < 8 && window.innerWidth > 565) {
            cityNameDisplayed.style.fontSize = "90px";
            cityNameDisplayed.style.marginTop = "0px";

        } else if (cityNameDisplayed.innerText.length === 8 && window.innerWidth < 565) {
            cityNameDisplayed.style.fontSize = "70px";
            cityNameDisplayed.style.marginTop = "-50px";
        }
        else if (cityNameDisplayed.innerText.length >= 9 && window.innerWidth < 565) {
            cityNameDisplayed.style.fontSize = "50px";
            cityNameDisplayed.style.marginTop = "-39px";

        }
        else if (cityNameDisplayed.innerText.length < 8 && window.innerWidth < 565) {
            cityNameDisplayed.style.fontSize = "90px";
            cityNameDisplayed.style.marginTop = "-50px";
        }


        if (weatherDescription.includes("cloud")) {
            weatherIcon.src = 'Images/clouds.png';
        } else if (weatherDescription.includes("clear")) {
            weatherIcon.src = 'Images/sun.png';
        } else if (weatherDescription.includes("rain") || weatherDescription.includes("drizzle") || weatherDescription.includes("drizzle")) {
            weatherIcon.src = 'Images/drizzle.png';
        } else if (weatherDescription.includes("snow")) {
            weatherIcon.src = 'Images/snowy.png';
        } else {
            weatherIcon.src = 'Images/mist.png';
        }
    }
    else {
        console.log("city not found")
    }

}
window.addEventListener("DOMContentLoaded", async () => {
    let URL = `${base_Url}${userInputCityName.value}&appid=${APIKeyWeather}`;
    let dataJSON = await fetch(URL);
    let data = await dataJSON.json();
    displayWeatherData(data);
});





