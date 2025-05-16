function Annyang() {
  if (annyang) {
      // Let's define a command.
      const commands = {
          'Go To About Us': () => { 
              window.location.href = "About.html"
            },
          'Go To Simulation': () => {
              window.location.href = "WeatherHistory.html";
            },
          'Go To Map': () => {
              window.location.href = "WeatherMap.html";
             
      
      
          
            // Add our commands to annyang
            annyang.addCommands(commands);
          
            // Start listening.
            annyang.start();
          }
        }
      }
      }
      
function NoAnnyang() {
  if(annyang) {
    annyang.abort();
    annyang.removeCommands();
    }
  }



function ChangeOption() {
  let option = document.getElementById("Select").value;

  //We first hide all the options first
  document.getElementById("WeatherSearch").style.display = "none";
  document.getElementById("Advisory").style.display = "none";
  document.getElementById("Vibes").style.display = "none";

  //Chooses Options
  if (option === "WeatherSearch") {
    document.getElementById("WeatherSearch").style.display = "block";
  } else if(option === "Advisory") {
    document.getElementById("Advisory").style.display = "block";
  } else if (option === "Vibes")
    document.getElementById("Vibes").style.display = "block";
}

//For Option 1
async function GetWeatherType() {
  let query = document.getElementById('city1').value;
  let key = "910ff5ae063e6e027f6a48957062c78b";
  let url = `https://api.weatherstack.com/current?access_key=${key}&query=${query}`;

  const response = await fetch(url);
  const data = await response.json();

  // Display the weather result
  let result = document.getElementById("Display");
  result.style.display = "block";
  result.className = "display";
  result.innerHTML =
      `<h2> Weather Results Of Your City</h2>
      <h3> In ${query}, Here Are Your Results </h3>
      <p>Temperature: ${data.current.temperature} degrees Fahrenheit</p>
      <p>Weather Description: ${data.current.weather_descriptions}</p>
      <p>Humidity: ${data.current.humidity}</p>`;

  // Submit to backend
  await fetch('/weather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          city_id: query,
          humidity_id: data.current.humidity,
          temperature_id: data.current.temperature,
          weather_descriptions: data.current.weather_descriptions[0]
      })
  });
}

//For Option 2
async function ClothingAdvisory() {
  let query = document.getElementById('city2').value;
  let key = "910ff5ae063e6e027f6a48957062c78b";
  let url = `https://api.weatherstack.com/current?access_key=${key}&query=${query}`;


      let response = await fetch(url);
      let data = await response.json();

      let temperature = data.current.temperature;
      let condition = data.current.weather_descriptions[0];
      let humidity = data.current.humidity;

      let conditionadvice = "";
      let advice = "";

      // Clothing advice based on temperature
      if (temperature >= 70) {
          advice = "Wear shorts and a T-Shirt!";
      } else if (temperature >= 55) {
          advice = "A little chilly today, probably you need some long sleeves.";
      } else {
          advice = "Uh oh, make sure to wear long sleeves.";
      }

      // Additional advice based on weather condition
      if (condition.toLowerCase().includes("rain")) {
          conditionadvice = "Please bring an umbrella.";
      } else {
          conditionadvice = "There is none!";
      }

      // Display result
      let result = document.getElementById("Display");
      result.style.display = "block";
      result.className = "display";
      result.innerHTML =
          `<h2>Temperature Advice for ${query}</h2>
          <p>It's currently ${temperature}</p>
          <p>${advice}</p>
          <p>${conditionadvice}</p>`;

      // Submit to backend
      await fetch('/weather', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              city_id: query,
              humidity_id: humidity,
              temperature_id: temperature,
              weather_descriptions: condition
          })
      }); 
}

//For Option 3
async function WeatherVibes() {
  let query = document.getElementById('city3').value;
  let key = "910ff5ae063e6e027f6a48957062c78b";
  let url = `https://api.weatherstack.com/current?access_key=${key}&query=${query}`;

      let response = await fetch(url);
      let data = await response.json();

      let wind = data.current.wind_speed;
      let temperature = data.current.temperature;
      let humidity = data.current.humidity;
      let condition = data.current.weather_descriptions[0];
      let advice = "";

      // Wind-based advice
      if (wind > 20) {
          advice = "It's very windy, I advise you not to go outside at all.";
      } else if (wind > 10) {
          advice = "Please get a jacket — it's kinda cold.";
      } else {
          advice = "You're fine!";
      }

      // Display the result
      let result = document.getElementById("Display");
      result.style.display = "block";
      result.className = "display";
      result.innerHTML =
          `<h2>Weather Results Of Your City</h2>
          <p>The wind is ${wind} mph</p>
          <p>${advice}</p>`;

      // Submit to backend
      await fetch('/weather', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              city_id: query,
              humidity_id: humidity,
              temperature_id: temperature,
              weather_descriptions: condition
          })
      });


}

window.onload = function() {
    Annyang();
    NoAnnyang();
    ChangeOption();
}