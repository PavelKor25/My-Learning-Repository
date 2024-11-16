// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

const URL_API = "https://secrets-api.appbrewery.com";

/* const userBearerToken = "9bf94bbf-e915-4bed-be0c-677b2e4c8737";
const config = {
    headers: { Authorization: "Bearer " + userBearerToken, },
} */

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(URL_API + "/random");
        const randSecret = response.data;
        res.render("index.ejs", {
            secret: randSecret.secret,
            user: randSecret.username,
        });
    } catch(error) {
        console.log(error.response.data);
        res.status(500);
    }

})

app.listen(port, () => {
    console.log("Listening on port " + port);
})
