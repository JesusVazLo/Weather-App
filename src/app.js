const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const recursosEstaticos = path.join(__dirname, "../public");
const vistas = path.join(__dirname, "../templates/views");

app.set("view engine", "hbs");
app.set("views", vistas);

app.use(express.static(recursosEstaticos));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/clima", function (req, res) {
  if (!req.query.ubicacion) {
    return res.send({
      error: "Debes de ingresar una ubicacion",
    });
  }

  const ubicacion = req.query.ubicacion;

  const url = `http://api.weatherstack.com/current?access_key=494882d47eef8b0ba05b726adaf48dc9&query=${ubicacion}&units=m`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.error) {
        console.log(data.error);
        res.send({
          error: "No se pudo encontrar la ubicacion",
        });
      } else {
        res.send(data);
      }
    })
    .catch(function (error) {
      res.send({ error: "No se pudo conectar al servicio del clima" });
    });
});

app.get("*", function (req, res) {
  res.render("404", {
    title: "404",
    name: "Lobato",
    msj: "Pagina no encontrada",
  });
});

app.listen(port, function () {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
