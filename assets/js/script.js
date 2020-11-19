var id = "03b57575688ded7ffa5d8cffaa391e7a"
var cityList = []

var cityInputEl = document.querySelector("#city-name")
var cityFormEl = document.querySelector(".form-inline")
var searchHistory = document.querySelector(".recent-searches")
var futureWeather = document.querySelector(".future")
var currentWeather = document.querySelector(".today")

// stores recent city search in localStorage
function recentSearch() {
    localStorage.setItem("cities", JSON.stringify(cityList));
}

// adds last searched city to list-group as button for user to select city
function createCityList(){
    $(".recent-searches").empty();
    cityList.forEach(function(city) {
        $(".recent-searches").prepend($(`<button class="list-group-item list-group-item-action cityButton" data-city="${city}">${city}</button>`));
    })
}

// fetch api data function
var getWeather = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + id
    
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                getCityForecast(data, city)
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
        cityList.push(cityName);
        recentSearch();
        createCityList();
    } else {
        alert("Please enter Valid U.S City Name")
    }
}

// display city information function
var getCityForecast = function(city, coord) {
    console.log(city)
}

// Event Listeners
cityFormEl.addEventListener("submit", formSubmitHandler)