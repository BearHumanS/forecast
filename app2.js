const API_KEY = "32f768d329174ae2668cc48c3fec6c9c";

function GeoOk(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&&lang=kr&units=metric`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const city = document.querySelector("#city");
        const condition = document.querySelector("#condition");
        const temperature = document.querySelector("#temperature");
        const humidity = document.querySelector("#humidity");
        const wind = document.querySelector("#wind");

        const weatherCondition = data.weather[0].main.toLowerCase();
const weatherImage = document.getElementById('weather-image');

if (weatherCondition.includes('clear')) {
  weatherImage.src = 'clear.png';
} else if (weatherCondition.includes('cloud')) {
  weatherImage.src = 'clouds.png';
} else if (weatherCondition.includes('rain')) {
  weatherImage.src = 'rain.png';
} else if (weatherCondition.includes('snow')) {
  weatherImage.src = 'snow.png';
} else {
  weatherImage.src = 'default.png';
}
        
  
        city.innerText = `${data.name}`;
      condition.innerText = `${data.weather[0].main}`;
      const temp = data.main.temp;
      const temp2 = temp.toFixed(2);
      temperature.innerText = `${Math.floor(temp2)} °C`;
      humidity.innerHTML = `습도: ${data.main.humidity}%`;
      wind.innerText = `풍속: ${data.wind.speed} m/s`
    });
}

function GeoErr() {
    alert("Can't find you.No weather for you.");
}



navigator.geolocation.getCurrentPosition(GeoOk, GeoErr);
