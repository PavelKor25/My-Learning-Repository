import express from "express";
import ejs from "ejs";      // Здесь он не нужен пока что

const app = express();
const port = 3000;

var weekAdvice = "";
const date = new Date();
var day = date.getDay();
var month = date.getMonth();
var dayOfMonth = date.getDate();

function logDay (req, res, next) {
    console.log(`The week day number is ${day}`);
    /* console.log(`${date}`); */
    next();
}

app.use(logDay);

function getMessage() {
    if(day === 5 || day === 6) {
        weekAdvice = "weekend, it's time to have fun!";
    } else {
        weekAdvice = "weekday, it's time to work hard!";
    }
    return weekAdvice;
}

app.get("/", (req, res) => {
    const keyWords = {
        weekMessage: getMessage(),
        happyBirthday: "Happy Birthday, Pavel!",
        birth_day: 25,
        birth_month: 11,
        currentDay: dayOfMonth,
        currentMonth: month + 1
    }
    res.render("index.ejs", keyWords);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}, He-he-he!`);
});