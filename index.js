let express = require('express');
let { createClient } = require('@supabase/supabase-js');
let bodyParser = require('body-parser');
let dotenv = require('dotenv');
dotenv.config();

let app = express();
let port = 3000;


app.use(bodyParser.json());


let supabaseUrl = process.env.SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_KEY;
let supabase = createClient(supabaseUrl, supabaseKey);


app.get('/', (req, res) => {
  res.sendFile('WeatherHistory.html', { root: __dirname });
});

app.get('/WeatherData', async (req, res) => {
  console.log('Attempting to GET all weather data');

  let { data, error } = await supabase.from('WeatherData').select();

  if (error) {
    console.error('Supabase GET error:', error);
    return res.status(500).send(error.message);
  }

  res.send(data);
});


app.post('/WeatherData', async (req, res) => {
  console.log('Adding City Weather Data');
  console.log('Incoming body:', req.body);

  let { city, humidity, temperature_id, Weather_Type } = req.body;

  let { data, error } = await supabase
    .from('WeatherData')
    .insert({
      city_id: city,
      humidity_id: humidity,
      temperature_id: temperature_id,
      weather_descriptions: Weather_Type,
    })
    .select();

  if (error) {
    console.error('Supabase INSERT error:', error);
    return res.status(500).send(error.message);
  }

  res.send(data);
});


app.listen(port, () => {
  console.log(`APP IS ALIVE on port ${port}`);
});