import express from "express";

import bodyParser from "body-parser";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

var app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// URL в любом http-методе как аргумент определяет данный метод. Данный url при обращении к нему позволяет понять программе,
// какой код выполнять.
// P.S. Можно создавать app.post & app.get методы с одним и тем же url.
app.post("/submit", (req, res) => {
  const userData = req.body;    // Не обязательно, чисто для удобства
  const bandName = userData.street + userData.pet;

  res.send(`<h1>Your band name is:<h1> <h2>${bandName}✌️<h2>`);
  // Пользователя направляют на страницу с URL "/submit" ТОЛЬКО потому, что в форме указано action="/submit"

  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});