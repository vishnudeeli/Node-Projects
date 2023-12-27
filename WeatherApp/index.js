const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.port | 3000;

// Serve static files
app.use(express.static('public'));

// API endpoint to fetch weather data
app.get('/weather', async (req, res) => {
  try {
    const apiKey = '86c29bf998d14b73b6b43730231506';
    const city = req.query.city;

    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey} &q=${city}&aqi=yes
    `);
    const weatherData = response.data;

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
