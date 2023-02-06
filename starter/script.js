// my API key is  = 556e5cd8ffff392ae1955c107d35e1a2

const searchButton = $('#search-button');
let inputButton = $('#search-input')
let todaySection = $('#today')
let latitude = 0;
let longitude = 0;
let humidity = 0;
let temperature = 0;
let wind = 0;
let iconCodeToday = "";
const timeNow = new Date();
let todayDate = (currentDate());
let forecastEl = $('#forecast');
let historyEl = $('#history');
userChoice="";


//function to get today's date
function currentDate() {
    const timeNow = new Date();
    const date = ('0' + timeNow.getDate()).slice(-2);
    const month = ('0' + (timeNow.getMonth() + 1)).slice(-2);
    const year = timeNow.getFullYear();

    return `${date}-${month}-${year}`
};

 function todayWeather(){
      
            todaySection = $('#today');

            let cityName = $('<h2>');
            cityName.text(localStorage.getItem('city') + " " + todayDate);
            todaySection.append(cityName);
            //temperature in the chosen city
            let tempEl = $('<p>');
            tempEl.text("Temperature: " + localStorage.getItem('tempe') + " ℃");
            cityName.append(tempEl);
            //humidity in chosen city
            let humidityEl = $('<p>');
            humidityEl.text("Humidity: " + localStorage.getItem('humid') + " %");
            cityName.append(humidityEl);
            //wind in chosen city
            let windndEl = $('<p>');
            windndEl.text("Wind: " + localStorage.getItem('wind') + " KPH");
            cityName.append(windndEl);
            let todayIcon =$('<img>');
            todaySection.append(todayIcon);
            
            // //weather icon for today section
            let iconTodayURL = "http://openweathermap.org/img/wn/"+iconCodeToday +"@2x.png";
            $.ajax({
                url: iconTodayURL,
                method:"GET"
            }).then (function(response){
                todayIcon.attr ( 'src',iconTodayURL);
            });
}

function historyButtonsMake(){
    //creating history buttons and making them disappear when clicked
        let historyCity = $('<button>');
        historyEl.prepend(historyCity);
        historyCity.text(localStorage.getItem('city'))
        historyCity.css({'backgroundColor': 'orange', 'color':' white', 'padding':'7x', 'margin':'3px'})
        historyCity.attr('class','button btn')
        historyCity.attr('id','historyCity')
        
}



searchButton.on('click', function(event){
        event.preventDefault();
        clearSections()
        inputCityUnchanged = $('#search-input').val();
        //capitalising letter
        userChoice =inputCityUnchanged[0].toUpperCase() + inputCityUnchanged.substring(1)  

    
        localStorage.setItem('city', userChoice);
        historyButtonsMake();
        historyButtonRemove();
        
        
        
        //when pressed-button our choice gets inputted into the API call for geo location
        let urlChoiceGeocode =  "http://api.openweathermap.org/geo/1.0/direct?q=" +userChoice+ "&limit=5&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2";

        //getting response from APi
        $.ajax({
              url: urlChoiceGeocode,
              method:"GET"
        }).then (function(response){
                latitude = (response[0].lat);
                longitude = (response[0].lon);
                console.log(response)
                
                //setting local storage to store latitude and logitude for out of function
                localStorage.setItem('latit', latitude);
                localStorage.setItem('long', longitude);
                //getting information - temperature, wind and humidity from Api
                let =  urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+ longitude+"&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2"
                $.ajax({
                url: urlWeather,
                method:"GET"
                }).then (function(response){
                    
                        iconCodeToday = response.weather[0].icon;
                    
                        humidity  = response.main.humidity;
                        wind = response.wind.speed;
                        temperature = Math.floor(response.main.temp);
                        localStorage.setItem('humid', humidity);
                        localStorage.setItem('wind', wind);
                        localStorage.setItem('tempe', temperature);
                            
                        //get data from local Storage and populate the Today's section
                        todayWeather()
                        localStorage.clear(); 

                });   

                
                forecastSectionPopulating();
        }); 
           
});

function clearSections() {
    forecastEl.empty();
    todaySection.empty();
    
 }


function forecastSectionPopulating(){

   
    urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+ longitude+"&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2";
    $.ajax({
    url: urlForecast,
    method:"GET"
    }).then (function(response){

        //forecast section -creating 5 cards for 5 days
        

        for (i=0; i<40; i++){
                //choosing object through using time value
                let forecastHour = response.list[i].dt_txt;
                let forecastDate = forecastHour.substring(0,10);
                //if hour is 12:00 then include it in the display
                if(forecastHour.substring(11,19)==("12:00:00")) {

                        let tempCardData = response.list[i].main.temp;
                        let iconCardData = response.list[i].weather[0].icon;
                        let  humidCardData = response.list[i].main.humidity;
                    
                    
                        let cardEl = $('<div>');

                        //set css of the cards
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

                        //add content to cards for humidity and temperature
                        futureHumidityEl.text  ("Humidity: " + humidCardData + " %");
                        futureTempEl.text  ("Temp: " + tempCardData +" ℃");
                        
                        // changing date format to match the today's date
                        [y,y1,y2,y3,s,m,m1,s,d,d1] = forecastDate.split("");
                        let twistedDate = [d,d1,s, m, m1,s,y,y1,y2,y3].join("");
                        futureDateEl.text (twistedDate);

                        // //weather icon
                        let iconURL = "http://openweathermap.org/img/wn/"+iconCardData +"@2x.png";
                        $.ajax({
                            url: iconURL,
                            method:"GET"
                        }).then (function(response){
                            futureIcon.attr ( 'src',iconURL);
                        });

                }; 
        };                        
    });
}; 
      
function historyButtonRemove() {   
    let historyCityBtn = $('#historyCity')   
        historyCityBtn.on('click', function(event){
            event.preventDefault();
           
            console.log(this.innerHTML)
            localStorage.setItem('city', this.innerHTML)
            historyCityBtn.remove();
            userChoice=this.innerHTML
            console.log(userChoice)
            
            /////////////////////////////////////////////////////////////////
             //when pressed-button our choice gets inputted into the API call for geo location
             clearSections()
        let urlChoiceGeocode =  "http://api.openweathermap.org/geo/1.0/direct?q=" +userChoice+ "&limit=5&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2";

        //getting response from APi
        $.ajax({
              url: urlChoiceGeocode,
              method:"GET"
        }).then (function(response){
                latitude = (response[0].lat);
                longitude = (response[0].lon);
                console.log(response)
                
                //setting local storage to store latitude and logitude for out of function
                localStorage.setItem('latit', latitude);
                localStorage.setItem('long', longitude);
                //getting information - temperature, wind and humidity from Api
                let =  urlWeather = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+ longitude+"&units=metric&appid=556e5cd8ffff392ae1955c107d35e1a2"
                $.ajax({
                url: urlWeather,
                method:"GET"
                }).then (function(response){
                    
                        iconCodeToday = response.weather[0].icon;
                    
                        humidity  = response.main.humidity;
                        wind = response.wind.speed;
                        temperature = Math.floor(response.main.temp);
                        localStorage.setItem('humid', humidity);
                        localStorage.setItem('wind', wind);
                        localStorage.setItem('tempe', temperature);
                            
                        //get data from local Storage and populate the Today's section
                        todayWeather()
                        localStorage.clear(); 

                });   

                
                forecastSectionPopulating();
        }); 
        })
}   
    
// //need to set up London as starting point
// //clear localStorage

