var nameInputEl = document.querySelector("#city-name")
var searchHistory = document.querySelector(".recent-searches")
var futureWeather = document.querySelector(".future")
var currentWeather = document.querySelector(".today")

var getWeather = function(city) {
    //format the github api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + "Orlando" + "&appid=" + "03b57575688ded7ffa5d8cffaa391e7a"
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
            })
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Internet");
    })
}

getWeather()