function consultarClima() {
    const ciudad = document.getElementById('ciudad').value;
    const API_KEY = '7a224cb89b9da3cbc01fc02998f2f330'; // Sustituye "tu_api_key" por tu propia API key de OpenWeatherMap
    const lang ='es';
 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=${lang}`;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error en la respuesta de la API');
            }
          })
          .then(data => {
            // Mostrar resultado en la tabla
            const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
            const fila = tabla.insertRow();
            fila.insertCell().innerHTML = data.name;
            //fila.insertCell().innerHTML = `${data.main.temp}°C`;
            fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
           // fila.insertCell().innerHTML = data.weather[0].description;
           fila.insertCell().innerHTML = '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" alt="Weather icon">';
           fila.insertCell().innerHTML = `${data.main.humidity}%`;
          })
          .catch(error => {
            console.error('Error al consultar el clima', error);
          });
      }
    
    function consultarClimas() {
    const ciudades = document.getElementById('ciudades').value.split(',').map(ciudad => ciudad.trim());
    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65'; // Sustituye "tu_api_key" por tu propia API key de OpenWeatherMap
    const lang ='es';

    Promise.all(ciudades.map(ciudad => {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=${lang}`;
          return fetch(url).then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error en la respuesta de la API');            }
          });
        }))
        .then(data => {
          // Mostrar resultados en la tabla
          const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
          data.forEach(ciudad => {
            const fila = tabla.insertRow();
            fila.insertCell().innerHTML = ciudad.name;
            //fila.insertCell().innerHTML = `${ciudad.main.temp}°C`;
            fila.insertCell().innerHTML = `${(ciudad.main.temp - 273.15).toFixed(1)}°C`;
            //fila.insertCell().innerHTML = ciudad.weather[0].description;
            fila.insertCell().innerHTML = '<img src="http://openweathermap.org/img/w/' + ciudad.weather[0].icon + '.png" alt="Weather icon">';
            fila.insertCell().innerHTML = `${ciudad.main.humidity}%`;
          });
        })
        .catch(error => {
          console.error('Error al consultar el clima', error);
        });
      }
    
    function limpiarTabla() {
            // Mostrar resultado en la tabla
            const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody');
            for(let i = 0; i<tabla.length; i++)
            {
                tabla[i].innerHTML = "";
            }
      }

//  Valida  Geolocalizacion
      function obtenerUbicacion() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(obtenerDatosUbicacion);
        } else {
          console.log("La geolocalización no es compatible en este navegador.");
        }
      }
      

      // Datos de Geolocalizacion
      function obtenerDatosUbicacion(posicion) {
        const latitud = posicion.coords.latitude;
        const longitud = posicion.coords.longitude;
      
        const url = `https://geocode.xyz/${latitud},${longitud}?json=1`;
      
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const pais = data.country;
            const ciudad = data.city;
            console.log(`País: ${pais}`);
            console.log(`Ciudad: ${ciudad}`);
            //insercion en HTML
            document.getElementById('ciudad').value = ciudad;
            document.getElementById('Pais').textContent = 'Bienvenido: ' + ciudad + ' , '+ pais;
            console.log("Carga ciudades");
          })
          .catch(error => {
            console.log("Hubo un error al obtener los datos de ubicación:", error);
          });
      }
      
      // ya no es soportada por la API 
      function getCitiesByCountry(countryCode, apiKey) {
        const url = `https://api.openweathermap.org/data/2.5/find?country=${countryCode}&appid=${apiKey}`;
      
        return fetch(url)
          .then(response => response.json())
          .then(data => data.list.map(city => city.name))
          .catch(error => {
            console.log('Error al obtener la lista de ciudades:', error);
            return [];
          });
      }

         // ya no es soportada por la API 
function consultarCiudades() {
const countryCode = 'MX'; // Reemplaza con el código de país (por ejemplo, 'US' para Estados Unidos)
const apiKey = '7a224cb89b9da3cbc01fc02998f2f330'; // Reemplaza con tu API key de OpenWeatherMap

   getCitiesByCountry(countryCode, apiKey)
     .then(cities => {
      console.log(cities); // Aquí puedes utilizar la lista de ciudades
      });
  }


      obtenerUbicacion();