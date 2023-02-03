// my API key is  = 556e5cd8ffff392ae1955c107d35e1a2
//api call for weather  "https://api.openweathermap.org/data/2.5/weather?lat=50.088&lon=14.4208&appid=556e5cd8ffff392ae1955c107d35e1a2"
//making API call for geo location http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}



const searchButton = $('#search-button');
const cityName = $('#chosenCity')
let latitude = 0;
let longitude = 0;



searchButton.on('click', function(event){
    event.preventDefault();
    var userChoice = $('#search-input').val();
    //when press button our choice gets inputted into the API call for geo location
    const urlChoiceGeocode =  "http://api.openweathermap.org/geo/1.0/direct?q=" + userChoice+ "&limit=5&appid=556e5cd8ffff392ae1955c107d35e1a2"

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
             localStorage.setItem('lat', latitude);
             localStorage.setItem('long', longitude);
        })
})





