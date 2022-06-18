const weatherFiveDay = document.querySelector('#weatherFiveDay');
const btn = document.querySelector('#btn');
const findCity = document.querySelector('#findCity');
const currWeather = document.querySelector('#currWeather');
const weatherTemp = document.querySelector('#weatherTemp');
const weatherHum = document.querySelector('#weatherHum');
const weatherWind = document.querySelector('#weatherWind');
const fiveDayHeader = document.querySelector('#fiveDayHeader');
const fiveDayWind = document.querySelector('#fiveDayWind');
const fiveDayTemp = document.querySelector('#fiveDayTemp');
const fiveDayHum = document.querySelector('#fiveDayHum');


// one city weather
var oneCityWeather = function(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid=574c084447b2b4671be2b341b79a66d0')
    .then(response => response.json())
    .then(response => {
        currWeather.innerHTML += 'City Name:' + '' + response.name
        weatherHum.innerHTML += 'Humidity:' + '' + response.main.humidity
        weatherWind.innerHTML += 'Wind Speed:' + '' + response.wind.speed
        console.log(response)
    })
}

var fiveDayForecast = function(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid=574c084447b2b4671be2b341b79a66d0')
    .then(response => response.json())
    .then(response => {
        fiveDayHeader.innerHTML += 'Five Day Forecast'
        fiveDayTemp.innerHTML += 'Temp:' + '' + response.main.temp
        fiveDayWind.innerHTML += 'Wind Speed:' + '' + response.wind.speed
        fiveDayHum.innerHTML += 'Humidity:' + '' + response.main.humidity
        console.log(response)
    })
}

btn.addEventListener ('click', function() {
    oneCityWeather (findCity.value);
    console.log(citySearch.value)
});
btn.addEventListener ('click', function() {
    fiveDayForecast (findCity.value);
    console.log(findCity.value)
});