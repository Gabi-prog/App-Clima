import {configuracion} from './config.js';


// Acceso a las configuraciones
const  direccion = configuracion.urlBase;
const llave = configuracion.apiKey;
//conversion de grados Kelvin a Centigrados
const difKelvin = 273.15;
let idioma = 'sp';


document.getElementById('botonBusqueda').addEventListener('click',() => {
    const ciudad = document.getElementById('ciudadEntrada').value
    if (ciudad){
        fetchDatosClima(ciudad);
    }
})

function fetchDatosClima(ciudad){
    fetch(`${direccion}?q=${ciudad}&appid=${llave}&lang=${idioma}`)
    .then(response => response.json())
    .then(response => mostrarDatosClima(response))

}
function mostrarDatosClima(response){
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML = ''

    const ciudadNombre = response.name;
    const paisNombre = response.sys.country;
    const temperatura = response.main.temp;
    const sensacion = response.main.feels_like;
    const humedad = response.main.humidity;
    const descripcion = response.weather[0].description;
    const icono = response.weather[0].icon;

    const ciudadTitulo = document.createElement('h2');
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`; 

    const temperaturaInfo = document.createElement('p');
    temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura- difKelvin)}°C`;

    const sensacionInfo = document.createElement('p');
    sensacionInfo.textContent = `La sensación térmica es: ${Math.floor(sensacion- difKelvin)}°C`;

    const humedadInfo = document.createElement('p');
    humedadInfo.textContent = `La humedad es: ${humedad}%`;

    const iconoInfo = document.createElement('img');
    iconoInfo.src= `https://openweathermap.org/img/wn/${icono}@2x.png` 

    const descripcionInfo = document.createElement('p');
    descripcionInfo.textContent = `La descripción meteorológica es: ${descripcion}`;

    divDatosClima.appendChild(ciudadTitulo);
    divDatosClima.appendChild(temperaturaInfo);
    divDatosClima.appendChild(sensacionInfo);
    divDatosClima.appendChild(humedadInfo);
    divDatosClima.appendChild(iconoInfo);    
    divDatosClima.appendChild(descripcionInfo);
}

