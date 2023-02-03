// my API key is  = 556e5cd8ffff392ae1955c107d35e1a2
//api call http://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1
//documantation https://openweathermap.org/api/one-call-3



const searchButton = $('#search-button');
const urlChoice =  "api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=556e5cd8ffff392ae1955c107d35e1a2"


searchButton.on('click', function(event){
    event.preventDefault();
    console.log ('hi');
    var userChoice = $('#search-input').val();
    console.log(userChoice)
    $.ajax({
        url: urlChoice,
        method:"GET"
    }).then (function(response){
    const results = response.data
    console.log (results)})
}
)


