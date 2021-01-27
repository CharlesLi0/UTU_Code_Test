const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const mongoUrl =
  "mongodb+srv://tester:Testing123@cluster0.3wvj5.mongodb.net/crypto_data?retryWrites=true&w=majority";

const readData = require('./util/storing-database');

const dataRoutes = require("./routes/data-routes");

const HttpError = require("./models/HttpError");

const app = express();

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Ruquested-With, Content-Type, Accpet, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//   next();
// })

app.use("/data", dataRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "an unknow error occurred!" });
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    // console.log('reading');
    readData.readData();
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
