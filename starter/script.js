// my API key is  = 556e5cd8ffff392ae1955c107d35e1a2
//api call for weather  "https://api.openweathermap.org/data/2.5/weather?lat=50.088&lon=14.4208&appid=556e5cd8ffff392ae1955c107d35e1a2"
//making API call for geo location http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}



const searchButton = $('#search-button');
let todaySection = $('#today')
let latitude = 0;
let longitude = 0;
let humidity = 0;
let temperature = 0;
let wind = 0;



searchButton.on('click', function(event){
        event.preventDefault();
        var userChoice = $('#search-input').val();
        
        
       

        
        //when press button our choice gets inputted into the API call for geo location
    const urlChoiceGeocode =  "http://api.openweathermap.org/geo/1.0/direct?q=" +userChoice+ "&limit=5&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2"

    //typed city name
    console.log(userChoice)
    //getting response from APi
    $.ajax({
        url: urlChoiceGeocode,
        method:"GET"
    }).then (function(response){
            console.log (response);
             latitude = (response[0].lat);
             console.log(latitude);
             longitude = (response[0].lon);
             //setting local storage to store latitude and logitude for out of function
             localStorage.setItem('latit', latitude);
             localStorage.setItem('long', longitude);
    });

    //getting weather information for the geodata from localStorage
        latitude = localStorage.getItem('latit');
        longitude = localStorage.getItem('long');
        urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+ longitude+"&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2"

    //getting information - temperature, wind and humidity
        $.ajax({
            url: urlWeather,
            method:"GET"
        }).then (function(response){
                console.log (response);
                humidity  = response.main.humidity
                console.log ("humidity" + response.main.humidity);
                wind = response.wind.speed
                console.log ("wind" + response.wind.speed);
                temperature = response.main.temp
                console.log ("temp" + response.main.temp);
                localStorage.setItem('humid', humidity);
                localStorage.setItem('wind', wind);
                localStorage.setItem('tempe', temperature);
        });

        let cityName = $('<h2>');
        cityName.text(userChoice);
        todaySection.append(cityName)

        let tempEl = $('<p>');
        tempEl.text("Temperature: " + temperature + " C");
        cityName.append(tempEl);
        let humidityEl = $('<p>');
        humidityEl.text("Humidity: " + temperature + " %");
        cityName.append(humidityEl);
        let windndEl = $('<p>');
        windndEl.text("Wind: " + wind + " KPH");
        cityName.append(windndEl);

})

var forecastEl = $('#forecast')

for (i=0; i<5; i++){
var cardEl = $('<div>');
        
        cardEl.css('backgroundColor', 'rgb(42, 42, 65)');
        cardEl.css('color', 'white');
        cardEl.css('margin', '0 3px 0 3px');
        cardEl.css('padding', '10px');
        cardEl.text('5-Day Forecast');
        //attach cards to section
        forecastEl.append (cardEl);

        var futureDateEl = $('<p>');
        var futureTempEl = $('<p>');
        var futureHumidityEl = $('<p>');
        var futureIcon = $('<p>');
        futureDateEl.text ('11/01/1111');
        futureIcon.text('ICON IMAGE');
        futureTempEl.text  ('13 C');
        futureHumidityEl.text  ('45 %');
        cardEl.append(futureIcon);
        cardEl.append(futureHumidityEl);
        cardEl.append(futureDateEl);
        cardEl.append(futureHumidityEl);
        cardEl.append(futureTempEl);
}




