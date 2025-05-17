const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path'); 

dotenv.config();

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'WeatherHistory.html'));
});


app.get('/database', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Database.html'));
});


app.get('/WeatherData', async (req, res) => {
  const { data, error } = await supabase.from('WeatherData').select();
  if (error) return res.status(500).send(error.message);
  res.send(data);
});

app.post('/weather', async (req, res) => {
  const { city_id, humidity_id, temperature_id, weather_descriptions } = req.body;
  const { data, error } = await supabase
    .from('WeatherData')
    .insert({ city_id, humidity_id, temperature_id, weather_descriptions })
    .select();
  if (error) return res.status(500).send(error.message);
  res.send(data);
});

app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});