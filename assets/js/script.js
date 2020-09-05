var currentDayCont = document.querySelector('weather-container')
var currentDayInfo = document.getElementById('#weather-info')
var button = document.querySelector('.btn');
var inputValue = document.querySelector('.form-input');
var name1 = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var humi = document.querySelector('.humidity');
var wind = document.querySelector('.wind-speed');
var uv = document.querySelector('.uv');
var cardHome = document.querySelector(".card-home")
var cardContainerEl = document.querySelector('.card-container')
var apiCode = '&appid=f46fb8ed11ba9a0d7afe9d56cc76d028&units=imperial' 
var cities = JSON.parse(localStorage.getItem('Cities')) || [];
var recentSearch = JSON.parse(localStorage.getItem('Current')) || [];
var weatherarr = []




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
    console.log(name)
    console.log(recentSearch)
    // var uniq = cities.reduce(function(a,b){
    //     if (a.indexOf(b) < 0 ) a.push(b);
    //     return a;
    //   },[]);
    //   uniq.length = Math.min(uniq.length, 4);
    //   if (uniq.length = 4) {
    //       uniq.shift() && uniq.push(name)
    //   }
    //   if(uniq.includes(name))
    //   console.log(uniq)
      
    localStorage.setItem("Current", JSON.stringify(weatherarr))
    localStorage.setItem("Cities", JSON.stringify(cities))

    
    // for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    //     var weatherdesc = JSON.parse(localStorage.getItem( localStorage.key( i ) ) )
    //     var city = (localStorage.key( i ))
    //     // console.log([i])
    //     console.log(weatherdesc)
    //     // console.log(city)
       
    //   }
}

// 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + '&appid=f46fb8ed11ba9a0d7afe9d56cc76d028'


var currentWeather = function () {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + apiCode


    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            console.log(response)
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    var nameValue = data['name'];
                    var tempValue = data['main']['temp']
                    var humidValue = data['main']['humidity']
                    var windValue = data['wind']['speed']
                    var descValue = data['weather'][0]['main']
                    var uvValue = data.weather[0].icon
                    weatherarr = [nameValue]
                    // wea.push(nameValue)
                    loadWeather(nameValue)
                     
                 
                    name1.innerHTML = nameValue;
                    temp.innerHTML = "Temp: " + tempValue;
                    desc.innerHTML = "Description: " + descValue;
                    humi.innerHTML = "Humidity: " + humidValue;
                    wind.innerHTML = "Wind-Speed: " + windValue;
                    inputValue.value = "";
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        });

    cardWeather()
    

}

var cardWeather = function () {
    var fiveDayApi = 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + apiCode
    cardHome.innerHTML = ' '
    fetch(fiveDayApi)
        .then(function (response) {
            return response.json(); 
        })
        .then(function(response){
            // console.log(response)
            for (let i = 0; i < response.list.length; i += 8){
                // console.log([i])
                var dayCount = [i]/8+1
                var weekDay = moment(response.list[i].dt_txt).format('dddd')
                var dayTemp = response.list[i].main.temp
                var humidity = response.list[i].main.humidity
                // console.log(`Forecast for ${weekDay} is ${dayTemp}`)
                var newContainer = document.createElement('div')
                var dayCard = document.createElement('h2')
                dayCard.classList.add('bg-color')
                // emojiEl.classList.add('card-text')
                // dailyTempEl.classList.add('card-text')
                cardHome.classList.add('bg-color')
               
                var dailyTempEl = document.createElement('p')
                var emojiEl = document.createElement('p')
                var humidityEl = document.createElement('p')
                dayCard.innerHTML = weekDay
                dailyTempEl.innerHTML = `temp: ${dayTemp}`
                emojiEl.innerHTML = "emoji"
                humidityEl.innerHTML = `humidity: ${humidity}`

                cardHome.appendChild(dayCard)
                cardHome.appendChild(emojiEl)
                cardHome.appendChild(dailyTempEl)
                cardHome.appendChild(humidityEl)
                // dayCard.appendChild(emojiEl)
                // dayCard.appendChild(dailyTempEl)
                // dayCard.appendChild(humidityEl)
                // cardContainerEl.appendChild(newContainer)

        
                
            }
        })

       
        
}




button.addEventListener('click', currentWeather)
