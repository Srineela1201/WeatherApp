const apiKey = "90fed497ed06a1d821d881ad242a9c84";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        var data = await response.json();

        console.log(data);

        let now = new Date();
        let date = document.querySelector(".date");
        date.innerText = dateBuilder(now);

        document.querySelector(".temp").textContent = data.main.temp + "°c";
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".feels-like").textContent = data.main.feels_like + "°c";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed+ "km/hr";

        var weatherCondition = data.weather[0].main.toLowerCase();
        weatherIcon.src = `images/${weatherCondition}.png`;

        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
    }
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`;
  }

searchBtn.addEventListener("click", function(){
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress", function(event){
    if(event.key === "Enter")  checkWeather(searchBox.value);
})

