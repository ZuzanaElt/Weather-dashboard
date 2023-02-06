# Weather dashboard

Application that allows user to see what is the weather at the time in chosen city. In the same time a 5-day forecast for the same city is displayed.

## Deployment 
URL :
https://zuzanaelt.github.io/Weather-dashboard/
github page: https://github.com/ZuzanaElt/Weather-dashboard

## User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Functionality
* Weather dashboard with form inputs.
  * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
  * When a user views the current weather conditions for that city they are presented with:
    * The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The wind speed
  * When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
  * When a user clicks on a city in the search history they are again presented with current and future conditions for that city and the city is removed from memory

## Credits

The following sites were used to help:
 * using gradient tool https://cssgradient.io/;
 * positinoing of elements https://learn.shayhowe.com/html-css/positioning-content/

 * setting next day date - this was not used at the end
    <!-- // const tomorrow = new Date(timeNow)
    // tomorrow.setDate(tomorrow.getDate() + i)
    // let formatedTom = `${tomorrow.getDate()+1}/${tomorrow.getMonth()}/${tomorrow.getFullYear()}`
    // console.log(formatedTom) -->
 * reversing order of string: Fullstack Guy
https://stackoverflow.com/questions/54722767/changing-order-of-characters-in-a-string-using-javascript

## Mock-up
![screenshot of the page](Screenshot%20(41).png)

### Used
Open Weather Api
Bootstrap
Jquerry
FontAwesome

