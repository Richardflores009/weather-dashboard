var button = document.querySelector('.btn');
var inputValue = document.querySelector('.form-input');
var name1 = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var humi = document.querySelector('.humidity');
var wind = document.querySelector('.wind-speed');
var uv = document.querySelector('.uv');
var weatherarr = []



var loadWeather = function(name, value){
    var test = localStorage.setItem(name, JSON.stringify(value))
    
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        console.log( localStorage.getItem( localStorage.key( i ) ) );
        console.log(localStorage.key( i ))
      }
    }


// 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + '&appid=f46fb8ed11ba9a0d7afe9d56cc76d028'
var currentWeather = function () {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=f46fb8ed11ba9a0d7afe9d56cc76d028'



    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    // console.log(data)
                    var nameValue = data['name'];
                    var tempValue = data['main']['temp'];
                    var humidValue = data['main']['humidity']
                    var windValue = data['wind']['speed']
                    var descValue = data['weather'][0]['main']
                    // var uvValue = data['']
                    weatherarr = [tempValue,humidValue,windValue,descValue]
                    loadWeather(nameValue, weatherarr)
                     
                    
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
    var fiveDayApi = 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + '&appid=f46fb8ed11ba9a0d7afe9d56cc76d028'

    fetch(fiveDayApi)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        });

}




button.addEventListener('click', currentWeather)
