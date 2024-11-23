import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

const URL_API = "https://v2.jokeapi.dev/";
const API_getJoke = URL_API + "joke/";
const safeMode = "safe-mode";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log(API_getJoke);
    res.render("index.ejs");
})

app.post("/joke", async (req, res) => {
    try {
        const result = await axios.get(API_getJoke + req.body.jokeBtn + `?${safeMode}`);
        console.log(result.data);
        if(result.data.type = "twopart") {
            const setup = result.data.setup;
            const delivery = result.data.delivery;
            res.render("index.ejs", {
                setupContent: setup,
                deliveryContent: delivery,
            })
        } else if(result.data.type = "single") {
            const singleJoke = result.data.joke;
            res.render("index.ejs", {
                jokeContent: singleJoke,
            })
        }
    } catch(error) {
        res.render("error.ejs", {
            err: error.response.data,
        });
    }

});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});