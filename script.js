// script.js

// Replace with your own API key from OpenWeatherMap
const API_KEY = "86d067cac18e4d019e052b8d297a7faa";

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");

const cityElement = document.getElementById("city");
const dateElement = document.getElementById("date");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const iconElement = document.getElementById("icon");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");

async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherUI(data) {
    const { name } = data;
    const { main, description, icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    cityElement.textContent = name;
    dateElement.textContent = new Date().toDateString();
    temperatureElement.textContent = `${Math.round(temp)}°C`;
    descriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    iconElement.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    windElement.textContent = `Wind: ${Math.round(speed)} km/h`;
}

searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
        searchInput.value = "";
    }
});
