var id = "03b57575688ded7ffa5d8cffaa391e7a"
var cityList = []

var cityInputEl = document.querySelector("#city-name")
var cityFormEl = document.querySelector(".form-inline")
var searchHistory = document.querySelector(".recent-searches")
var futureWeather = document.querySelector(".future")
var currentWeather = document.querySelector(".today")

// fetch api data function
var getWeather = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + id
    
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // variable to hold lat and long
                var cityLat = data.city.coord[0]
                var cityLon = data.city.coord[1]
                console.log(cityLat, cityLon)
            })
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Network Connection Error");
    })
}

// form handler for retrieving city object
var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event)

    var cityName = cityInputEl.value.trim()

    if (cityName) {
        getWeather(cityName)
        cityInputEl.value = "";
    } else {
        alert("Please enter Valid U.S City Name")
    }
}

// display city information function
var getCityForecast = function(city) {
    console.log(city)
 
}

// Event Listeners
cityFormEl.addEventListener("submit", formSubmitHandler)