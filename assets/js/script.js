var getWeather = function(city) {
    //format the github api url
    var apiUrl = fetch("api.openweathermap.org/data/2.5/forecast?zip=94040,us&appid=a2dd844fa915b1c2936067736b330124")
    .then(console.log(apiUrl))
}

getWeather()
