var id = "03b57575688ded7ffa5d8cffaa391e7a"
var cityList = []
var currentCity;

var cityInputEl = document.querySelector("#city-name")
var cityFormEl = document.querySelector(".form-inline")
var searchHistory = document.querySelector(".recent-searches")
var futureWeather = document.querySelector(".forecast")
var currentWeather = document.querySelector(".today")
let today = moment().format("MM/DD/YYYY")


// fetch api data function
var getWeather = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + id
    currentCity = city

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // variable to hold lat and long
                var cityLat = data.city.coord.lat
                var cityLon = data.city.coord.lon
                return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" 
                + cityLat + "&lon=" + cityLon + "&units=imperial" + "&appid=" + id)
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

// saves searched cities to local storage
function storedCities() {
    localStorage.setItem("cities", JSON.stringify(cityList));
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
        addSearchedCity(cityName)
        storedCities()
    } else {
        alert("Please enter Valid U.S City Name")
    }
}

// display city information function for todays date
var getCityForecast = function(city) {
    console.log(city)
    console.log(city.current.dt)
    console.log(currentCity)

    // clear content first
    currentWeather.innerHTML = ""

    // variable to hold image icon value
    var weatherIcon = city.current.weather[0].icon
    var iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
    
    // define info needed from data
    var temp = city.current.temp + " F"
    var humidity = city.current.humidity
    var windSpeed = city.current.wind_speed

    // create content for today info
    var todayDivEl = document.createElement("div")
    todayDivEl.classList = "row mb-3"

    var todayHeaderEl = document.createElement("h3")
    todayHeaderEl.classList = "card-title"
    todayHeaderEl.innerHTML = "(" + today + ") <img src='" + iconUrl + "'>"

    // name of city searched
    var cityNameEl = document.createElement("h2")
    cityNameEl.textContent = currentCity.toUpperCase()

    var todayTempEl = document.createElement("p")
    todayTempEl.classList = "card-text"
    todayTempEl.textContent = "Temperature: " + temp

    var todayHumidityEl = document.createElement("p")
    todayHumidityEl.classList = "card-text"
    todayHumidityEl.textContent = "Humidity: " + humidity

    var todayWindSpeedEl = document.createElement("p")
    todayWindSpeedEl.classList = "card-text"
    todayWindSpeedEl.textContent = "Wind Speed: " + windSpeed

    todayHumidityEl.appendChild(todayWindSpeedEl)
    todayTempEl.appendChild(todayHumidityEl)
    todayHeaderEl.appendChild(cityNameEl)
    todayHeaderEl.appendChild(todayTempEl)
    todayDivEl.appendChild(todayHeaderEl)
    currentWeather.appendChild(todayDivEl)
    
    getUvi(city)
}

// function to display UVI with correct background color
var getUvi = function(city) {
    // get UVI value
    var uvi = city.current.uvi

    var uviEl = document.createElement("span")
    uviEl.setAttribute = ("style", "bold")
    uviEl.innerHTML = "<h4>UVI: " + uvi + "</h4>"
    
    // change color based on uvi value
    if (uvi < 3 ) {
        uviEl.classList = ("badge badge-success")
    } else if (uvi < 7 ) {
        uviEl.classList = ("badge badge-warning")
    } else if (uvi > 8) {
        uviEl.classList = ("badge badge-danger")
    
    }
    currentWeather.appendChild(uviEl)

    getFutureForecast(city)
}

var getFutureForecast = function (city) {

    // clear content first
    futureWeather.innerHTML = ""
    
    for (var i = 0; i < city.daily.length; i++) {
        // variable to hold image icon value
        var weatherIcon = city.daily[i].weather[0].icon
        var iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"

        // create container div
        var forecastContainer = document.createElement("div")
        forecastContainer.classList = ("card text-white bg-primary mb-3 m-4")

        // create header div
        var forecastHeaderDiv = document.createElement("div")
        forecastHeaderDiv.classList = ("card-header")
        forecastHeaderDiv.innerHTML = moment().add(i, 'days').format("MM/DD/YYYY") 
        + "<img src='" + iconUrl + "'>"

        // create text div
        var textDiv = document.createElement("div")
        textDiv.classList = ("card-body")

        // create text element to hold temp
        var tempEl = document.createElement("p")
        tempEl.classList = "card-text"
        tempEl.textContent = "Temp: " + city.daily[i].temp.day + " F"

        // create text element to hold humidity
        var humidityEl = document.createElement("p")
        humidityEl.classList = "card-text"
        humidityEl.textContent = "Humidity: " + city.daily[i].humidity

        // append children to parents
        tempEl.appendChild(humidityEl)
        textDiv.appendChild(tempEl)
        forecastHeaderDiv.appendChild(textDiv)
        forecastContainer.appendChild(forecastHeaderDiv)
        futureWeather.appendChild(forecastContainer)
    }

}

// function to display searched cities as a button
var addSearchedCity = function(cityName) {

    // create a button
    var buttonEl = document.createElement("btn")
    buttonEl.setAttribute("type", "button")
    buttonEl.setAttribute("data-city", cityName)
    buttonEl.classList = "btn btn-secondary"
    buttonEl.textContent = cityName.toLowerCase()

    searchHistory.appendChild(buttonEl)
}


// loads searched history from local storage
var loadCities = function() {
    var cityArray = JSON.parse(localStorage.getItem("cities"));
    console.log(typeof cityArray)
    
    if (cityArray === null) {
        cityArray = cityList[i]
    } else {
        for (var i = 0; i < cityArray.length; i++) {
            addSearchedCity(cityArray[i])
        }
    }
    
}

loadCities()

// Event Listeners
searchHistory.addEventListener("click", function(event){
    var searchHistoryBtn = event.target.attributes.getNamedItem("data-city").value

    getWeather(searchHistoryBtn)
})

cityFormEl.addEventListener("submit", formSubmitHandler)