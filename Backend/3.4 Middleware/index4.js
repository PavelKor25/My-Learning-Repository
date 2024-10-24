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

app.post("/submit", (req, res) => {
  const userData = req.body;    // Не обязательно, чисто для удобства
  const bandName = userData.street + userData.pet;

  res.send(`<h1>Your band name is:<h1> <h2>${bandName}✌️<h2>`);
  // Как я понял, после внесений изменений в страницу с данным url (в методе post) пользователя автоматически переводят на эту страницу

  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});