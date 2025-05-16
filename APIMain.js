
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

  function WeatherSlideShow() {
    let swiper = new Swiper(".swiper" , {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }


async function GetWeather() {
    let query = document.getElementById('city').value;


    let key = "910ff5ae063e6e027f6a48957062c78b";
    let url = `https://api.weatherstack.com/current?access_key=${key}&query=${query}`;


    //This code gets the result and prints out the city and the climate while it erases the label
    fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById("WeatherToday").innerHTML =
        `<h2> Weather Results </h2>
        <p>In  ${data.location.name}, ${data.location.country} it is currently ${data.current.temperature} degrees at this time </p>`;
    });
}

window.onload = function() {
    WeatherSlideShow();
}