import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  password: "123456",
  port: 5432,
  host: "localhost",
  database: "world"
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const table = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  table.rows.forEach(row => {
    countries.push(row.country_code);
  })
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
  });
});

app.post("/add", async (req, res) => {
  /* До этого я просто использовал команду select для всех строк countries,
    а уж потом перебирал через forEach, чтобы выявить подходящую страну.
    Но оказалось, вот эта микродобавка WHERE экономит довольно много строк кода,
    да к тому же очень облегчает его. Ведь даже проверку наличия или дупликата страны
    (уже введенной пользователем до этого) искать становится до невероятия легко! */
    const input = req.body["country"];
  const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name LIKE $1",
    [`%${input}%`]
  );

  if(result.rows.length !== 0) {
    // значение единственного элемента массива (объект)
    const data = result.rows[0];
    const countryCode = data.country_code;

    await db.query(
      "INSERT INTO visited_countries (country_code) VALUES ($1)",
       [countryCode]);
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
