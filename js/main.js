window.onclick = (event) => {
    if(event.target.className === "btn") {
        position (); 
    }
}

function position () {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        getApi (lat, lng);
})
}

function getApi (lat, lng) {
    fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&&appid=10be0cb94606c6f113e7ee1df7c852c5`)
    .then(function(resp) { return resp.json() }) 
    .then(function(data) { drawWeather(data)})
}


function drawWeather (data) {
    let nameCity = data.city.name;
    let nameCountry = data.city.country;
    let weatherData = data.list;
    const date =  weatherData.filter(elem => elem.dt_txt.includes("12:00:00") ? true : false );
    let drawDiv = document.querySelector(".main");

    for (let i = 0; i < date.length; i++) {
        let day = new Date (date[i].dt * 1000);
        let options = { weekday: "long", 
                        month: "long", 
                        day: "numeric" };
        let iconWether = date[i].weather[0].icon;
        let temp =  parseInt(date[i].main.temp);
        let wind = date[i].wind.speed;
        let desc = date[i].weather[0].description;
        let a = `
        <div class='day'>
        <p class='date'><i class="fas fa-calendar-day"></i> ${day.toLocaleDateString('en-US', options)}</p>
        <p>${nameCity}, ${nameCountry}</p>
        <img src="http://openweathermap.org/img/wn/${iconWether}@2x.png" />
        <p><i class="fas fa-cloud-sun-rain"></i> ${desc.capitalize()}</p>
        <p><i class="fas fa-thermometer-full"></i> Temperature is ${temp} C</i></p>
        <p><i class="fas fa-wind"></i> Wind is ${wind}</p>
        </div>`;
        drawDiv.insertAdjacentHTML("beforeend", a);
    }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

let button = document.querySelector('.btn');
button.addEventListener("touchstart", function () {
    position();
    console.log('da');
});




