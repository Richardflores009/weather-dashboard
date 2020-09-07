var currentDayCont = document.querySelector('weather-container')
var currentDayInfo = document.getElementById('#weather-info')
var button = document.querySelector('.submit-btn');
var imageElement = document.querySelector('.image-icon')
var name1 = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var humidityElement = document.querySelector('.humidity');
var windElement = document.querySelector('.wind-speed');
var uv = document.querySelector('.uv');
var ForecastElement = document.querySelector(".card-home")
var cardContainerEl = document.querySelector('.card-container')
var apiCode = '&appid=c888bc87519e878c5cbb608278ea9713&units=imperial' 
var apiCode2 = '&appid=86c24a05a9ee394be1a05ee64605e1cb&units=imperial'; 
var cities = JSON.parse(localStorage.getItem('Cities')) || [];
var recentSearch = JSON.parse(localStorage.getItem('Current'));
var weatherarr = []
var recentSearchArray = []
const weather = {};
var pageLoaded = false
var cardWeatherHasLoaded = false
weather.temperature = {
    unit : "fahrenheit"
}
// pulls both local storage current and cities ro call current function with button press or on reload
var loadWeather = function(name){
// sets length limit to local storage array and pops off the index 0 to fill with new input
    if(cities.includes(name)) {
        [cities[0],cities[cities.indexOf(name)]] = [cities[cities.indexOf(name)],cities[0]]
    } else if (cities.length === 4) {
        cities.unshift(name)
        cities.pop()
    } else {
        cities.push(name)
    }

    

   // sends sing item array for current search
    localStorage.setItem("Current", JSON.stringify(name))

    // sends array of cities forsearch history
    localStorage.setItem("Cities", JSON.stringify(cities))

   
    // loops through cities array to create search buttons
    // savedWeatherElement.innerHTML = ' '
    $('.saved-weather').empty();
    for (i=0; i<cities.length; i++) {
        var savedCities = $(`<button class = "${cities[i]} btn-light m-1 btn btn-lg btn-block" >`);
        savedCities.text(cities[i])

        $('.saved-weather').append(savedCities)
        
        savedCities.click(function(){
            console.log(this)
            var textContent = this.textContent;
            currentWeather(textContent);
            cardWeather(textContent);
        })
   
    
    }
  
}


//grab, convert, and send uv to page
var uvFetch = function(lat,lon) {
    var latUv = lat
    var lonUv = lon
    uvApi = `https://api.openweathermap.org/data/2.5/uvi?appid=86c24a05a9ee394be1a05ee64605e1cb&lat=${latUv}&lon=${lonUv}`
    fetch(uvApi)
   .then(function(response){
       let data = response.json();
       return data
   })
   .then(function(data){
       weather.uv = Math.round(data.value)
        uv.setAttribute("class", "info-text")
       if (weather.uv <= 2) {
            uv.setAttribute("class", "rounded-pill w-25 shadow p-3 mb-2 bg-info text-dark info-text")
       } if ( weather.uv > 2 && weather.uv < 8) {
            uv.setAttribute("class", "rounded-pill w-25 shadow p-3 mb-2 bg-warning text-dark info-text")
       } else if (weather.uv >= 8){
            uv.setAttribute("class", " rounded-pill w-25 shadow p-3 mb-2 bg-danger text-dark info-text")
       }
       uv.innerHTML = `UV Index: ${weather.uv}`
   })
}

// fetches current api and grabs data to push to object then calls display weather with currentweather as parameter 
var currentWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + apiCode2
   
   


    // make a get request to url
    fetch(apiUrl)
    .then(function(response){
        let data = response.json();
        return data;
        
    })
    .then(function(data){
        weather.city = data.name;
        weather.temperature.value = data.main.temp;
        weather.humidity = data.main.humidity;
        weather.wind = data.wind.speed;
        weather.description = data.weather[0].main;
        weather.iconId = data.weather[0].icon;
        weather.lat = data.coord.lat
        weather.long = data.coord.lon
        // recentSearch = [data.name]
        
        uvFetch(weather.lat,weather.long)   
    })
    .then(function(){
        displayWeather();
    })
        // .catch(function (error) {
        //     currentWeather
        //     alert("invalid entry");
        // });

  
}


// when called sends api info to html elements 
function displayWeather(){
    windElement.innerHTML = `Wind Speed: ${weather.wind} MPH`;
    humidityElement.innerHTML = `Humidity: ${weather.humidity}%`;
    temp.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    name1.innerHTML = `${weather.city}<img src="assets/images/${weather.iconId}.png"/>`;
}


// creates cards that store forecast data
var cardWeather = function (city) {
    // singleton design pattern to run recent search onetime
    var fiveDayApi = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + apiCode2
   
    
    ForecastElement.innerHTML = ' '
    fetch(fiveDayApi)
        .then(function (response) {
            return response.json(); 
        })
        .then(function(response){
            for (let i = 0; i < response.list.length; i += 8){
                // console.log([i])
                var dayCount = [i]/8+1
                
                var cardElement = document.createElement('div')
                cardElement.setAttribute('class', 'card  shadow align-self-end card-element bg-primary')
                cardElement.setAttribute('style', 'width: 200px;')
                var dayCard = document.createElement('h2')
                dayCard.setAttribute('class', 'card-text')
                var weekDay = moment(response.list[i].dt_txt).format('dddd')
                dayCard.innerHTML = weekDay

                var dailyTempEl = document.createElement('p')
                dailyTempEl.setAttribute('class', 'card-text info-text')
                var dayTemp = response.list[i].main.temp
                dailyTempEl.innerHTML = `${dayTemp}°<span>F</span>`


                var humidityEl = document.createElement('p')
                humidityEl.setAttribute('class', 'card-text info-text')
                var humidity = response.list[i].main.humidity
                humidityEl.innerHTML = `Humidity: ${humidity}%`


                var dailyIconEl = document.createElement('p')
                dailyIconEl.setAttribute('class', 'card-image-top')
                var dailyIcon = response.list[i].weather[0].icon
                dailyIconEl.innerHTML = `<img src="assets/images/${dailyIcon}.png"/>`
 
                cardElement.appendChild(dayCard)
                cardElement.appendChild(dailyIconEl)
                cardElement.appendChild(dailyTempEl)
                cardElement.appendChild(humidityEl)

                ForecastElement.appendChild(cardElement)
                
            }
        })
        
        
}


var searchHandler = function() {
    // event.preventDefault()
    var searchItem = document.querySelector('#username').value.trim()
    if(searchItem) {
        cardWeather(searchItem)
        currentWeather(searchItem)
        loadWeather(searchItem)
        document.querySelector('#username').value = ""
    } 
    // else {
    //     alert("Please enter a City")
    // }
    
}



// when submit button is clicked it calls currentweather function
button.addEventListener('click', searchHandler)
window.addEventListener('load', 
  function() { 
    console.log(recentSearch)
    if(recentSearch) {
        cardWeather(recentSearch)
        currentWeather(recentSearch)
        loadWeather(recentSearch)
        document.querySelector('#username').value = ""
    } 
  }, false);

