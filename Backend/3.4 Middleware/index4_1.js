import express from "express";

import { fileURLToPath } from "url";
import { dirname } from "path";

import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var bandName = "";

// Рекомендуется использовать ручные middleware после готовых для возможности работы с ними вкупе с готовыми ресурсами.
app.use(bodyParser.urlencoded({ extended: true }));

function bandNameGenerator(req, res, next) {
    // Если бы я активировал body-parser после bandNameGenerator, я бы не смог успешно инициализировать эту переменную.
    bandName = req.body.street + req.body.pet;
    console.log(`Bandname: ${bandName}`);
    next();
};

app.use(bandNameGenerator);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send(`<h1>Your band name is:</h1> <h2>${bandName}😜</h2>`);
});

app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});