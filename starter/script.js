// my API key is  = 556e5cd8ffff392ae1955c107d35e1a2
//api call for weather  "https://api.openweathermap.org/data/2.5/weather?lat=50.088&lon=14.4208&appid=556e5cd8ffff392ae1955c107d35e1a2"
//making API call for geo location http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//api call for 5-day forecast  https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid={API key}&units=metric



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
        
        
    //when press-button our choice gets inputted into the API call for geo location
    const urlChoiceGeocode =  "http://api.openweathermap.org/geo/1.0/direct?q=" +userChoice+ "&limit=5&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2"

    //getting response from APi
    $.ajax({
        url: urlChoiceGeocode,
        method:"GET"
    }).then (function(response){
             latitude = (response[0].lat);
             longitude = (response[0].lon);
             //setting local storage to store latitude and logitude for out of function
             localStorage.setItem('latit', latitude);
             localStorage.setItem('long', longitude);
    });

    //getting weather information for the geodata from localStorage
        latitude = localStorage.getItem('latit');
        longitude = localStorage.getItem('long');
        urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+ longitude+"&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2"

    //getting information - temperature, wind and humidity from Api
        $.ajax({
            url: urlWeather,
            method:"GET"
        }).then (function(response){
                
                humidity  = response.main.humidity;
                wind = response.wind.speed;
                temperature = response.main.temp;
                localStorage.setItem('humid', humidity);
                localStorage.setItem('wind', wind);
                localStorage.setItem('tempe', temperature);
        });
        //get data from local Storage and populate the Today's section
        let cityName = $('<h2>');
        cityName.text(userChoice);
        todaySection.append(cityName)

        let tempEl = $('<p>');
        tempEl.text("Temperature: " + localStorage.getItem('tempe') + " C");
        cityName.append(tempEl);
        let humidityEl = $('<p>');
        humidityEl.text("Humidity: " + localStorage.getItem('humid') + " %");
        cityName.append(humidityEl);
        let windndEl = $('<p>');
        windndEl.text("Wind: " + localStorage.getItem('wind') + " KPH");
        cityName.append(windndEl);

})

//the forecast section -creating 5 cards for 5 days
var forecastEl = $('#forecast')

for (i=0; i<5; i++){
var cardEl = $('<div>');
       
        cardEl.css('backgroundColor', 'rgb(42, 42, 65)');
        cardEl.css('color', 'white');
        cardEl.css('margin', '0 3px 8px 3px');
        cardEl.css('padding', '10px');
        cardEl.text('');
        //attach cards to section
        forecastEl.append (cardEl);

        var futureDateEl = $('<p>');
        var futureTempEl = $('<p>');
        var futureHumidityEl = $('<p>');
        var futureIcon = $('<p>');
        cardEl.append(futureIcon);
        futureIcon.attr("class","sourceText fa-solid fa-sun"); 
        $(futureIcon.sourceText).append('<i class="fa-solid fa-sun"></i>'); 

        futureDateEl.text ('11/01/1111');
        
        
        futureTempEl.text  ('Temp: 13 C');
        futureHumidityEl.text  ('Humidity: 45 %');
        
        cardEl.append(futureHumidityEl);
        cardEl.append(futureDateEl);
        cardEl.append(futureHumidityEl);
        cardEl.append(futureTempEl);
}

urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+ longitude+"&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2";
$.ajax({
    url: urlForecast,
    method:"GET"
}).then (function(response){
        console.log (response);
        
});




