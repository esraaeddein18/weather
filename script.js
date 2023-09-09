// Today variables 
let todayName = document.getElementById("todayname")
let todayNumber = document.getElementById("todaynumber")
let todayMonth = document.getElementById("todaymonth")
let todayLocation = document.getElementById("todaylocation")
let todayTemp = document.getElementById("todaytemp")
let todayConditionImg = document.getElementById("todaycondition")
let ConditionText = document.getElementById("condition")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")

// next data 
let nextDay = document.getElementsByClassName("nextday")
let maxTemp_c = document.getElementsByClassName("maxtemp_c")
let minTemp_c = document.getElementsByClassName("mintemp_c")
let nextConditionimg = document.getElementsByClassName("nextconditionimg")
let nextConditiontxt = document.getElementsByClassName("nextconditiontxt")

// search input 
let searchInput = document.getElementById("search")

// Fetch API Data
async function getWeatherData(cityName)
{
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}

// display Today data
function displayTodayData(data)
{
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    ConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
}
// display next days data
function displayNextData(data)
{
    let forecastData = data.forecast.forecastday
    for(let i = 0 ; i < 2 ; i++)
    {
        let nextDate = new Date(forecastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        maxTemp_c[i].innerHTML = forecastData[i+1].day.maxtemp_c
        minTemp_c[i].innerHTML = forecastData[i+1].day.mintemp_c
        todayConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        ConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
}
// start app
async function startApp(city="london")
{
    let weatherData = await getWeatherData(city)
    if(!weatherData.error)
    {
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
}
startApp()

searchInput.addEventListener("input",function(){
    startApp(searchInput.value)
})






