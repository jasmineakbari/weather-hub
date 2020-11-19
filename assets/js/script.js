var cityInputEl = document.querySelector("#city-name")
var cityFormEl = document.querySelector(".form-inline")
var searchHistory = document.querySelector(".recent-searches")
var futureWeather = document.querySelector(".future")
var currentWeather = document.querySelector(".today")

// fetch api data function
var getWeather = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + "03b57575688ded7ffa5d8cffaa391e7a"
    
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data, city)
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
var displayCityWeather = function(weather, city) {
    // will need to add city name to recent searches as button

    // clear old content first
    futureWeather.textContent = ""
    currentWeather.textContent = ""

    for (var i = 0; i < currentWeather.length; i++) {
        // format City Name
        var cityName = city

        // create card and apply attributes
        var cityCardEl = document.createElement("div")
        cityCardEl.classList = "col-4 card text-white bg-primary mb-3"
        cityCardEl.textContent = cityName

        currentWeather.appendChild(cityCardEl)
    }

}

// Event Listeners
cityFormEl.addEventListener("submit", formSubmitHandler)