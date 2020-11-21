var id = "03b57575688ded7ffa5d8cffaa391e7a"
var cityList = []

var cityInputEl = document.querySelector("#city-name")
var cityFormEl = document.querySelector(".form-inline")
var searchHistory = document.querySelector(".recent-searches")
var futureWeather = document.querySelector(".forecast")
var currentWeather = document.querySelector(".today")
let today = new Date().toLocaleDateString()


// fetch api data function
var getWeather = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + id
    
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // variable to hold lat and long
                var cityLat = data.city.coord.lat
                var cityLon = data.city.coord.lon
                return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + id)
                .then(function(response2) {
                    response2.json().then(function(data) {
                        getCityForecast(data)
                    })
                })
                getCityForecast(data)
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
        cityList.push(cityName)
        //searchHistory()
    } else {
        alert("Please enter Valid U.S City Name")
    }
}

// display city information function for todays date
var getCityForecast = function(city) {
    console.log(city)
    
    var temp = city.current.temp
    var humidity = city.current.humidity
    var windSpeed = city.current.wind_speed

    // format card info
    currentWeather.innerHTML = "<div class='row ml-1'><h3 class='mr-3'>(" + today + ")</h3"
    + "</div><div class='p-4'><p>Temperature: " + temp + "</p><p>Humidity: " + humidity + "</p><p> Wind Speed: " 
    +  windSpeed + "</p></div>"
    
    getUvi(city)
}

// function to display UVI with correct background color
var getUvi = function(city) {
    var uvi = city.current.uvi
    var uviValue = city.current.uvi.value

    var uviEl = document.createElement("h4")
    uviEl.innerHTML = uvi
    
    if (uviValue < 3 ) {
        uviEl.setAttribute("background-color", "green")
    } else if (uviValue < 7 ) {
        uviEl.setAttribute("background-color", "yellow")
    } else if (uviValue > 8) {
        uviEl.setAttribute("background-color", "red")
    
    }
    currentWeather.appendChild(uviEl)

    getFutureForecast(city)
}

var getFutureForecast = function (city) {
    
    for (var i = 0; i < city.daily.length; i++) {
        // create container div
        var forecastContainer = document.createElement("div")
        forecastContainer.classList = ("card bg-primary shadow m-4")

        // create header div
        var forecastHeaderDiv = document.createElement("div")
        forecastHeaderDiv.classList = ("card-body")

        // create header element
        var forecastHeader = document.createElement("h4")
        forecastHeader.classList = ("card-title")
        forecastHeader.textContent = today

        // create text div
        var textDiv = document.createElement("div")
        textDiv.classList = ("card-text")

        // create text element to hold temp
        var tempEl = document.createElement("p")
        tempEl.textContent = city.daily[i].temp.day

        // create text element to hold humidity
        var humidityEl = document.createElement("p")
        humidityEl.textContent = city.daily[i].humidity

        // append children to parents
        tempEl.appendChild(humidityEl)
        textDiv.appendChild(tempEl)
        forecastHeader.appendChild(textDiv)
        forecastHeaderDiv.appendChild(forecastHeader)
        forecastContainer.appendChild(forecastHeaderDiv)
        futureWeather.appendChild(forecastContainer)

        i++
    }
}

// function to display searched cities as a button

// saves searched cities to local storage
function searchHistory() {
    localStorage.setItem("cities", JSON.stringify(cityList));
}

// loads searched history from local storage
//loadCities()

// Event Listeners
cityFormEl.addEventListener("submit", formSubmitHandler)