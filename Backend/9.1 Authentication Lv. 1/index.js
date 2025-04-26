import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  password: "123456",
  database: "secrets",
  host: "localhost",
  port: 5432
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body["username"];
  const password = req.body["password"];
  try {
    const checkResult = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if(checkResult.rows.length > 0) {
      res.send("This email is already registered.");
    } else {
      try {
        await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2)",
          [email, password]);
        res.redirect("/");
      } catch(err) {
        console.log(err);
      }
    }
  } catch(err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body["username"];
  const password = req.body["password"];
  try {
    const checkUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if(checkUser.rows.length === 0) {
      res.send("You entered an incorrect email. Try again or register a new account.");
    } else {
      const checkPassword = await db.query(
        "SELECT * FROM users WHERE email = $1 AND password = $2",
        [email, password]
      );
      if(checkPassword.rows.length === 0) {
        res.send("You entered an incorrect password. Try again.");
      } else {
        res.render("secrets.ejs");
      }
    }
  } catch(err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
