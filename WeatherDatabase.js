async function loadWeatherData() {
    await fetch('/WeatherData')
        .then((result) => result.json())
        .then((resultJson) => {
            let table = document.createElement('table');
            table.setAttribute('id', 'weatherState');

            let tableRow = document.createElement('tr');

            let tableheadingCity = document.createElement('th');
            tableheadingCity.innerHTML = 'city'
            tableRow.appendChild("tableheadCity");

            let tableheadingHumidity = document.createElement('th');
            tableheadingHumidity.innerHTML = 'humidity'
            tableRow.appendChild("tableheadingHumidity");

            let tableheadingTemperature = document.createElement('th');
            tableheadingTemperature.innerHTML = 'temperature_id'
            tableRow.appendChild("tableheadingTemperature");

            let tableheadingWeatherType = document.createElement('th');
            tableheadingWeatherType.innerHTML = 'Weather_Type'
            tableRow.appendChild("tableheadingWeatherType");

            table.append(tableRow);

            resultJson.forEach((weather) => {
                let weatherAreaRow = document.createElement('tr');
                let weatherLocation = document.createElement('td');
                let weatherHumidity = document.createElement('td');
                let weatherTemperature = document.createElement('td');
                let weatherType = document.createElement('td');

                weatherLocation.innerHTML = weather.city_id;
                weatherHumidity.innerHTML = weather.humidity_id;
                weatherTemperature.innerHTML = weather.temperature_id;
                weatherType.innerHTML = weather.weather_descriptions;

                tableRow.appendChild(weatherLocation)
                tableRow.appendChild(weatherHumidity)
                tableRow.appendChild(weatherTemperature)
                tableRow.appendChild(weatherType)

                table.appendChild(tableRow)
            });
            
            document.body.appendChild(table);
        });
}
window.onload = loadWeatherData;