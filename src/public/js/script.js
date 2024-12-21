$(document).ready(function () {
  getWeather();
  getForecast();
  getDayOfWeek();
  getTime();
  getIcon();

  $("#search-box").keyup((event) => {
    if (event.keyCode == 13) {
      $("#search-button").click();
    }
  });
});

let map;
let marker;

function initMap(lat, long) {
  const coordenadas = [lat, long];

  if (map) {
    map.remove();
    map = null;
  }
  map = L.map("map").setView(coordenadas, 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  const marker = L.marker(coordenadas).addTo(map);
  marker.bindPopup("<b>Hello!</b>").openPopup();
}

function searchWeather() {
  let searchQuery = $(".search").val();
  getWeather(searchQuery);
}

function getWeather(searchQuery) {
  let url = "http://api.openweathermap.org/data/2.5/weather?";
  let params = {
    APPID: apiKey,
    units: "metric",
  };
  if (searchQuery) {
    params.q = `${searchQuery},MX`;
  } else {
    params.id = 3979770;
  }

  $.ajax(url + $.param(params), {
    success: (data) => onSuccess(data),
    error: function (error) {
      $(".error-message").text("City not found, try again!");
    },
  });

  function onSuccess(data) {
    $(".error-message").empty();

    let temp = Math.round(data.main.temp);
    let max = Math.round(data.main.temp_max);
    let min = Math.round(data.main.temp_min);

    if (data.weather[0].description === "clear sky") {
      data.weather[0].description = "clear skies";
    }

    $(".city").text(data.name);
    $(".country").text(data.sys.country);
    $(".description").text(data.weather[0].description);
    $(".temp").text(temp);
    $(".max").text(max);
    $(".min").text(min);
    $(".humidity").text("Humidity: " + data.main.humidity + "%");
    $(".wind").text("Wind: " + data.wind.speed + " mph");

    getIcon(data.weather[0].icon);

    let lat = parseFloat(data.coord.lat);
    let long = parseFloat(data.coord.lon);
    initMap(lat, long);
  }
}

function getDayOfWeek() {
  let date = new Date();
  let day = date.getDay();
  // let day = 6;
  let weekday = new Array(7);
  weekday[0] = "SUN";
  weekday[1] = "MON";
  weekday[2] = "TUE";
  weekday[3] = "WED";
  weekday[4] = "THU";
  weekday[5] = "FRI";
  weekday[6] = "SAT";

  let today = weekday[day];
  let day1 = weekday[(day + 1) % 7];
  let day2 = weekday[(day + 2) % 7];
  let day3 = weekday[(day + 3) % 7];
  let day4 = weekday[(day + 4) % 7];
  let day5 = weekday[(day + 5) % 7];
  $(".today").text(today);
  $(".day1").text(day1);
  $(".day2").text(day2);
  $(".day3").text(day3);
  $(".day4").text(day4);
  $(".day5").text(day5);
}

function getTime() {
  let currentdate = new Date();
  let hours = currentdate.getHours();
  let minutes = currentdate.getMinutes();
  let ampm;

  if (hours > 12) {
    ampm = "PM";
    hours -= 12;
  } else {
    ampm = "AM";
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let time = hours + ":" + minutes;
  $(".time").text(time);
  $(".ampm").text(ampm);
}

function getIcon(data) {
  let $icon = $(".icon");

  switch (data) {
    // day
    case "01d":
      $icon.addClass("wi wi-day-sunny");
      break;
    case "02d":
      $icon.addClass("wi wi-day-cloudy");
      break;
    case "03d":
      $icon.addClass("wi wi-cloud");
      break;
    case "04d":
      $icon.addClass("wi wi-cloudy");
      break;
    case "09d":
      $icon.addClass("wi wi-day-rain");
      break;
    case "10d":
      $icon.addClass("wi wi-day-rain-mix");
      break;
    case "11d":
      $icon.addClass("wi wi-day-lightning");
      break;
    case "13d":
      $icon.addClass("wi wi-day-snow-wind");
      break;
    case "50d":
      $icon.addClass("wi wi-fog");
      break;
    // night
    case "01n":
      $icon.addClass("wi wi-night-clear");
      break;
    case "02n":
      $icon.addClass("wi wi-night-alt-cloudy");
      break;
    case "03n":
      $icon.addClass("wi wi-cloud");
      break;
    case "04n":
      $icon.addClass("wi wi-cloudy");
      break;
    case "09n":
      $icon.addClass("wi wi-showers");
      break;
    case "10n":
      $icon.addClass("wi wi-night-alt-showers");
      break;
    case "11n":
      $icon.addClass("wi wi-storm-showers");
      break;
    case "13n":
      $icon.addClass("wi wi-wi-night-alt-snow");
      break;
    case "50n":
      $icon.addClass("wi wi-fog");
      break;
  }
}

function searchForecast() {
  let searchQuery = $('.search').val();
  getForecast(searchQuery);
}

function getForecast( searchQuery ) {
  let url = 'http://api.openweathermap.org/data/2.5/forecast/daily?';
  let params = {
    APPID: apiKey,
    units: 'imperial'
  };
  if (searchQuery) {
    params.q = searchQuery;
  } else {
    params.id = 3979770
  }

  $.ajax(url + $.param( params ), {
    success: ( data ) => onSuccess( data ),
    error: function (error) {
      $('.error-message').text('An error occurred!');
    }
  });

  function onSuccess( data ) {
    let oneMax = Math.round(data.list[1].temp.max);
    let twoMax = Math.round(data.list[2].temp.max);
    let threeMax = Math.round(data.list[3].temp.max);
    let fourMax = Math.round(data.list[4].temp.max);
    let fiveMax = Math.round(data.list[5].temp.max);

    let oneMin = Math.round(data.list[1].temp.min);
    let twoMin = Math.round(data.list[2].temp.min);
    let threeMin = Math.round(data.list[3].temp.min);
    let fourMin = Math.round(data.list[4].temp.min);
    let fiveMin = Math.round(data.list[5].temp.min);

    $('.dayOneMax').text(oneMax);
    $('.dayTwoMax').text(twoMax);
    $('.dayThreeMax').text(threeMax);
    $('.dayFourMax').text(fourMax);
    $('.dayFiveMax').text(fiveMax);

    $('.dayOneMin').text(oneMin);
    $('.dayTwoMin').text(twoMin);
    $('.dayThreeMin').text(threeMin);
    $('.dayFourMin').text(fourMin);
    $('.dayFiveMin').text(fiveMin);
  }
}
