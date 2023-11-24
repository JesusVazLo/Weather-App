const form = document.querySelector("form");
const search = document.querySelector("input");
const msj1 = document.querySelector("#msj-1");
const msj2 = document.querySelector("#msj-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const ubicacion = search.value;

  msj1.textContent = "Cargando...";
  msj2.textContent = "";

  fetch(`/clima?ubicacion=${ubicacion}`).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      if (data.error) {
        msj1.textContent = data.error;
      } else {
        msj1.textContent = data.location.name;
        msj2.textContent = `
          La temperatura de hoy es de ${data.current.temperature}°C, pero se siente como ${data.current.feelslike}°C.
          La humedad es de ${data.current.humidity}%.
          La velocidad del viento es de ${data.current.wind_speed}km/h.
          La visibilidad es de ${data.current.visibility}km.
          La presion es de ${data.current.pressure}mb.
          La precipitacion es de ${data.current.precip}mm.
          La nubosidad es de ${data.current.cloudcover}%.
        `;
      }
    });
  });
});
