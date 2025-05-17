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
          'Go To Home Page': () => {
              window.location.href = "APIMain.html";
             
      
      
          
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



  window.onload = function () {
    Annyang();
    NoAnnyang();
  }