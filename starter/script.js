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
const timeNow = new Date();
//function to get today's date
function currentDate() {
    const timeNow = new Date();
    const date = ('0' + timeNow.getDate()).slice(-2);
    const month = ('0' + (timeNow.getMonth() + 1)).slice(-2);
    const year = timeNow.getFullYear();

    return `${date}/${month}/${year}`
};



//assigning function value to the <p> element
let todayDate = (currentDate());
 console.log(currentDate())

 function todayWeather(){
      
    todaySection = $('#today');

    let cityName = $('<h2>');
    cityName.text(localStorage.getItem('city') + " " + todayDate);
    todaySection.append(cityName);
    //temperature in the chosen city
    let tempEl = $('<p>');
    tempEl.text("Temperature: " + localStorage.getItem('tempe') + " C");
    cityName.append(tempEl);
    //humidity in chosen city
    let humidityEl = $('<p>');
    humidityEl.text("Humidity: " + localStorage.getItem('humid') + " %");
    cityName.append(humidityEl);
    //wind in chosen city
    let windndEl = $('<p>');
    windndEl.text("Wind: " + localStorage.getItem('wind') + " KPH");
    cityName.append(windndEl);
   }

searchButton.on('click', function(event){
        event.preventDefault();
        let userChoice = $('#search-input').val();
        localStorage.setItem('city', userChoice);
        
        
        //when press-button our choice gets inputted into the API call for geo location
        let urlChoiceGeocode =  "http://api.openweathermap.org/geo/1.0/direct?q=" +userChoice+ "&limit=5&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2";

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
                    console.log(latitude)
                    //getting information - temperature, wind and humidity from Api
                    let =  urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+ longitude+"&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2"
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
                             //get data from local Storage and populate the Today's section
                            todayWeather()
                        
                     });   
                     
                     urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+ longitude+"&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2";
                    $.ajax({
                        url: urlForecast,
                        method:"GET"
                    }).then (function(response){
                        console.log (response);

                        //from the [0] object
                        let temp4card = response.list[0].main.temp;
                        let icon4card = response.list[0].weather[0].icon;
                        let  humid4card = response.list[0].main.humidity;
                        console.log(temp4card+ icon4card + humid4card)
                        ///////////////////
                        ///////////////////////
                        currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                currentPicEl.setAttribute("alt", response.data.weather[0].description);
                        /////////////////
                        ///////////////
                        /////////////////
                     });

        });

        //forecast section -creating 5 cards for 5 days
        var forecastEl = $('#forecast')

        for (i=0; i<5; i++){
                let cardEl = $('<div>');
                //set css of te cards
                cardEl.css('backgroundColor', 'rgb(74, 123, 203)');
                cardEl.css('color', 'white');
                cardEl.css('margin', '0 3px 8px 3px');
                cardEl.css('padding', '10px');
                cardEl.text('');
                //attach cards to section
                forecastEl.append (cardEl);

                let futureIcon = $('<img>');
                cardEl.append(futureIcon);

                let futureDateEl = $('<p>');
                cardEl.append(futureDateEl);

                let futureTempEl = $('<p>');
                cardEl.append(futureTempEl);

                let futureHumidityEl = $('<p>');
                cardEl.append(futureHumidityEl);     
                 //add content to cards
                futureHumidityEl.text  ("Humidity: " + localStorage.getItem('humid') + " %");
                futureTempEl.text  ("Temp: " + localStorage.getItem('tempe') + " C");

                //setting next day date
                const tomorrow = new Date(timeNow)
                tomorrow.setDate(tomorrow.getDate() + i)
                let formatedTom = `${tomorrow.getDate()}/${tomorrow.getMonth() + 1}/${tomorrow.getFullYear()}`
                console.log(formatedTom)
                futureDateEl.text (formatedTom)
               
        }

       
       
});


 
      
    
    
// //need to set up London as starting point
// //clear localStorage

