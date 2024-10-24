import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send(`<h1>Yesssir! I got it sir! OMG I'm good, sir!<h1>`);
});

app.get("/contact", (req, res) => {
    res.send("Contact me! My phone number: 88005553535. Better to call than borrow from someone!")
})

app.get("/about", (req, res) => {
    res.send("I'm a Man. I am a Molecuar Man! I'm a Super Giga Mega Ultra XXL Extra Mega Giga Tera Man!")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});