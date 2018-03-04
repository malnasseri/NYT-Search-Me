//require all credentials info
require('dotenv').config()

// Include Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require ("mongoose");
const bluebird = require("bluebird");
const path = require("path");

// Create Instance of Express
const app = express();
// Sets an initial port. We'll use this later in our listener
const PORT = process.env.PORT || 8080;

//require routes from routes.js
const routes = require("./routes/routes");

//replaced mongoose promises with bluebird library
mongoose.Promise = bluebird;
// Run Morgan for Logging
app.use(logger("dev"));

//Prevent 304 status code
app.use(function(req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();    
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + '/public'))

// -------------------------------------------------

// MongoDB Configuration configuration
const promise = mongoose.connect(process.env.MONGODB_URI || process.env.DB_LOCAL, 
  {useMongoClient: true});

const db = mongoose.connection;

  db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
  });

  db.once("open", function() {
    console.log("Mongoose connection successful.");
  });
// -------------------------------------------------
//using routes from routes.js
app.use("/", routes);

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
