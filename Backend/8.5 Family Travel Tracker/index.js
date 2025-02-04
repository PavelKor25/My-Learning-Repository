import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function checkVisisted() {    // Сделано!
  const result = await db.query(
    `SELECT country_code FROM visited_countries WHERE user_id = $1`,
    [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function selectUserColor() {
  const result = await db.query(
    `SELECT color FROM users WHERE id = $1`,
    [currentUserId]
  );
  const userColor = result.rows[0].color;
  console.log(userColor);
  return userColor;
}

app.get("/", async (req, res) => {    // ОК
  const result = await db.query("SELECT * FROM users");
  const users = result.rows;
  const countries = await checkVisisted();
  const userColor = await selectUserColor();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: userColor,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        `INSERT INTO visited_countries (country_code, user_id)
        VALUES ($1, $2)`,
        [countryCode, currentUserId]
      );
      /* Крайне неочевидный момент: при перенаправлении к URL всегда будет выполняться метод app.get(URL) в дополнении к этому методу. */
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  if(req.body["user"]) {
    currentUserId = req.body["user"];
    res.redirect("/");
  }
  if(req.body["add"]) {
    res.render("new.ejs");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  try {
    const result = await db.query(
    `INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id`,
    [req.body["name"], req.body["color"]]);
    currentUserId = result.rows[0].id;
    console.log(currentUserId);
    res.redirect("/");
  } catch(err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
