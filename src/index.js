import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import domManip from './domManip';

const dom = domManip();
const {
  search,
  loading,
  input,
  form,
  city,
  description,
  temp,
  feel,
  humidity,
  alert,
  danger,
  deg,
  fahr,
  details1,
  details2,
  img,
} = dom;

const addUnit = (str, valTemp, valFeel) => {
  temp.innerHTML = valTemp;
  feel.innerHTML = `Feels like ${valFeel}`;
  const unit1 = document.createElement('sup');
  const unit2 = document.createElement('sup');
  unit1.innerHTML = str;
  unit2.innerHTML = str;
  temp.appendChild(unit1);
  feel.appendChild(unit2);
};

const changeWeatherUnit = (valTemp, valFeel, unit) => {
  if (unit === 'deg') {
    const newTemp = Math.trunc((valTemp - 32) * (5 / 9));
    const newFeel = Math.trunc((valFeel - 32) * (5 / 9));
    fahr.classList.remove('bg-blue');
    deg.classList.add('bg-blue');
    addUnit(' C°', newTemp, newFeel);
  } else {
    fahr.classList.add('bg-blue');
    deg.classList.remove('bg-blue');
    addUnit(' F', valTemp, valFeel);
  }
};

const getData = async (val) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&units=imperial&appid=a7ba8621d506d20b58ad3b5b4c9f5311
`,
    {
      mode: 'cors',
    });

    const weatherData = await response.json();

    if (weatherData.cod === 200) {
      description.innerHTML = `${weatherData.weather[0].main} - ${weatherData.weather[0].description}`;
      deg.classList.remove('d-none');
      fahr.classList.remove('d-none');
      city.innerHTML = weatherData.name;
      addUnit(' F', weatherData.main.temp, weatherData.main.feels_like);
      humidity.innerHTML = `Humidity: ${weatherData.main.humidity}%`;
      img.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

      form.reset();
      alert.style.display = 'block';
      alert.innerHTML = 'Your search was submitted successfully';
      setTimeout(() => {
        alert.style.display = 'none';
      }, 5000);
      search.style.display = 'block';
      loading.style.display = 'none';

      deg.addEventListener('click', () => {
        changeWeatherUnit(weatherData.main.temp, weatherData.main.feels_like, 'deg');
      });

      fahr.addEventListener('click', () => {
        changeWeatherUnit(weatherData.main.temp, weatherData.main.feels_like, 'fahr');
      });
    }
    if (weatherData.cod === '404') {
      details1.style.display = 'none';
      details2.style.display = 'none';
      danger.style.display = 'block';
      danger.innerHTML = 'Sorry we could not find any city for your search';
      search.style.display = 'block';
      loading.style.display = 'none';
      setTimeout(() => {
        danger.style.display = 'none';
      }, 5000);
    }
  } catch (e) {
    details1.style.display = 'none';
    details2.style.display = 'none';
    danger.style.display = 'block';
    danger.innerHTML = `There is an error${e}`;
    search.style.display = 'block';
    loading.style.display = 'none';
    setTimeout(() => {
      danger.style.display = 'none';
    }, 5000);
  }
};

search.addEventListener('click', (e) => {
  e.preventDefault();
  search.style.display = 'none';
  loading.style.display = 'block';
  if (input.value !== '') {
    getData(input.value);
  }
});
