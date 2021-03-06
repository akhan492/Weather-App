const apikey = "dde90b2a238bc25821098c4978b262f8";
const Showdata = document.querySelector(".weatherShow");
const button = document.querySelector(".Submit");
var city = document.querySelector("#city");
const err = document.querySelector(".error");
const box = document.querySelectorAll(".text-center")
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
        console.log(box);
        box.forEach((b)=>{
          b.classList.add("text-dark");
          b.classList.remove("text-light")
        })
        Showdata.classList.add("text-white");
    } else if (Hour > 17 && Hour <= 19) {
    document.body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1488226941561-6d7a806ae42a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')";
  } else if (Hour > 19 || Hour  < 6 ) {
    document.body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1527842891421-42eec6e703ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')";
  }
})();
city.addEventListener("keyup", (e)=>{
  if(e.keyCode===13){
    e.preventDefault();
    button.click();
  }
})