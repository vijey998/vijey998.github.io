const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express(),
    bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors())

// /getWeather?lat=34.027699&lng=-118.290479
app.get('/getWeather', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.url);
    let lat = req.query.lat;
    let lng = req.query.lng;
    console.log(lng);
    const url = "https://api.tomorrow.io/v4/timelines?location=" + lat + "," + lng + "&" +
        "fields=temperature&fields=temperatureApparent&fields=humidity&fields=windSpeed&fields=windDirection&" +
        "fields=pressureSeaLevel&fields=precipitationProbability&fields=precipitationType&fields=sunriseTime&" +
        "fields=sunsetTime&fields=visibility&fields=cloudCover&fields=moonPhase&fields=uvIndex&fields=weatherCode&" +
        "fields=temperatureMin&fields=temperatureMax&units=imperial&" +
        "timesteps=1d&timesteps=1h&timesteps=current&timezone=America/Los_Angeles&" +
        "apikey=xQUv3IGn8OA4z3lALDhyYVlLdd8eB95C"

    const options = { method: 'GET', headers: { Accept: 'application/json' } };
    axios.get(url, options)
        .then(resp => {
            console.log(resp.data);
            res.json(resp.data);
        })
        .catch(err => console.error('error:' + err));
});

app.get('/', (req, res) => {
    console.log('Welcome to weather-app home page')
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});