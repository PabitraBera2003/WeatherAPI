let container = document.querySelector(".container");
let logo = document.querySelector(".logo");
let ownerInfo = document.querySelector(".owner-info");
let otherPanel = document.querySelector(".other-panel");
let togglebtn = document.querySelector(".toggle-up");
let toggleIcon = togglebtn.querySelector("i");

logo.addEventListener("click", function(){
    if(ownerInfo.style.display == "none"){
        ownerInfo.style.display = "block";
    }else{
        ownerInfo.style.display = "none";
    }
});

togglebtn.addEventListener("click", function(){
    if(otherPanel.style.transform === "translateY(78%)"){
        otherPanel.style.transform = "translateY(0%)";
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
    } else {
        otherPanel.style.transform = "translateY(78%)";
        toggleIcon.classList.remove("fa-chevron-down");
        toggleIcon.classList.add("fa-chevron-up");
    }
});


//-------------form section
let searchCity = document.querySelector(".searchCity");
let submit = document.querySelector(".submit");
let form = document.querySelector('form');

//------------left section
let temperature = document.querySelector(".temperature");
let city = document.querySelector(".city");
let timeElem = document.querySelector(".time");
let dateElem = document.querySelector(".date");
let weatherImage = document.querySelector(".weather-image");
let bigWeatherIcon = document.querySelector(".big-weather-icon");
let condition = document.querySelector(".condition");
let rightCondition = document.querySelector(".right-panel-condition");
let windDirection = document.querySelectorAll(".wind-direction");
let latitude = document.querySelectorAll(".latitude");
let longitude = document.querySelectorAll(".longitude");

//-----------right-section
let cloudyValue = document.querySelectorAll(".cloudy-value");
let humidityValue = document.querySelectorAll(".humidity-value");
let windValue = document.querySelectorAll(".wind-value");
let uvValue = document.querySelectorAll(".uv-value");
let pressureValue = document.querySelectorAll(".pressure-value");

let cityInput = "London";
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(searchCity.value.length == 0){
        alert('Enter a city name');
    } else {
        cityInput = searchCity.value;
        fetchWeatherData();
        searchCity.value = "";
    }
});

function dayOfTheWeek(day, month, year){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date(`${year}-${month}-${day}`).getDay()];
};

function fetchWeatherData(){
    fetch(`http://api.weatherapi.com/v1/current.json?key=da7b0433e36149618a870442240107&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        temperature.innerHTML = data.current.temp_c + "&#176;" + "C";
        condition.innerHTML = data.current.condition.text;
        rightCondition.innerHTML = data.current.condition.text;
        const localtime = data.location.localtime;
        const y = parseInt(localtime.substr(0, 4));
        const m = parseInt(localtime.substr(5, 2));
        const d = parseInt(localtime.substr(8, 2));
        const timeString = localtime.substr(11);
        dateElem.innerHTML = `${dayOfTheWeek(d, m, y)}, ${d} ${m} ${y}`;
        timeElem.innerHTML = timeString;
        city.innerHTML = data.location.name;
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        weatherImage.src = data.current.condition.icon;
        bigWeatherIcon.src = data.current.condition.icon;
        cloudyValue.forEach((element) => {
            element.innerHTML = data.current.cloud + " %";
        });
        humidityValue.forEach((element) => {
            element.innerHTML = data.current.humidity + " %";
        });
        windValue.forEach((element) =>{
            element.innerHTML = data.current.wind_kph + " km/h";
        });
        uvValue.forEach((element) => {
            element.innerHTML = data.current.uv;
        });
        pressureValue.forEach((element) => {
            element.innerHTML = data.current.pressure_mb + " hpa";
        });
        windDirection.forEach((element) => {
            element.innerHTML = data.current.wind_dir;
        });
        latitude.forEach((element) => {
            element.innerHTML = data.location.lat;
        });
        longitude.forEach((element) => {
            element.innerHTML = data.location.lon;
        });
        

        let timeOfDay = "day";
        if (!data.current.is_day) {
            timeOfDay = "night";
        }
        const code = data.current.condition.code;
        if (code === 1000) {
            container.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
            submit.style.background = "#e5ba92";
            if (timeOfDay === "night") {
                submit.style.background = "#181e27";
            }
        } else if (
            [1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282].includes(code)
        ) {
            container.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
            submit.style.background = "#fa6d1b";
            if (timeOfDay === "night") {
                submit.style.background = "#181e27";
            }
        } else if (
            [1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246, 1249, 1252].includes(code)
        ) {
            container.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
            submit.style.background = "#647d75";
            if (timeOfDay === "night") {
                submit.style.background = "#325c80";
            }
        } else {
            container.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
            submit.style.background = "#4d72aa";
            if (timeOfDay === "night") {
                submit.style.background = "#1b1b1b";
            }
        }
        container.style.opacity = "1";
    })
}

fetchWeatherData();
container.style.opacity = "1";