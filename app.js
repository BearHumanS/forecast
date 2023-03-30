const yourapikey = "32f768d329174ae2668cc48c3fec6c9c";

let displayedDays = [];

function GeoOk(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${yourapikey}&&lang=kr&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const forecast = data.list;

      const forecastList = document.querySelector("#forecast-list");

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      forecast.forEach((item) => {
        const date = new Date(item.dt_txt);
        if (date < today) {
          return;
        }
        const day = date.toLocaleDateString();

        if (!displayedDays.includes(day)) {
          displayedDays.push(day);

          const forecastByDay = {};
          forecast.forEach((item) => {
            const date = new Date(item.dt_txt);
            const day = date.toLocaleDateString();
            if (!forecastByDay[day]) {
              forecastByDay[day] = [];
            }
            forecastByDay[day].push(item);
          });

          const items = forecastByDay[day];
          let highestTemp = -Infinity;
          let lowestTemp = Infinity;
          let morningPop = 0;
          let afternoonPop = 0;

          items.forEach((item) => {
            const temp = item.main.temp;
            const precip = item.pop;
            const time = new Date(item.dt_txt).getHours();

            if (temp > highestTemp) {
              highestTemp = temp;
            }
            if (temp < lowestTemp) {
              lowestTemp = temp;
            }
            if (time < 12 && precip > morningPop) {
              morningPop = precip;
            } else if (time >= 12 && precip > afternoonPop) {
              afternoonPop = precip;
            }
          });

          const li = document.createElement("li");
          const main = item.weather[0].main;
          li.innerHTML = `
            <h2>${day}</h2>
            <p>최고기온: ${Math.round(highestTemp)}°C</p>
            <p>최저기온: ${Math.round(lowestTemp)}°C</p>
            <p>오전 강수확률: ${Math.round(morningPop * 100)}%</p>
            <p>오후 강수확률: ${Math.round(afternoonPop * 100)}%</p>
            <p id="weather"> ${main} </p>
            <ul>`;

          forecastList.appendChild(li);

          const weatherCondition = main.toLowerCase();
          const weatherImage = document.createElement("img");

          switch (weatherCondition) {
            case "clear":
              weatherImage.src = "clear.png";
              break;
            case "clouds":
              weatherImage.src = "clouds.png";
              break;
            case "rain":
              weatherImage.src = "rain.png";
              break;
            case "snow":
              weatherImage.src = "snow.png";
              break;
            default:
              weatherImage.src = "default.png";
              break;
          }
          weatherImage.style.width = "50px";
          weatherImage.style.height = "50px";

          const weatherElement = li.querySelector("#weather");
          weatherElement.appendChild(weatherImage);
        }
      });
    });
}

function GeoErr() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(GeoOk, GeoErr);
