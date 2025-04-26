import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: "Cookies, Salts and Two Redisses",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "123456",
  port: 5432,
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

app.get("/secrets", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            if(err) {
              console.log(err);
            }
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

/* Теперь колбэк-функцию выполняет стратегия при аутентификации пользователя (см. ниже)
  Функция passport.authenticate() дает выполнить функцию вызова стратегии ниже */
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

/* Данный метод выполняет верификацию пользователя каждый раз при заходе на страницу.
  В первый раз вручную (через passport.authenticate()), в дальнейшем - автоматически. */
passport.use(
  new Strategy(
    async function verify(username, password, cb) {
  /* Функция Verify
    В аргументах username, password уже находятся данные, введенные пользователем.
    (Они сохраняются вместе со Strategy столько, сколько длится сессия)
    Именно здесь и проводится проверка соответствия логина/пароля с введенным пользователем,
    а также направление пользователя на страницу после успешной верификации.*/
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, valid) => {
        /* Запомним важный принцип: всегда сначала проверяется наличие ошибок внутренних (сервера),
          а потом внешних (клиентских), ведь проверка второго не имеет смысла, если есть ошибки в первом.
          поэтому в cb() первый аргумент проверяет серверную проблему, а второй - клиентскую */
        if (err) {
          return cb(err);
        } else {
          if (valid) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        }
      });
    } else {
      return cb("User not found");
    }
  } catch (err) {
    return cb(err);
  }
}));

/* Метод, определяющий, что необходимо сохранить пользователю при повторном посещении сайта */
passport.serializeUser((user, cb) => {
  cb(null, user);
});

/* Метод, использующий сохраненную информацию для восстановления во время повторного посещения. */
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
