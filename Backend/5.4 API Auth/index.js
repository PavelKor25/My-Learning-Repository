import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Ronald";
const yourPassword = "Tolkin";
const yourAPIKey = "b3104206-93c3-4bdb-a6c3-06b485bf906b";
const yourBearerToken = "9bf94bbf-e915-4bed-be0c-677b2e4c8737";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const randSecret = JSON.stringify(response.data);
    res.render("index.ejs", {
      content: randSecret,
    });
  } catch {
    console.log("You've got an error. Sorry!");
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/all?page=2", {
        auth: {
          username: "Ronald",
          password: "Tolkin",
        },    /* Запятые ставить полезно: становится ясно, что это элемент объекта (т е объект внутри объекта) */
      });
    const pageOfSecrets = JSON.stringify(response.data);
    res.render("index.ejs", {
      content: pageOfSecrets,
    });
  } catch {
    console.log("You've got an error. Sorry!");
    res.render("index.ejs", {
      content: error.message,
    });
  }

});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/filter?score=5&apiKey=" + yourAPIKey);
    const filteredSecrets = JSON.stringify(response.data);
    res.render("index.ejs", {
      content: filteredSecrets,
    });
  } catch {
    console.log("You've got an error. Sorry!");
    res.render("index.ejs", {
      content: error.message,
    });
  }

});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", {
      headers: {
        Authorization: "Bearer " + yourBearerToken,
      },
    });
    const idSecret = JSON.stringify(response.data);
    res.render("index.ejs", {
      content: idSecret,
    });
  } catch {
    console.log("You've got an error. Sorry!");
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
