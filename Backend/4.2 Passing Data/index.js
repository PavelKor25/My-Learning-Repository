import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var isBegan = false;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  isBegan = false;
  const dataGet = {
    started: isBegan,
  }
  res.render("index.ejs", dataGet);
});

app.post("/submit", (req, res) => {
  isBegan = true;
  const countOfLetters = req.body["fName"].length + req.body["lName"].length;
  const dataPost = {
    started: isBegan,
    numLetters: countOfLetters,
  }
  res.render("index.ejs", dataPost)
});

app.get("/submit", (req, res) => {
  isBegan = false;
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
