function fetchWeather(city) {
  fetch(`/weather?city=${city}`)
    .then(response => response.json())
    .then(data => {
      const weatherContainer = document.getElementById('weather-container');

      // Clear previous weather data
      weatherContainer.innerHTML = '';

      // Create elements to display weather information
      const location = document.createElement('p');
      location.textContent = `Location: ${data.location.name}, ${data.location.country}`;

      const temperature = document.createElement('p');
      temperature.textContent = `Temperature: ${data.current.temp_c}°C`;

      const condition = document.createElement('p');
      condition.textContent = `Condition: ${data.current.condition.text}`;

      // Append weather information to the container
      weatherContainer.appendChild(location);
      weatherContainer.appendChild(temperature);
      weatherContainer.appendChild(condition);
    })
    .catch(error => {
      console.error(error);
    });
}

// Handle form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();
  if (city !== '') {
    fetchWeather(city);
    cityInput.value = '';
  }
});
