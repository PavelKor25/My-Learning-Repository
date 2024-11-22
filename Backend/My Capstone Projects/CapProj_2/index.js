import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

const URL_API = "https://v2.jokeapi.dev/";
const API_getJoke = URL_API + "joke/";
const safeMode = "?safe-mode";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log(API_getJoke);
    res.render("index.ejs");
})

app.post("/joke", async (req, res) => {
    try {
        const response = await axios.get(API_getJoke + req.body.jokeBtn + safeMode);
        console.log(API_getJoke + req.body.jokeBtn + safeMode);
        const joke = JSON.stringify(response.data);
        res.render("index.ejs", {
            content: joke,
        })
    } catch(error) {
        console.log(error.response.data);
    }

});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});