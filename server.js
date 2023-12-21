const express = require("express");
const userRoutes = require("./src/users/routes");
const itemRoutes = require("./src/items/routes");
const notifRoutes = require("./src/notif/routes");
const cors = require("cors");
const app = express();
const port = 8000;
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const path = require("path");

const intializePassport = require("./passport-config");

intializePassport(passport);

app.use(
  cors({
    origin: "http://localhost:3000",
    // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    // optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// This tells our application to take the forms that we post from the frontend and we can access them inside our post method using req.body

global.BASE_DIR = path.join(__dirname, "/public");

app.use("/static", express.static(path.join(__dirname, "/public")));

app.use(
  session({
    secret: "secret",

    resave: false,

    saveUninitialized: false,
  })
);

app.use(flash());

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/notif", notifRoutes);
app.listen(port, () => console.log(`app listening on port ${port}`));
