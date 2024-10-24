import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const rockPaperScissors = ["rock", "scissors", "paper"];
const rockPaperScissorsRus = ["камень", "ножницы", "бумага"];

const rockPaperScissorsObj = {
    RPS_en: rockPaperScissors,
    RPS_rus: rockPaperScissorsRus,
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", rockPaperScissorsObj);
});

app.post("/submit", (req, res) => {
    const randNum = Math.floor(Math.random() * rockPaperScissors.length);
    let numOfPlayerOption = 0;

    
    console.log(randNum);
    let playerChosenOption = "";

    // Цикл на проверку того, какой объект (кнопку, выбранный клиентом) использовал body-parser. Затем присвоение
    // строки выбранной кнопки пользователем (внутри объекта) переменной playerChosenOption
    for(let i = 0; i < rockPaperScissors.length; i++) {
        // Проверка наличия каждого элемента объекта нажатой кнопки в сопоставлении с элементом массива.
        if(req.body[`${rockPaperScissors[i]}`]) {
            console.log(req.body[`${rockPaperScissors[i]}`]);

            playerChosenOption = req.body[`${rockPaperScissors[i]}`];       // Возвращает рускоязычное название нажатой кнопки
            break;
        }
    }

    res.render("submit.ejs", {
        // По какой-то причине парциальный файл (form.ejs) не улавливает элементы вложенного объекта в объект аргумента render
        // (т.е. элементы rockPaperScissorsObj)
        RPS_en: rockPaperScissors,
        RPS_rus: rockPaperScissorsRus,
        compChosenOpt: rockPaperScissorsRus[randNum],
        playerChosenOpt: playerChosenOption,
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});