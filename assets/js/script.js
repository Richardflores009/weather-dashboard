var button = document.querySelector('.btn');
var inputValue = document.querySelector('.form-input');
var name1 = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var humi = document.querySelector('.humidity');
var wind = document.querySelector('.wind-speed');
var uv = document.querySelector('.uv');

// 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + '&appid=f46fb8ed11ba9a0d7afe9d56cc76d028'
var currentWeather = function () {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=f46fb8ed11ba9a0d7afe9d56cc76d028'
    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    // console.log(data)
                    var nameValue = data['name'];
                    var tempValue = data['main']['temp'];
                    var descValue = data['weather'][0]['main']
                    var humidValue = data['main']['humidity']
                    var windValue = data['wind']['speed']
                    // var uvValue = data['']

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

    // .then(response => response.json())
    // .then(data => {
    //     var nameValue = data['name'];
    //     var tempValue = data['main']['temp'];
    //     var descValue = data['weather'][0]['description']

    //     name1.innerHTML = nameValue;
    //     temp.innerHTML = "Temp -" + tempValue;
    //     desc.innerHTML = "Desc -" + descValue;
    //     inputValue.value = "";
    // })

    // .catch(err => alert("Wrong city name!"));
    cardWeather()
}

var cardWeather = function () {
    var fiveDayApi = 'https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + '&appid=f46fb8ed11ba9a0d7afe9d56cc76d028'

    fetch(fiveDayApi)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data)
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
