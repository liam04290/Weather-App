// Add your API key here
const apiKey = '88aff83a5d3772b509422016815862d0';

// Fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`);
        const data = await response.json();
        displayCurrentWeather(data);
        displayFutureWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Display the current weather data
function displayCurrentWeather(data) {
    const currentData = data.list[0];
    const currentWeatherContainer = document.getElementById('current-weather-container');
    
    currentWeatherContainer.innerHTML = `
        <h2>${data.city.name} (${new Date().toLocaleDateString()})</h2>
        <p>Temperature: ${currentData.main.temp}°F</p>
        <p>Humidity: ${currentData.main.humidity}%</p>
        <p>Wind Speed: ${currentData.wind.speed} MPH</p>
    `;
}

// Display the future weather data
function displayFutureWeather(data) {
    const futureWeatherContainer = document.getElementById('future-weather-container');
    
    // Set the display to block for the entire container
    futureWeatherContainer.style.display = 'block';
    
    for (let i = 1, j = 1; i < data.list.length; i += 8, j++) {
        const futureData = data.list[i];
        const futureWeatherElem = document.getElementById(`day${j}`);
        
        // Set the display to block for each card
        futureWeatherElem.style.display = 'block';
        
        futureWeatherElem.innerHTML = `
            <h4>${new Date(futureData.dt_txt).toLocaleDateString()}</h4>
            <p>Temperature: ${futureData.main.temp}°F</p>
            <p>Humidity: ${futureData.main.humidity}%</p>
            <p>Wind Speed: ${futureData.wind.speed} MPH</p>
        `;
    }
}

// Add click event listener to the search button
document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    fetchWeather(city);
});
