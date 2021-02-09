import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const search = document.getElementById('search');
const loading = document.getElementById('loading');
const input = document.getElementById('searchInput');
const form = document.getElementById("form");
const city = document.getElementById('city');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const feel = document.getElementById('feel');
const humidity = document.getElementById('humidity');
const alert = document.getElementById('alert');
const danger = document.getElementById('danger');
const icon = document.getElementById('icon');

search.addEventListener("click", (e) => {
  e.preventDefault();
  search.style.display = 'none';
  loading.style.display = 'block';
  if (input.value !== '') {
    getData(input.value)
  }
});

const getData = async (val) => {
  try {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&units=imperial&appid=a7ba8621d506d20b58ad3b5b4c9f5311
`,
     {
       mode: 'cors'
     });

   const weatherData = await response.json();
   console.log(typeof weatherData.cod);

   if (weatherData.cod == 200) {
     description.innerHTML = weatherData.weather[0]["main"] + " - " + weatherData.weather[0]["description"];
     city.innerHTML = weatherData.name;
     temp.innerHTML = weatherData.main.temp;
     feel.innerHTML = 'Feels like ' + weatherData.main.feels_like;
     humidity.innerHTML = 'Humidity: ' + weatherData.main.humidity + '%';
     const img = document.createElement('img');
     const unit1 = document.createElement('sup');
     const unit2 = document.createElement('sup');
     unit1.innerHTML = " F";
     unit2.innerHTML = " F";
     temp.appendChild(unit1);
     feel.appendChild(unit2);
     img.src = "https://openweathermap.org/img/wn/" + weatherData.weather[0]["icon"] + "@2x.png";
     icon.appendChild(img);
     form.reset();
     alert.style.display = 'block';
     alert.innerHTML = 'Your search was submitted successfully';
     setTimeout(() => {
       alert.style.display = 'none';
     }, 5000);
     search.style.display = 'block';
     loading.style.display = 'none';
   }
   if (weatherData.cod == "404") {
     danger.style.display = 'block';
     danger.innerHTML = 'Sorry we could not find any city for your search'
     search.style.display = 'block';
     loading.style.display = 'none';
     setTimeout(() => {
       danger.style.display = 'none';
     }, 5000)
   }
   console.log(weatherData);


  } catch (e) {
    console.log("Error: " + e);
  }

}
