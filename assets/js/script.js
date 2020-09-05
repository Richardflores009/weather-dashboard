var currentDayCont = document.querySelector('weather-container')
var currentDayInfo = document.getElementById('#weather-info')
var button = document.querySelector('.btn');
var inputValue = document.querySelector('.form-input');
var savedWeatherElement = document.querySelector('.saved-weather')
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
var recentSearch = JSON.parse(localStorage.getItem('Current')) || [];
var weatherarr = []
const weather = {};

weather.temperature = {
    unit : "fahrenheit"
}
 
console.log(weather.temperature.value)
var loadWeather = function(name){

    if(cities.includes(name)) {
        [cities[0],cities[cities.indexOf(name)]] = [cities[cities.indexOf(name)],cities[0]]
    } else if (cities.length === 4) {
        cities.unshift(name)
        cities.pop()
    } else {
        cities.push(name)
    }

    
    if (recentSearch.includes(name)) {
        console.log("hello")
    } else {
        recentSearch.shift()
        recentSearch = []
        console.log("nonono")
    }

   
    localStorage.setItem("Current", JSON.stringify(recentSearch))
    localStorage.setItem("Cities", JSON.stringify(cities))
    savedWeatherElement.innerHTML = ' '
    for (i=0; i<cities.length; i++) {
        console.log(cities)
        var savedCities = document.createElement('button')
        savedCities.setAttribute("class", "btn btn-primary btn-sm")
        var savedDiv = document.createElement('div')
        savedCities.textContent = cities[i]
        savedDiv.appendChild(savedCities)
        savedWeatherElement.appendChild(savedDiv)
    }

    
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        var weatherdesc = JSON.parse(localStorage.getItem( localStorage.key( i ) ) )
        var city = (localStorage.key( i ))
        // console.log([i])
        console.log(weatherdesc)
        // console.log(city)
       
      }

}




var currentWeather = function () {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + apiCode


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
        recentSearch = [data.name]
        // wea.push(nameValue)
        loadWeather(data.name)
         
     
        // name1.innerHTML = nameValue;
        // temp.innerHTML = "Temp: " + tempValue;
        // desc.innerHTML = "Description: " + descValue;
        // humi.innerHTML = "Humidity: " + humidValue;
        // wind.innerHTML = "Wind-Speed: " + windValue;
        // inputValue.value = "";
        
    })
    .then(function(){
        displayWeather();
    });
        // .catch(function (error) {
        //     alert("Unable to connect to GitHub");
        // });

    cardWeather()
   
   
}

function displayWeather(){
    windElement.innerHTML = `Wind Speed: ${weather.wind} MPH`;
    humidityElement.innerHTML = `Humidity: ${weather.humidity}%`;
    temp.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    name1.innerHTML = `${weather.city}<img src="assets/images/${weather.iconId}.png"/>`;
}

var cardWeather = function () {
    var fiveDayApi = 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + apiCode
    
    
    ForecastElement.innerHTML = ' '
    fetch(fiveDayApi)
        .then(function (response) {
            return response.json(); 
        })
        .then(function(response){
            console.log(response)
            for (let i = 0; i < response.list.length; i += 8){
                // console.log([i])
                var dayCount = [i]/8+1
                
                var cardElement = document.createElement('div')
                cardElement.setAttribute('class', 'card')

                var dayCard = document.createElement('h2')
                dayCard.setAttribute('class', 'card-text')
                var weekDay = moment(response.list[i].dt_txt).format('dddd')
                dayCard.innerHTML = weekDay

                var dailyTempEl = document.createElement('p')
                dailyTempEl.setAttribute('class', 'card-text')
                var dayTemp = response.list[i].main.temp
                dailyTempEl.innerHTML = `temp: ${dayTemp}`


                var humidityEl = document.createElement('p')
                humidityEl.setAttribute('class', 'card-text')
                var humidity = response.list[i].main.humidity
                humidityEl.innerHTML = `humidity: ${humidity}`


                var dailyIconEl = document.createElement('p')
                dailyIconEl.setAttribute('class', 'card-image-top')
                var dailyIcon = response.list[i].weather[0].icon
                dailyIconEl.innerHTML = `<img src="assets/images/${dailyIcon}.png"/>`


                
                cardElement.appendChild(dayCard)
                cardElement.appendChild(dailyIconEl)
                cardElement.appendChild(dailyTempEl)
                cardElement.appendChild(humidityEl)

                ForecastElement.appendChild(cardElement)


               
                // dayCard.classList.add('bg-color')
                // // emojiEl.classList.add('card-text')
                // // dailyTempEl.classList.add('card-text')
                // cardHome.classList.add('bg-color')
               
                
                
               
               
                
               

                
                // cardHome.appendChild(dayCard)
                // cardHome.appendChild(dailyIconEl)
                // cardHome.appendChild(dailyTempEl)
                // cardHome.appendChild(humidityEl)
                // dayCard.appendChild(emojiEl)
                // dayCard.appendChild(dailyTempEl)
                // dayCard.appendChild(humidityEl)
                // cardContainerEl.appendChild(newContainer)

        
                
            }
        })
        
        
}




button.addEventListener('click', currentWeather)


// if(cities.includes(name)) {
    //     [cities[0],cities[cities.indexOf(name)]] = [cities[cities.indexOf(name)],cities[0]]
    // } else if (cities.length === 4) {
    //     cities.unshift(name)
    //     cities.pop()
    // } else {
    //     cities.push(name)
    // }

    
    // // if (recentSearch.includes(name)) {
    // //     console.log("hello")
    // // } else {
    // //     recentSearch.shift()
    // //     recentSearch = []
    // //     console.log("nonono")
    // }

   
    // localStorage.setItem("Current", JSON.stringify(weatherarr))
    // localStorage.setItem("Cities", JSON.stringify(cities))
    // savedWeatherElement.innerHTML = ' '
    // for (i=0; i<cities.length; i++) {
    //     console.log(cities)
    //     var savedCities = document.createElement('button')
    //     savedCities.setAttribute("class", "btn btn-primary btn-sm")
    //     var savedDiv = document.createElement('div')
    //     savedCities.textContent = cities[i]
    //     savedDiv.appendChild(savedCities)
    //     savedWeatherElement.appendChild(savedDiv)
    // }

    
    // for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    //     var weatherdesc = JSON.parse(localStorage.getItem( localStorage.key( i ) ) )
    //     var city = (localStorage.key( i ))
    //     // console.log([i])
    //     console.log(weatherdesc)
    //     // console.log(city)
       
    //   }
