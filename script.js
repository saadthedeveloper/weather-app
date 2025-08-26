let base_Url = "https://api.openweathermap.org/data/2.5/weather?q=";
let APIKeyWeather = "";

let userInputCityName = document.querySelector("#search-div input");
let searchButton = document.querySelector("#search-div button");
let weatherIcon = document.querySelector("#weather-icon");
let tempratureElement = document.querySelector("#Temprature");

searchButton.addEventListener("click", async () => {
    let URL = `${base_Url}${userInputCityName.value}&appid=${APIKeyWeather}`;

    let dataJSON = await fetch(URL);

    let data = await dataJSON.json();

    if (data.cod === 200) {
        let temprature = Math.floor((data.main.temp) - 273.5); //Temprature In Celsius
        let country = data.sys.country;
        let windSpeed = Math.ceil((data.wind.speed) * 3.6); //Wind Speed In Km/h
        let weatherDescription = data.weather[0].description;

        tempratureElement.innerText = `${temprature}°C`;

        console.log(temprature, windSpeed, weatherDescription, country);
        console.log(data);
        if(weatherDescription.includes("cloud") )
        {
            weatherIcon.setAttribute('src', 'Images/clouds.png');
        }
        else if(weatherDescription.includes("clear") )
        {
            weatherIcon.setAttribute('src', 'Images/sun.png');
            
        }
    }
    else {
        console.log("city not found")
    }



});

//overcast cloud
//clear sky
//scattered clouds
//few clouds
//broken clouds
//moderate rain




