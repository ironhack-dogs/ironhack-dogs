require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");
const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);
const MongoStore = require("connect-mongo")(session);

mongoose.Promise = Promise;
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: "dogpage",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);
require("./passport")(app);

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Madrid Adopta";

const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/authentication");
app.use("/", authRoutes);

const userRoutes = require("./routes/user");
app.use("/my-profile", userRoutes);

const dogRoutes = require("./routes/dogs");
app.use("/dogs", dogRoutes);

const centerRoutes = require("./routes/centers");
app.use("/centers", centerRoutes);


module.exports = app;