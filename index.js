let express = require('express');
let supabaseClient = require('@supabase/supabase-js');
let bodyParser = require('body-parser');
let dotenv = require('dotenv');
dotenv.config();

let app = express();
let port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
let supabaseUrl = process.env.SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_KEY;

let supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/WeatherData', async (req, res) => {
    console.log('Attempting to GET all weather data');

    let {data, error} = await supabase.from('WeatherData').select();

    if(error) {
        console.log(`Error: ${error}`)
        res.statusCode = 500;
        res.send(error);
    }
        res.send(data);
});

app.post('/WeatherData', async (req, res) => {
    console.log('Adding City Weather Data');

    console.log(req.body);
    let City = req.body.city;
    let Humidity = req.body.humidity;
    let Temperature = req.body.temperature_id;
    let Weather_Type = req.body.Weather_Type;

    let {data, error} = await supabase
    .from('WeatherData')
    .insert({
        city_id: City,
        humidity_id: Humidity,
        temperature_id: Temperature,
        weather_descriptions: Weather_Type
    })
    .select();

    if(error) {
        console.log(`Error: ${error}`)
        res.statusCode = 500;
        res.send(error);
    }
        res.send(data);


    res.send();
});

app.listen(port, () => {
    console.log('APP IS ALIVE on port' + port);
});