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


    //This code gets the result and prints out the city and the climate while it erases the label
    fetch(url)
    .then(response => response.json())
    .then(data => {
      //The Results
      let result = document.getElementById("Display");
      result.style.display = "block";
      result.className = "display";
      result.innerHTML =
        `<h2> Weather Results Of Your City</h2>
        <h3> In ${query}, Here Are Your Results </h3>
        <p>Temperature: ${data.current.temperature} degrees farenheit</p>
        <p>Weather Description: ${data.current.weather_descriptions} </p>
        <p>Humidty: ${data.current.humidity} </p>`;
    });
}

//For Option 2
async function ClothingAdvisory() {
  let query = document.getElementById('city2').value;


  let key = "910ff5ae063e6e027f6a48957062c78b";
  let url = `https://api.weatherstack.com/current?access_key=${key}&query=${query}`;


  //This code gets the result and prints out the city and the climate while it erases the label
  fetch(url)
  .then(response => response.json())
  .then(data => {

    //Identify Variables
    let temperature = data.current.temperature;
    let condition = data.current.weather_descriptions[0];
    let conditionadvice = ""
    let advice = "";

    //Conditions
    if(temperature >= 70) {
      advice = "Wear shorts and A T-Shirt!"
    } else if (temperature >= 55) {
      advice = "A little chilly today, probably you need some long sleeves a little bit"
    } else if (temperature <= 55) {
      advice = "Uh Oh, Make Sure to Wear Long Sleeves"
    }

    if(condition.includes("rain")) {
      conditionadvice = "Please Bring an Umbrella";
    } else {
      conditionadvice = "There is none!"
    }


    //The Results
      let result = document.getElementById("Display");
      result.style.display = "block";
      result.className = "display";
      result.innerHTML =
      `<h2>Temperature Advice for ${query}</h2>
      <p>It's currently ${temperature}</p>
      <p>${advice}</p>
      <p>${conditionadvice}</p>`;
  });
}
//For Option 3
async function WeatherVibes() {
    let query = document.getElementById('city3').value;
  
  
    let key = "910ff5ae063e6e027f6a48957062c78b";
    let url = `https://api.weatherstack.com/current?access_key=${key}&query=${query}`;
  
  
    //This code gets the result
    fetch(url)
    .then(response => response.json())
    .then(data => {

      //Variables
      let wind = data.current.wind_speed;
      let advice = "";

    //Conditions 
      if(wind > 20) {
        advice = "It's very windy, I advice you not to go outside at all"
      } else if(wind > 10) {
        advice = "Please Get a Jacket it's kinda cold"
      } else {
        advice = "Your Fine!"
      }
      //The Results
      let result = document.getElementById("Display");
      result.style.display = "block";
      result.className = "display";
      result.innerHTML =
      `<h2> Weather Results Of Your City</h2>
      <p>The wind is ${wind} mph</p>
      <p>${advice}</p>`
    });

}

window.onload = function() {
    Annyang();
    NoAnnyang();
    ChangeOption();
}