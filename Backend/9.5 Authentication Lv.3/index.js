import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
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

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/secrets", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

/* Два следующих маршрута имеют схожую суть: в обоих выполняется процесс возможного перехода
  на "секретную" страницу. app.post() выполняет локальный вход с проверкой аутентификации. Здесь
  пользователь отправляет заполненную форму данных на сервер. В app.get() же вход выполняется
  через сайт-посредник (в данном случае - вход с помощью Google). Поэтому тут get, а не post.
  Первый аргумент в authenticate указывает на нужную стратегию, которую мы соотв-но назвали.
  В поле scope выводятся те данные, которые будет запрашивать сайт у Google при аутентификации. */
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [ "profile", "email" ],
}));

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login"
  })
);

/* Данный маршрут позволяет совершить переход на нужный url (токен доступа автоматически направляется на данный маршрут
  самим google) */
app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login"
  }));

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

/* Маршрут для выхода с аккаунта */
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if(err) console.log(err);
      res.redirect("/");
  })
});

// Локальная стратегия
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              //Passed password check
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

// Стратегия Google структурно похожа на локальную с той разницей, что первый аргумент
// указывает на "кликуху" этой стратегии, чего не обязательно делать для локальной стратегии.
passport.use(
  "google",
   new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"   // Это URL API Google, в которой будут доступны разработчику данные о вошедшем юзере (те данные, которые юзер разрешил к использованию гуглом)
    },
    /* Колбэк-функция внутри Гугл-Стратегии является основным местом процесса сохранения пользователя в БД,
      а также в работе с токенами. */
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
        if (result.rows.length === 0) {
          // Новый юзер

          /* Поскольку пароль берется извне самим гуглом (ясное дело, опасно и запрещено иметь в доступе инфу о пароле другого сайта),
            в БД пункт пароля можно либо оставить пустым, либо указать как "google" для понимания, что он был аутен-ван внешне. */
          const newUserResult = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          const newUser = newUserResult.rows[0];
          return cb(null, newUser);
        } else {
          // уже сущ-ющий юзер
          const existUser = result.rows[0];
          return cb(null, existUser);
        }
      } catch(err) {
        return cb(err);
      }
}))

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
