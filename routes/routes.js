
// require express for routing
const express = require("express");
// Create Instance of Express
const app = express();

// Require controller
const dbController = require ("../controller/dbController");

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", (req, res)=> {
  res.sendFile(__dirname + "/public/index.html");
});

//This is the route that will send back all saved news to browsers
app.get("/api/saved/news", dbController.getSavedNews);

// This is the route we will send POST requests to save each news.
app.post("/news/save", dbController.save);

// This is the route for handling delete news
app.delete("/delete/news/:id", dbController.deleteNews);

//This is the route for saving notes to database
app.post("/notes/save", dbController.saveNotes);

// This is the route for handling delete notes
app.delete("/delete/note/:id", dbController.deleteNotes);

module.exports = app;