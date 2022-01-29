const apikey = "dde90b2a238bc25821098c4978b262f8";
const Showdata = document.querySelector(".weatherShow");
const button = document.querySelector(".Submit");
var city = document.querySelector("#city");
const err = document.querySelector(".error");
function weatherDeatial(data) {
  const { ...all } = data;
  console.log(all);
  if (all.cod == "404") {
    err.textContent = `${all.message.toUpperCase()}`;
     err.style.display = "block"
  } else {
    err.style.display = "none";
    const temp = all.main["temp_min"] - 273.15;
    const icon = all.weather[0]["icon"];
    const des = all.weather[0]["description"];

    const cityName = all.name;
    Showdata.innerHTML = `<h3>${cityName}</h3> <span>${des}<img class="img" src=https://openweathermap.org/img/wn/${icon}@2x.png></span>
  <h1>${Math.floor(temp)}  °C</h1> `;
  }
}
button.addEventListener("click", () => {
  if (city.value != "") {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}`
    )
      .then((response) => response.json())
      .then((data) => weatherDeatial(data))
      .then(() => {
        city.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("enter valid city");
  }
});

function timeShow() {
  const time = document.querySelector(".time");
  const currentTiming = new Date().toLocaleTimeString();
  time.innerHTML = currentTiming;
}
setInterval(timeShow, 1000);

(function () {
  const Hour = new Date().getHours();
  console.log(Hour);
  if (Hour > 6 && Hour <= 17) {
    document.body.style.backgroundImage =
      "url('https://images.pexels.com/photos/3367619/pexels-photo-3367619.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')";
  } else if (Hour > 17 && Hour <= 19) {
    document.body.style.backgroundImage =
      "url('https://images.pexels.com/photos/2338113/pexels-photo-2338113.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')";
  } else if (Hour > 19 || Hour  < 6 ) {
    document.body.style.background =
      "url('https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260') no-repeat center";
  }
})();
