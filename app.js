const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");

const homeRoutes = require("./routes/homepage");
const addRoutes = require("./routes/add");
const cartRoutes = require("./routes/cart");
const cameraRoutes = require("./routes/camera");
const teddyRoutes = require("./routes/teddy");
const furnitureRoutes = require("./routes/furniture");

const app = express();

app.set("view engine", "ejs");

mongoose
  .connect(
    "mongodb+srv://will:nAcmfCoHGDgzrCHG@cluster0-pme76.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/", addRoutes);
app.use("/", cartRoutes);
app.use("/", cameraRoutes);
app.use("/api/teddies", teddyRoutes);
app.use("/api/furniture", furnitureRoutes);

module.exports = app;
