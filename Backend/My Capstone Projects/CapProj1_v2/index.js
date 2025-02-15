import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", (req, res) => {
    res.render("index.ejs", {
        posted: true,
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})