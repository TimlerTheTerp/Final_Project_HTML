
function Annyang() {
    if (annyang) {
      console.log("Voice Recongized");
      // Let's define a command.
      const commands = {
        'hello': () => { 
                alert('Hello world!'); 
                //change the background color
                document.body.style.backgroundColor = "white";
         },
          'Simulation': () => {
              window.location.href = "WeatherHistory.html";
          },
          'About page': () => {
              window.location.href = "About.html";
              console.log("Got It");
          }
          }
  
  
    
      // Add our commands to annyang
      annyang.addCommands(commands);
          
      
      // Start listening.
      annyang.start({autoRestart: false});
    }
  }
          
    function NoAnnyang() {
        console.log("Can't");
        annyang.abort();
        
      }

async function loadWeatherData() {
    try {
        const response = await fetch('/WeatherData');
        const resultJson = await response.json();

        let table = document.createElement('table');
        table.setAttribute('id', 'weatherState');

        // Create table header row
        let headerRow = document.createElement('tr');

        const headers = ['City', 'Humidity', 'Temperature', 'Weather Description'];
        headers.forEach(title => {
            const th = document.createElement('th');
            th.textContent = title;
            headerRow.appendChild(th);
        });

        table.appendChild(headerRow);

        // Add each weather entry row
        resultJson.forEach(weather => {
            let row = document.createElement('tr');

            const city = document.createElement('td');
            city.textContent = weather.city_id;

            const humidity = document.createElement('td');
            humidity.textContent = weather.humidity_id;

            const temperature = document.createElement('td');
            temperature.textContent = weather.temperature_id;

            const description = document.createElement('td');
            description.textContent = weather.weather_descriptions;

            row.appendChild(city);
            row.appendChild(humidity);
            row.appendChild(temperature);
            row.appendChild(description);

            table.appendChild(row); 
        });

        // Add the table to the page
        document.body.appendChild(table);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

window.onload = function() {
    Annyang();
    NoAnnyang();
    loadWeatherData();
} 