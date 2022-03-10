var cities = []
var cityFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");

var formSubmitHandler = function () {
    // event.preventDefualt();
    var city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }

    saveSearch();
    pastSearch(city);
    debugger
}

var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getCityWeather = function(city) {
    var apiKey = "574c084447b2b4671be2b341b79a66d0"
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}'

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, city);
        });
    });
    console.log(apiKey);
};

var displayWeather = function(weather, searchCity) {
    // clear old content
    weatherContainerEl.textContent = "";
    citySearchInputEl.textContent = searchCity;

    console.log(weather);

    // date element
    var currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("MM D, YYYY") + ") ";
    citySearchInputEl.appendChild(currentDate);

    // img element
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", 'https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png');
    citySearchInputEl.appendChild(weatherIcon);

    // span element - temp data
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " F";
    temperatureEl.classList = "list-group-item"

    // span element - humidity data
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"

    // span element - wind data
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item"

    // append to container
    weatherContainerEl.appendChild(temperatureEl);
    weatherContainerEl.appendChild(humidityEl);
    weatherContainerEl.appendChild(windSpeedEl);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat,lon)

}

var getUvIndex = function (lat, lon) {
    var apiKey = "574c084447b2b4671be2b341b79a66d0"
    var apiURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}'
    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            displayUvIndex(data)
            console.log(data)
        });
    });
    console.log(lat);
    console.log(lon);
    console.log(apiKey);
}

var displayUvIndex = function (index) {
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if (index.value <=2) {
        uvIndexValue.classList = "favorable"

    } else if (index.value >2 && index.value<=8) {
        uvIndexValue.classList = "moderate"

    } else if (index.value >8) {
        uvIndexValue.classList = "servere"
    };

    uvIndexEl.appendChild(uvIndexValue);

    weatherContainerEl.appendChild(uvIndexEl);
}

var get5Day = function (city) {
    var apiKey = "574c084447b2b4671be2b341b79a66d0"
    var apiURL = 'https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}'

    fetch (apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            display5Day(data);
        });
    });
    console.log(apiKey);
};

var display5Day = function (weather) {
    forecastContainerEl.textContent = "";
    forecastTitle.textContent = "5-Day Forecast: ";

    var forecast = weather.list;
    for (var i = 5; i < forecast.length; i = i + 8) {
        var dailyForecast = forecast[i];

        var forecastEl = document.createElement("div");
        forecastEl.classList = "card bg-primary text-light m-2";

        console.log (dailyForecast)

        var forecastDate = document.createElement("h5");
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("MM D, YYYY");
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);

        var weatherIcon = document.createElement("img");
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", 'https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png');

        forecastEl.appendChild(weatherIcon);

        var forecastTempEl = document.createElement("span");
        forecastTempEl.classList = "card-body text-center";
        forecastTempEl.textContent = dailyForecast.main.temp + " F";

        forecastEl.appendChild(forecastTempEl);

        var forecastHumEl = document.createElement("span");
        forecastHumEl.classList = "card-body text-center";
        forecastHumEl.textContent = dailyForecast.main.humidity + " %";

        forecastEl.appendChild(forecastHumEl);

        console.log (forecastEl);

        forecastContainerEl.appendChild(forecastEl);
    }
}

var pastSearch = function (pastSearch) {
    
    // console.log (pastSearch);

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city", pastSearch);
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);
}

var pastSearchHandler = function(event) {
    var city = event.target.getAttribute("data-city")
    if (city) {
        getCityWeather(city);
        get5Day(city);
    }
}

cityFormEl.addEventListener("submit", formSubmitHandler);
// pastSearchButtonEl.addEventListener("click", pastSearchHandler);